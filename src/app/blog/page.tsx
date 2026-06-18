'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Search,
  GraduationCap,
  Landmark,
  TrendingUp,
  Lightbulb,
  Newspaper,
  Building2,
  BookOpen,
  type LucideIcon,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { listPublishedBlogs, type BlogPost } from '@/lib/blog'

function formatDate(date?: { toDate?: () => Date }) {
  const parsed = date?.toDate ? date.toDate() : new Date()
  return parsed
    .toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
    .replace('.', '')
    .toUpperCase()
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'Educação Financeira': GraduationCap,
  Consórcio: Landmark,
  Mercado: TrendingUp,
  Dicas: Lightbulb,
  Notícias: Newspaper,
  Institucional: Building2,
}

function iconForCategory(category?: string): LucideIcon {
  if (category && CATEGORY_ICONS[category]) return CATEGORY_ICONS[category]
  return BookOpen
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')

  useEffect(() => {
    let mounted = true
    const timeout = setTimeout(() => {
      if (!mounted) return
      setHasError(true)
      setLoading(false)
    }, 8000)

    listPublishedBlogs()
      .then((data) => {
        if (!mounted) return
        setPosts(data)
      })
      .catch(() => {
        if (!mounted) return
        setPosts([])
        setHasError(true)
      })
      .finally(() => {
        if (!mounted) return
        clearTimeout(timeout)
        setLoading(false)
      })

    return () => {
      mounted = false
      clearTimeout(timeout)
    }
  }, [])

  const categories = useMemo(() => {
    const found = Array.from(new Set(posts.map((p) => p.category).filter(Boolean))) as string[]
    return ['Todos', ...found]
  }, [posts])

  const filteredPosts = useMemo(() => {
    const term = search.trim().toLowerCase()
    return posts.filter((post) => {
      const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory
      const matchesSearch =
        !term ||
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term)
      return matchesCategory && matchesSearch
    })
  }, [posts, search, activeCategory])

  return (
    <main className="min-h-screen bg-[#121417]">
      <Navbar />

      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A05A] mb-3">
              Blog Eixo
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-light text-white mb-4">
              Conteúdos & Conhecimento
            </h1>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
              Tudo sobre consórcio, planejamento financeiro e oportunidades de mercado.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-12">
            <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                    activeCategory === cat
                      ? 'border-[#C9A05A] bg-[#C9A05A] text-[#121417]'
                      : 'border-white/15 text-white/70 hover:border-[#C9A05A]/50 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquise no blog"
                className="w-full h-11 rounded-full border border-white/15 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C9A05A]/60"
              />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-lg bg-white overflow-hidden animate-pulse">
                  <div className="aspect-square bg-black/10" />
                  <div className="p-6 pt-10 space-y-3">
                    <div className="h-3 w-24 bg-black/10 rounded mx-auto" />
                    <div className="h-4 w-3/4 bg-black/10 rounded mx-auto" />
                    <div className="h-3 w-20 bg-black/10 rounded mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {filteredPosts.map((post) => {
                const Icon = iconForCategory(post.category)
                return (
                  <Link
                    key={post.id}
                    href={`/blog/post?slug=${post.slug}`}
                    className="group relative flex flex-col rounded-lg bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <div className="relative">
                      <div className="aspect-square overflow-hidden bg-[#EDEAE2]">
                        {post.coverImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Icon className="h-16 w-16 text-[#C9A05A]/30" />
                          </div>
                        )}
                      </div>
                      <div className="absolute left-1/2 -bottom-7 z-10 -translate-x-1/2">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A05A] text-white shadow-lg ring-4 ring-white">
                          <Icon className="h-6 w-6" strokeWidth={1.8} />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col items-center px-6 pb-8 pt-12 text-center">
                      {post.category ? (
                        <span className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#C9A05A]">
                          {post.category}
                        </span>
                      ) : null}
                      <h2 className="font-serif text-xl leading-snug text-[#1C1C2E] line-clamp-2 transition-colors group-hover:text-[#C9A05A]">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-sm text-[#1C1C2E]/60 line-clamp-2">{post.excerpt}</p>
                      <span className="mt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1C1C2E]/40">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
              <h2 className="text-2xl font-serif font-light text-white mb-3">
                {posts.length === 0
                  ? 'Nenhum conteúdo publicado no momento'
                  : 'Nenhum resultado encontrado'}
              </h2>
              <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto">
                {posts.length === 0
                  ? hasError
                    ? 'Não foi possível carregar os posts agora. Tente novamente em instantes.'
                    : 'Estamos preparando novos conteúdos para o blog. Volte em breve.'
                  : 'Tente outro termo de busca ou selecione outra categoria.'}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
