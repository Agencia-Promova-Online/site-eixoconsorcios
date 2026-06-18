'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import { AnimatedButton } from '@/components/ui/animated-button'
import { auth } from '@/lib/firebase'
import img1 from '../../assets/imagens/img1.jpg'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      await signInWithEmailAndPassword(auth, email, senha)
      router.push('/dashboard')
    } catch {
      setError('Credenciais inválidas. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen">
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(0, 0, 0)"
        gradientBackgroundEnd="rgb(10, 10, 10)"
        firstColor="30, 30, 30"
        secondColor="50, 50, 50"
        thirdColor="70, 70, 70"
        fourthColor="40, 40, 40"
        fifthColor="60, 60, 60"
        pointerColor="100, 100, 100"
        containerClassName="h-auto min-h-screen"
      >
        <motion.div
          className="hidden lg:block absolute top-0 right-0 h-full w-1/2 z-40"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}
          >
            <Image
              src={img1}
              alt="Painel Eixo"
              fill
              className="object-cover object-center"
              priority
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
          </div>
        </motion.div>

        <div className="relative z-50 flex items-start lg:absolute lg:inset-0 lg:items-center w-full h-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-0 lg:pb-0">
            <div className="max-w-2xl text-center lg:text-left">
              <p className="text-white/60 text-sm tracking-[0.25em] uppercase mb-4">Área administrativa</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-light text-white tracking-tight mb-4">
                Acesse seu <span className="font-medium">Painel</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/60 font-light max-w-xl mx-auto lg:mx-0 mb-8">
                Entre com seu e-mail e senha para gerenciar leads de credenciamento e contatos do site.
              </p>

              <form onSubmit={handleSubmit} className="max-w-xl mx-auto lg:mx-0 space-y-4">
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-white/35"
                />
                <input
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-white/35"
                />

                {error ? <p className="text-sm text-red-300">{error}</p> : null}

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                  <AnimatedButton type="submit" size="lg" variant="primary" disabled={loading} className="min-w-[200px]">
                    {loading ? 'Entrando...' : 'Entrar'}
                  </AnimatedButton>
                  <Link href="/" className="min-w-[200px]">
                    <AnimatedButton type="button" size="lg" variant="outline" className="min-w-[200px]">
                      Voltar ao site
                    </AnimatedButton>
                  </Link>
                </div>
              </form>

              <p className="text-sm text-white/65 mt-6">
                Não tem conta?{' '}
                <Link href="/registro" className="text-[#C9A05A] font-medium">
                  Criar conta
                </Link>
              </p>

              <motion.div
                className="lg:hidden mt-10 w-full max-w-md mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                  <Image
                    src={img1}
                    alt="Painel Eixo"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </BackgroundGradientAnimation>
    </section>
  )
}
