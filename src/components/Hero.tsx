'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { FlipWords } from '@/components/ui/flip-words'
import { AnimatedButton } from '@/components/ui/animated-button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import img1 from '../assets/imagens/img1.jpg'
import img2 from '../assets/imagens/img2.png'
import img3 from '../assets/imagens/img3.png'
import img4 from '../assets/imagens/img4.png'
import img5 from '../assets/imagens/img5.png'
import img6 from '../assets/imagens/img6.png'
import img7 from '../assets/imagens/img7.png'

const carouselImages = [img1, img2, img3, img4, img5, img6, img7]

const flipWords = [
  'sempre sonhou',
  'tanto planejou',
  'sempre quis',
  'tanto esperou',
  'merece conquistar',
  'sempre buscou',
  'mais deseja',
]

const bannerDescriptions = [
  'Com a Eixo Consórcios, você planeja seu futuro com segurança e sem juros.',
  'Com a Eixo Consórcios, sua família conquista a casa ideal de forma planejada e sem juros.',
  'Com a Eixo Consórcios, a chave do seu carro chega com planejamento, segurança e sem juros.',
  'Com a Eixo Consórcios, você investe no campo com planejamento e sem pagar juros.',
  'Com a Eixo Consórcios, seu projeto imobiliário sai do papel com segurança e planejamento.',
  'Com a Eixo Consórcios, sua viagem dos sonhos acontece com organização e sem juros.',
  'Com a Eixo Consórcios, sua família conquista móveis novos com planejamento e tranquilidade.',
]

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const router = useRouter()
  const isLongFlipWord = flipWords[current] === 'merece conquistar'

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.3 })
      .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
  }, [])

  return (
    <section id="hero" className="relative min-h-dvh lg:min-h-screen overflow-hidden">

      <div className="absolute inset-0">
        {carouselImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${current === index ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <Image
              src={img}
              alt={`Eixo Consórcios — ${flipWords[index]}`}
              fill
              className="object-cover object-center"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex items-center w-full min-h-dvh lg:min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-0 lg:pb-0">
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">

            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-light text-white tracking-tight opacity-0 leading-[1.1]"
            >
              Realize o que
              <br />
              <span className="font-medium">você </span>
              <FlipWords
                words={flipWords}
                className={`font-light text-white !px-0 ${isLongFlipWord ? 'text-[0.82em] sm:text-[1em]' : ''}`}
                currentIndex={current}
              />
            </h1>

            <p
              ref={subtitleRef}
              className="text-xl sm:text-2xl text-white/60 font-light max-w-xl mx-auto lg:mx-0 mt-6 mb-12 opacity-0"
            >
              {bannerDescriptions[current]}
            </p>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center opacity-0"
            >
              <AnimatedButton
                variant="primary"
                size="lg"
                onClick={() => router.push('/contato')}
              >
                Fale Conosco
              </AnimatedButton>
              <AnimatedButton
                variant="outline"
                size="lg"
                onClick={() => router.push('/sobre')}
              >
                Saiba Mais
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex gap-2 z-10">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full ${current === index ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
              }`}
            aria-label={`Imagem ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
