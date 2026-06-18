'use client'

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import {
  BLOG_CATEGORIES,
  createBlogPost,
  deleteBlogImageFromUrl,
  listAllBlogs,
  removeBlogPost,
  toSlug,
  type BlogPost,
  type BlogPostInput,
  updateBlogPost,
  uploadBlogImage,
} from '@/lib/blog'

type FormState = BlogPostInput & { id?: string }

const initialForm: FormState = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImage: '',
  category: BLOG_CATEGORIES[0],
  author: 'Equipe Eixo Consórcios',
  published: false,
  seoTitle: '',
  seoDescription: '',
}

function formatDate(date?: { toDate?: () => Date }) {
  const parsed = date?.toDate ? date.toDate() : new Date()
  return parsed.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function previewText(post: BlogPost) {
  if (post.excerpt?.trim()) return post.excerpt.trim()
  const plain = (post.content || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return plain.length > 140 ? `${plain.slice(0, 140)}…` : plain
}

function videoEmbedHtml(url: string): string | null {
  let src = ''
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)
  if (yt) src = `https://www.youtube.com/embed/${yt[1]}`
  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (!src && vimeo) src = `https://player.vimeo.com/video/${vimeo[1]}`
  if (!src) return null
  return (
    `<div class="blog-video" style="position:relative;padding-bottom:56.25%;height:0;margin:20px 0;border-radius:12px;overflow:hidden;background:#000;">` +
    `<iframe src="${src}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen loading="lazy"></iframe>` +
    `</div><p><br/></p>`
  )
}

type RichEditorProps = {
  value: string
  onChange: (html: string) => void
  onImageUpload: (file: File) => Promise<string>
}

function RichEditor({ value, onChange, onImageUpload }: RichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const savedRange = useRef<Range | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [error, setError] = useState<'video' | null>(null)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ''
    }
  }, [value])

  const emitChange = useCallback(() => {
    onChange(editorRef.current?.innerHTML ?? '')
  }, [onChange])

  const saveSelection = useCallback(() => {
    const sel = window.getSelection()
    if (sel && sel.rangeCount > 0 && editorRef.current?.contains(sel.anchorNode)) {
      savedRange.current = sel.getRangeAt(0)
    }
  }, [])

  const restoreSelection = useCallback(() => {
    editorRef.current?.focus()
    const sel = window.getSelection()
    if (savedRange.current && sel) {
      sel.removeAllRanges()
      sel.addRange(savedRange.current)
    }
  }, [])

  const exec = (command: string, value?: string) => {
    editorRef.current?.focus()
    document.execCommand(command, false, value ?? '')
    emitChange()
  }

  const formatBlock = (tag: string) => {
    editorRef.current?.focus()
    document.execCommand('formatBlock', false, tag)
    emitChange()
  }

  const insertHtml = (html: string) => {
    restoreSelection()
    document.execCommand('insertHTML', false, html)
    emitChange()
  }

  const insertLink = () => {
    const url = window.prompt('URL do link:')
    if (!url) return
    const selectedText = window.getSelection()?.toString()
    restoreSelection()
    if (selectedText) {
      document.execCommand('createLink', false, url)
      emitChange()
      return
    }
    const label = window.prompt('Texto do link:') || url
    insertHtml(`<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`)
  }

  const insertVideo = () => {
    const url = window.prompt('Cole o link do vídeo (YouTube ou Vimeo):')
    if (!url) return
    const html = videoEmbedHtml(url.trim())
    if (!html) {
      setError('video')
      return
    }
    insertHtml(html)
  }

  const handleImageFile = async (file: File) => {
    if (!file) return
    setUploadingImage(true)
    try {
      const url = await onImageUpload(file)
      insertHtml(
        `<img src="${url}" alt="" style="max-width:100%;border-radius:12px;margin:16px 0;display:block;" /><p><br/></p>`
      )
    } finally {
      setUploadingImage(false)
    }
  }

  const ToolBtn = ({ onClick, label, title }: { onClick: () => void; label: string; title?: string }) => (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault()
        saveSelection()
        onClick()
      }}
      className="h-8 min-w-8 px-2.5 rounded-md text-xs font-medium text-[#1C1C2E]/80 hover:bg-[#E8EDF6] transition-colors"
    >
      {label}
    </button>
  )

  const Divider = () => <span className="mx-1 h-5 w-px bg-black/10" />

  return (
    <div className="border border-black/15 rounded-lg overflow-hidden bg-white">
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-[#F4F6FA] border-b border-black/10 sticky top-0 z-10">
        <ToolBtn onClick={() => exec('bold')} label="B" title="Negrito" />
        <ToolBtn onClick={() => exec('italic')} label="I" title="Itálico" />
        <ToolBtn onClick={() => exec('underline')} label="U" title="Sublinhado" />
        <Divider />
        <ToolBtn onClick={() => formatBlock('h2')} label="H2" title="Título" />
        <ToolBtn onClick={() => formatBlock('h3')} label="H3" title="Subtítulo" />
        <ToolBtn onClick={() => formatBlock('p')} label="¶" title="Parágrafo" />
        <ToolBtn onClick={() => formatBlock('blockquote')} label="❝" title="Citação" />
        <Divider />
        <ToolBtn onClick={() => exec('insertUnorderedList')} label="• Lista" />
        <ToolBtn onClick={() => exec('insertOrderedList')} label="1. Lista" />
        <Divider />
        <ToolBtn onClick={insertLink} label="🔗 Link" />
        <ToolBtn
          onClick={() => imageInputRef.current?.click()}
          label={uploadingImage ? 'Enviando...' : '🖼 Imagem'}
        />
        <ToolBtn onClick={insertVideo} label="▶ Vídeo" />
        <Divider />
        <ToolBtn onClick={() => exec('removeFormat')} label="Limpar" title="Remover formatação" />
      </div>

      {error === 'video' ? (
        <p className="px-4 pt-2 text-xs text-red-600">
          Não reconhecemos esse link. Use uma URL do YouTube ou Vimeo.
        </p>
      ) : null}

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={() => {
          setError(null)
          saveSelection()
          emitChange()
        }}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        data-placeholder="Escreva o conteúdo do post aqui..."
        className="min-h-[22rem] max-h-[60vh] overflow-y-auto p-4 text-[15px] leading-relaxed text-[#1C1C2E] focus:outline-none
          empty:before:content-[attr(data-placeholder)] empty:before:text-[#1C1C2E]/35
          [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3
          [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2
          [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3
          [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3
          [&_blockquote]:border-l-4 [&_blockquote]:border-[#C9A05A] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#1C1C2E]/75 [&_blockquote]:my-4
          [&_a]:text-[#C9A05A] [&_a]:underline [&_img]:rounded-xl"
      />

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleImageFile(file)
          e.target.value = ''
        }}
      />
    </div>
  )
}

export default function BlogManager() {
  const [saving, setSaving] = useState(false)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [form, setForm] = useState<FormState>(initialForm)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const refreshPosts = useCallback(async () => {
    const data = await listAllBlogs()
    setPosts(data)
  }, [])

  useEffect(() => {
    refreshPosts()
  }, [refreshPosts])

  const resetForm = () => {
    setForm(initialForm)
    setCoverFile(null)
    setError('')
    setSuccess('')
  }

  const editPost = (post: BlogPost) => {
    setForm({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      category: post.category || BLOG_CATEGORIES[0],
      author: post.author,
      published: post.published,
      seoTitle: post.seoTitle || '',
      seoDescription: post.seoDescription || '',
    })
    setCoverFile(null)
    setError('')
    setSuccess('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submitPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      let coverImage = form.coverImage
      if (coverFile) coverImage = await uploadBlogImage(coverFile)

      const payload: BlogPostInput = {
        title: form.title.trim(),
        slug: toSlug(form.slug.trim() || form.title.trim()),
        excerpt: form.excerpt.trim(),
        content: form.content,
        coverImage,
        category: form.category.trim() || BLOG_CATEGORIES[0],
        author: form.author.trim(),
        published: form.published,
        seoTitle: form.seoTitle.trim() || form.title.trim(),
        seoDescription: form.seoDescription.trim() || form.excerpt.trim(),
      }

      if (form.id) {
        await updateBlogPost(form.id, payload)
        setSuccess('Post atualizado com sucesso.')
      } else {
        await createBlogPost(payload)
        setSuccess('Post criado com sucesso.')
      }

      await refreshPosts()
      resetForm()
    } catch {
      setError('Não foi possível salvar o post. Verifique os dados e tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  const deletePost = async (post: BlogPost) => {
    const confirmed = window.confirm(`Excluir o post "${post.title}"?`)
    if (!confirmed) return

    try {
      await removeBlogPost(post.id)
      await deleteBlogImageFromUrl(post.coverImage)
      await refreshPosts()
      if (form.id === post.id) resetForm()
    } catch {
      setError('Não foi possível excluir este post.')
    }
  }

  const inputClass = 'w-full h-11 px-4 rounded-lg border border-black/15 text-sm focus:outline-none focus:border-[#C9A05A]'

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_1fr] gap-6">
      <form onSubmit={submitPost} className="bg-gray-50 rounded-xl border border-black/10 p-5 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#1C1C2E]">{form.id ? 'Editar post' : 'Novo post'}</h2>

        <input
          type="text"
          placeholder="Título"
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value, slug: prev.id ? prev.slug : toSlug(e.target.value) }))}
          required
          className={inputClass}
        />

        <input
          type="text"
          placeholder="Slug (URL)"
          value={form.slug}
          onChange={(e) => setForm((prev) => ({ ...prev, slug: toSlug(e.target.value) }))}
          required
          className={inputClass}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#1C1C2E]/60 mb-1">Categoria</label>
            <select
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              className={inputClass}
            >
              {BLOG_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#1C1C2E]/60 mb-1">Autor</label>
            <input
              type="text"
              placeholder="Autor"
              value={form.author}
              onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
              required
              className={inputClass}
            />
          </div>
        </div>

        <input
          type="text"
          placeholder="Resumo (aparece no card)"
          value={form.excerpt}
          onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
          required
          className={inputClass}
        />

        <div>
          <label className="block text-xs font-medium text-[#1C1C2E]/60 mb-1">Conteúdo</label>
          <RichEditor
            value={form.content}
            onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
            onImageUpload={uploadBlogImage}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#1C1C2E]/60 mb-1">Imagem de capa</label>
          {form.coverImage && !coverFile ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.coverImage} alt="Capa atual" className="mb-2 h-32 w-full rounded-lg object-cover border border-black/10" />
          ) : null}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
            className="w-full px-3 py-2.5 rounded-lg border border-black/15 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#1C1C2E] file:px-3 file:py-1.5 file:text-white file:text-xs"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="SEO título"
            value={form.seoTitle}
            onChange={(e) => setForm((prev) => ({ ...prev, seoTitle: e.target.value }))}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="SEO descrição"
            value={form.seoDescription}
            onChange={(e) => setForm((prev) => ({ ...prev, seoDescription: e.target.value }))}
            className={inputClass}
          />
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-[#1C1C2E]">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.checked }))}
          />
          Publicar post
        </label>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {success ? <p className="text-sm text-green-700">{success}</p> : null}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button disabled={saving} className="h-10 px-5 rounded-lg bg-[#1C1C2E] text-white text-sm font-medium disabled:opacity-60">
            {saving ? 'Salvando...' : form.id ? 'Atualizar' : 'Criar'}
          </button>
          <button type="button" onClick={resetForm} className="h-10 px-5 rounded-lg border border-black/20 text-sm text-[#1C1C2E]">
            {form.id ? 'Cancelar edição' : 'Limpar'}
          </button>
        </div>
      </form>

      <div className="bg-gray-50 rounded-xl border border-black/10 p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-[#1C1C2E] mb-4">Posts cadastrados</h2>
        <div className="space-y-3 max-h-[75vh] overflow-y-auto pr-2">
          {posts.map((post) => (
            <div key={post.id} className="rounded-lg border border-black/10 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {post.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-16 w-16 shrink-0 rounded-md object-cover border border-black/10"
                    />
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-[#F1F3F7] text-[10px] text-[#1C1C2E]/40">
                      sem capa
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    {post.category ? (
                      <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[#C9A05A] mb-1">
                        {post.category}
                      </span>
                    ) : null}
                    <p className="text-[#1C1C2E] font-medium line-clamp-2 text-sm">{post.title}</p>
                    {previewText(post) ? (
                      <p className="text-xs text-[#1C1C2E]/60 mt-1 line-clamp-2">{previewText(post)}</p>
                    ) : null}
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-[#1C1C2E]/55">{formatDate(post.createdAt)}</span>
                      <span className={`inline-flex text-xs px-2 py-0.5 rounded-full ${post.published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {post.published ? 'Publicado' : 'Rascunho'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button onClick={() => editPost(post)} className="text-xs px-3 py-1.5 rounded bg-[#E8EDF6] text-[#1C1C2E] whitespace-nowrap hover:bg-[#DCE4F0]">Editar</button>
                  <button onClick={() => deletePost(post)} className="text-xs px-3 py-1.5 rounded bg-[#FDE9E9] text-[#A23434] whitespace-nowrap hover:bg-[#FDD5D5]">Excluir</button>
                </div>
              </div>
            </div>
          ))}

          {!posts.length ? (
            <div className="rounded-lg border border-dashed border-black/20 p-8 text-center text-sm text-[#1C1C2E]/60">
              Nenhum post cadastrado ainda.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
