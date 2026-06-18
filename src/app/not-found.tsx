'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AnimatedButton } from '@/components/ui/animated-button'
import { motion } from 'framer-motion'
import { Home, ArrowRight } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0F1119] flex flex-col pt-24">
            <Navbar />

            <main className="flex-grow flex items-center justify-center relative overflow-hidden py-20 lg:py-32">

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full max-h-[600px] opacity-30">
                    <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#C9A05A]/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-block mb-8">
                            <span className="text-sm font-light tracking-[0.3em] text-[#C9A05A] uppercase px-4 py-2 border border-[#C9A05A]/30 rounded-full bg-[#C9A05A]/5">
                                Erro 404
                            </span>
                        </div>

                        <h1 className="text-[120px] sm:text-[180px] lg:text-[220px] font-medium text-[#FAF9F6] leading-none mb-4 select-none">
                            404
                        </h1>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#FAF9F6] mb-8">
                            Página não <span className="font-medium">encontrada</span>
                        </h2>

                        <p className="text-white/60 text-lg sm:text-xl font-light max-w-xl mx-auto mb-12 leading-relaxed">
                            O caminho que você tentou acessar não existe ou foi removido.
                            Gostaria de voltar para a nossa página inicial?
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <AnimatedButton
                                variant="primary"
                                size="lg"
                                className="w-full sm:w-auto min-w-[240px]"
                                onClick={() => window.location.href = '/'}
                            >
                                <Home className="w-5 h-5 mr-1" />
                                Voltar ao Início
                            </AnimatedButton>

                            <Link
                                href="/contato"
                                className="group flex items-center gap-2 text-sm font-light text-white/70 hover:text-[#C9A05A] transition-all duration-300"
                            >
                                Precisa de ajuda? Fale conosco
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
