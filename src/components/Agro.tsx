'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { AnimatedButton } from './ui/animated-button'
import img8 from '../assets/imagens/img8.jpg'

const agriFeatures = [
  'Tratores e colheitadeiras',
  'Máquinas e implementos agrícolas',
  'Plantadeiras e pulverizadores',
  'Consórcio sem juros',
  'Prazos de até 180 meses',
]

function CountUp({ end, suffix = '', prefix = '', duration = 1800 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, end, duration])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

export default function Agro() {
  const router = useRouter()
  const sectionRef = useRef<HTMLElement>(null)
  const whatsappUrl = 'https://wa.me/556131421052?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20uma%20simula%C3%A7%C3%A3o%20de%20cons%C3%B3rcio'

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0F1119]">

      <div className="absolute inset-0 hidden lg:block overflow-hidden">
        <motion.div className="absolute inset-0 scale-125" style={{ y: parallaxY }}>
          <Image
            src={img8}
            alt="Agronegócio — campos e maquinário"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-l from-[#0F1119]/95 via-[#0F1119]/70 to-[#0F1119]/10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-800/20 via-transparent to-transparent" />
      </div>

      <div className="lg:hidden absolute top-0 left-0 w-full h-[40%]">
        <Image
          src={img8}
          alt="Agronegócio — campos e maquinário"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F1119]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-[640px] lg:min-h-[720px] flex items-center">
          <div className="
            w-full lg:w-[62%] lg:ml-auto
            py-[55%] sm:py-[42%] lg:py-20
            text-center lg:text-right
            flex flex-col items-center lg:items-end
          ">

            <motion.h2
              className="mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-light text-white">
                Consórcio para o
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold text-[#E8C97A]">
                Agronegócio
              </span>
            </motion.h2>

            <motion.p
              className="text-white/65 text-lg sm:text-xl font-light leading-relaxed mb-10 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              O agronegócio move o Brasil e a Eixo Consórcios está ao lado de quem faz a terra produzir.
              Adquira tratores e máquinas agrícolas com condições exclusivas e sem juros.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-12 text-left w-full lg:w-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {agriFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#C9A05A]/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-[#C9A05A]" />
                  </div>
                  <span className="text-white/70 text-base font-light">{feature}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex justify-center lg:justify-end gap-0 mb-12 w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <div className="flex-1 lg:flex-none text-center px-5 lg:px-8">
                <p className="text-5xl sm:text-6xl font-bold text-white tabular-nums leading-none mb-2">
                  <CountUp end={180} duration={1600} />
                </p>
                <p className="text-[#C9A05A] text-xs font-semibold tracking-[0.2em] uppercase">meses</p>
              </div>
              <div className="flex-1 lg:flex-none text-center px-5 lg:px-8 border-x border-white/10">
                <p className="text-5xl sm:text-6xl font-bold text-[#E8C97A] tabular-nums leading-none mb-2">
                  0%
                </p>
                <p className="text-[#C9A05A] text-xs font-semibold tracking-[0.2em] uppercase">juros</p>
              </div>
              <div className="flex-1 lg:flex-none text-center px-5 lg:px-8">
                <p className="text-5xl sm:text-6xl font-bold text-white tabular-nums leading-none mb-2">
                  +<CountUp end={5} suffix="mil" duration={1400} />
                </p>
                <p className="text-[#C9A05A] text-xs font-semibold tracking-[0.2em] uppercase">contemplados</p>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row justify-center lg:justify-end gap-4 w-full sm:w-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <AnimatedButton
                variant="primary"
                size="md"
                className="bg-[#C9A05A] text-black"
                onClick={() => router.push('/consorcio/pesados')}
              >
                Saiba Mais
              </AnimatedButton>
              <AnimatedButton
                variant="outline"
                size="md"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                Falar com Especialista
              </AnimatedButton>
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  )
}
