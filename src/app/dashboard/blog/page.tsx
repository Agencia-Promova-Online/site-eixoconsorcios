'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardBlogRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/dashboard')
  }, [router])

  return (
    <main className="min-h-screen bg-[#ECEFF3] flex items-center justify-center text-sm text-[#1C1C2E]/70">
      Redirecionando para o dashboard...
    </main>
  )
}
