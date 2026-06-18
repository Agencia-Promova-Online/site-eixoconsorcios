'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BlogPost from '@/components/blog/BlogPost'
import { getPublishedBlogBySlug, listPublishedBlogs, type BlogPost as BlogPostType } from '@/lib/blog'

type BlogPostQueryClientProps = {
  slug: string
}

export default function BlogPostQueryClient({ slug }: BlogPostQueryClientProps) {
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!slug) return

    Promise.all([getPublishedBlogBySlug(slug), listPublishedBlogs(6)])
      .then(([found, all]) => {
        setPost(found)
        if (found) {
          setRelatedPosts(all.filter((item) => item.slug !== found.slug).slice(0, 3))
        }
      })
      .finally(() => setDone(true))
  }, [slug])

  const loading = Boolean(slug) && !done

  return (
    <main className="min-h-screen bg-[#121417]">
      <Navbar />
      {loading ? (
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="h-10 w-2/3 bg-white/10 rounded animate-pulse mb-6" />
          <div className="h-64 w-full bg-white/10 rounded-2xl animate-pulse" />
        </div>
      ) : post ? (
        <BlogPost post={post} relatedPosts={relatedPosts} />
      ) : (
        <div className="min-h-screen bg-[#1C1C2E] text-white flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-light text-white mb-4">Post não encontrado</h1>
            <p className="text-white/70 mb-8">Este conteúdo não está publicado ou não existe.</p>
            <a
              href="/blog"
              className="inline-block px-8 py-3 bg-[#C9A05A] text-[#1C1C2E] font-medium rounded-lg hover:bg-[#D6B572] transition-colors"
            >
              Ver todos os blogs
            </a>
          </div>
        </div>
      )}
      <Footer />
    </main>
  )
}
