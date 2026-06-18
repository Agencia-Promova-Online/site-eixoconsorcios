'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { listPublishedBlogs, type BlogPost } from '@/lib/blog'

function formatDate(date?: { toDate?: () => Date }) {
  const parsed = date?.toDate ? date.toDate() : new Date()
  return parsed.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listPublishedBlogs(4)
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-56 bg-black/10 rounded animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-black/10 bg-white overflow-hidden animate-pulse">
                <div className="h-44 bg-black/10" />
                <div className="p-4 space-y-2">
                  <div className="h-3 w-24 bg-black/10 rounded" />
                  <div className="h-4 w-full bg-black/10 rounded" />
                  <div className="h-4 w-2/3 bg-black/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!posts.length) return null

  return (
    <section className="py-24 bg-[#FAF9F6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[#C9A05A] text-xs tracking-[0.25em] uppercase font-semibold mb-3">Conteúdo</p>
            <h2 className="text-3xl sm:text-4xl font-light text-[#1C1C2E]">Do Blog</h2>
          </div>
          <Link href="/blog" className="text-sm text-[#1C1C2E] hover:text-[#C9A05A] transition-colors">
            Ver todos
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/post?slug=${post.slug}`}
              className="group rounded-2xl border border-black/10 bg-white overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="h-44 bg-[#F0ECE2] overflow-hidden">
                {post.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
              </div>
              <div className="p-4">
                <p className="text-xs text-[#1C1C2E]/55 mb-2">{formatDate(post.createdAt)}</p>
                <h3 className="text-[#1C1C2E] font-medium leading-snug line-clamp-2 group-hover:text-[#C9A05A] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-[#1C1C2E]/65 mt-2 line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
