'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, TrendingUp, Users, Award, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { AnimatedButton } from '@/components/ui/animated-button'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Shield,
    title: 'Segurança Total',
    description: 'Somos administradora de consórcios e garantimos a segurança do seu investimento com gestão transparente e confiável.'
  },
  {
    icon: TrendingUp,
    title: 'Sem Juros',
    description: 'Diferente do financiamento, no consórcio você não paga juros, apenas uma taxa de administração reduzida.'
  },
  {
    icon: Users,
    title: 'Atendimento Personalizado',
    description: 'Nossa equipe oferece orientação personalizada para você escolher a melhor estratégia de consórcio para o seu perfil e objetivos.'
  },
  {
    icon: Award,
    title: 'Experiência Comprovada',
    description: 'Mais de 15 anos no mercado de consórcios, ajudando milhares de pessoas a realizarem seus sonhos.'
  }
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLSpanElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const router = useRouter()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )

      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.word')
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 60,
            rotateX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            }
          }
        )
      }

      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-32 bg-[#FAF9F6] relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="absolute top-20 left-10 w-72 h-72 bg-black/[0.02] rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-black/[0.02] rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span
            ref={subtitleRef}
            className="text-xs font-semibold tracking-[0.25em] text-[#C9A05A] uppercase mb-5 block opacity-0"
          >
            Nossos diferenciais
          </span>

          <h2
            ref={titleRef}
            className="text-5xl sm:text-6xl lg:text-7xl font-light text-black mb-8 perspective-1000"
          >
            <span className="word inline-block">Por</span>{' '}
            <span className="word inline-block">que</span>{' '}
            <span className="word inline-block font-semibold">escolher</span>{' '}
            <span className="word inline-block">a</span>{' '}
            <span className="word inline-block font-medium">Eixo?</span>
          </h2>

          <p
            ref={descRef}
            className="text-black/70 max-w-3xl mx-auto text-xl font-light opacity-0"
          >
            Somos especialistas em consórcios, oferecendo as melhores condições
            para você conquistar seus objetivos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="h-full bg-[#1A1A1A] border border-white/5 rounded-3xl p-8 transition-all duration-500 hover:border-[#C9A05A]/30 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/30">
                <div className="w-12 h-12 rounded-xl bg-[#C9A05A]/10 flex items-center justify-center mb-6 group-hover:bg-[#C9A05A]/20 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-[#C9A05A]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-white/90 mb-3 group-hover:text-[#C9A05A] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/45 text-base font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-16"
        >
          <AnimatedButton
            variant="primary"
            size="lg"
            onClick={() => router.push('/sobre')}
            className="bg-[#C9A05A] text-white"
          >
            Conheça nossa história completa
            <ArrowRight className="w-4 h-4" />
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  )
}
