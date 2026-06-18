// Post-build image optimizer
// Runs after `next build` and compresses all images in dist/
// Skips dist/dev/ (build cache) — only touches production output

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const DIST_DIR = path.join(__dirname, '..', 'dist')
const SKIP_DIRS = ['dev'] // skip Next.js build cache
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

function walkDir(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.includes(entry.name)) walkDir(full, files)
    } else if (IMAGE_EXTS.has(path.extname(entry.name).toLowerCase())) {
      files.push(full)
    }
  }
  return files
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const tmp = filePath + '.opt.tmp'

  try {
    let pipeline = sharp(filePath)

    if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true })
    } else if (ext === '.png') {
      pipeline = pipeline.png({ compressionLevel: 9, effort: 10 })
    } else if (ext === '.webp') {
      pipeline = pipeline.webp({ quality: 82, effort: 6 })
    }

    await pipeline.toFile(tmp)

    const before = fs.statSync(filePath).size
    const after = fs.statSync(tmp).size

    if (after < before) {
      fs.renameSync(tmp, filePath)
      const saved = (((before - after) / before) * 100).toFixed(1)
      const rel = path.relative(DIST_DIR, filePath)
      console.log(`  ✓  ${rel}  (${toKB(before)} → ${toKB(after)}, -${saved}%)`)
    } else {
      fs.unlinkSync(tmp)
      console.log(`  ·  ${path.relative(DIST_DIR, filePath)}  (already optimal)`)
    }
  } catch (err) {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp)
    console.error(`  ✗  ${path.relative(DIST_DIR, filePath)}  — ${err.message}`)
  }
}

function toKB(bytes) {
  return (bytes / 1024).toFixed(0) + ' KB'
}

async function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('\n  dist/ not found — run `npm run build` first.\n')
    process.exit(1)
  }

  const files = walkDir(DIST_DIR)
  if (files.length === 0) {
    console.log('\n  No images found in dist/.\n')
    return
  }

  console.log(`\n  Optimizing ${files.length} image(s)...\n`)
  await Promise.all(files.map(optimizeImage))
  console.log('\n  Done.\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
