'use client'

import { useEffect, useState } from 'react'
import BlogPostQueryClient from './BlogPostQueryClient'

export default function BlogPostQueryPage() {
  const [slug, setSlug] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setSlug(params.get('slug') || '')
  }, [])

  return <BlogPostQueryClient slug={slug} />
}
