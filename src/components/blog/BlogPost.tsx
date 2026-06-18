'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { BlogPost as BlogPostType } from '@/lib/blog'

type BlogPostProps = {
  post: BlogPostType
  relatedPosts: BlogPostType[]
}

type ToastType = 'success' | 'error' | null

function formatDate(date?: { toDate?: () => Date }) {
  const parsed = date?.toDate ? date.toDate() : new Date()
  return parsed.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

function readingTime(html: string) {
  const text = html.replace(/<[^>]*>/g, ' ')
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export default function BlogPost({ post, relatedPosts }: BlogPostProps) {
  const [toastMessage, setToastMessage] = useState<ToastType>(null)
  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

  const showToast = (message: ToastType) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${post.title} ${pageUrl}`)}`, '_blank')
    showToast('success')
  }

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, '_blank')
    showToast('success')
  }

  const copyLink = async () => {
    if (!pageUrl) return
    try {
      await navigator.clipboard.writeText(pageUrl)
      showToast('success')
    } catch {
      showToast('error')
    }
  }

  return (
    <main className="min-h-screen bg-[#121417]">
      <AnimatePresence>
        {toastMessage === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium z-50"
          >
            ✓ Copiado para a área de transferência
          </motion.div>
        )}
        {toastMessage === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium z-50"
          >
            Erro ao copiar o link
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#1C1C2E] text-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/blog" className="text-sm text-white/60 hover:text-[#C9A05A] transition-colors inline-flex items-center gap-1">
              ← Voltar para o blog
            </Link>
          </div>

          {post ? (
            <>
              {post.category ? (
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A05A] mb-4">
                  {post.category}
                </span>
              ) : null}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap gap-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{readingTime(post.content)} min de leitura</span>
                </div>
              </div>
            </>
          ) : (
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-4">
                Post não encontrado
              </h1>
              <p className="text-white/70 mb-4">Desculpe, não conseguimos localizar o artigo que você procura.</p>
              <Link href="/blog" className="text-sm text-[#C9A05A] hover:text-[#D6B572] transition-colors inline-flex items-center gap-2 font-light">
                Voltar para todos os artigos →
              </Link>
            </div>
          )}
        </div>
      </div>

      {post ? (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {post.coverImage ? (
            <div className="rounded-2xl overflow-hidden border border-white/10 mb-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.coverImage} alt={post.title} className="w-full h-[400px] object-cover" />
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-3 mb-10 pb-8 border-b border-white/10">
            <span className="text-sm text-white/50">Compartilhar:</span>
            <button
              onClick={shareWhatsApp}
              className="text-xs px-4 py-2 rounded-full bg-[#25D366] text-white font-medium hover:bg-[#1fa851] transition-colors"
            >
              WhatsApp
            </button>
            <button
              onClick={shareFacebook}
              className="text-xs px-4 py-2 rounded-full bg-[#1877F2] text-white font-medium hover:bg-[#165dd0] transition-colors"
            >
              Facebook
            </button>
            <button
              onClick={copyLink}
              className="text-xs px-4 py-2 rounded-full bg-white text-[#121417] font-medium hover:bg-[#E8E8E8] transition-colors"
            >
              Copiar link
            </button>
          </div>

          <div
            className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-headings:font-light prose-p:text-white/80 prose-strong:text-white prose-strong:font-semibold prose-a:text-[#C9A05A] prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {relatedPosts.length ? (
            <section className="mt-16 pt-12 border-t border-white/10">
              <h2 className="text-3xl font-light text-white mb-2">Blogs recomendados</h2>
              <p className="text-white/60 text-base font-light mb-8">
                Confira outros artigos que você pode gostar também
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/post?slug=${related.slug}`}
                    className="group rounded-2xl border border-white/10 bg-[#1C1C2E] overflow-hidden hover:shadow-xl hover:border-[#C9A05A]/30 transition-all duration-300"
                  >
                    {related.coverImage && (
                      <div className="relative h-48 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={related.coverImage}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-xs text-white/40 mb-3 font-light">
                        {formatDate(related.createdAt)}
                      </p>
                      <h3 className="text-lg text-white font-light line-clamp-2 mb-3 group-hover:text-[#C9A05A] transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-sm text-white/60 line-clamp-3 font-light">
                        {related.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      ) : null}
    </main>
  )
}
