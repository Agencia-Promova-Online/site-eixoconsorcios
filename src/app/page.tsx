'use client'
/* Gabriel Xavier — https://www.linkedin.com/in/gabrielxp/ */

import { useEffect } from 'react'
import AOS from 'aos'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Macbook from '@/components/Macbook'
import RepresentantesSection from '@/components/RepresentantesSection'
import BlogSection from '@/components/BlogSection'
import ContactForm from '@/components/ContactForm'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
      offset: 50,
    })
  }, [])

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Macbook />
      <RepresentantesSection />

      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  )
}
