'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import Image from 'next/image'
import { Home, Car, Truck, Building2, Plane, Smartphone, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { AnimatedButton } from './ui/animated-button'
import Agro from './Agro'
import img2 from '../assets/imagens/img2.png'
import img3 from '../assets/imagens/img3.png'
import img4 from '../assets/imagens/img4.png'
import img5 from '../assets/imagens/img5.png'
import img6 from '../assets/imagens/img6.png'
import img7 from '../assets/imagens/img7.png'
import img8 from '../assets/imagens/img8.jpg'

const services = [
  {
    icon: Home,
    title: 'Imóveis',
    description: 'Casa própria, apartamento ou terreno. Realize o sonho da moradia sem juros.',
    features: ['Sem entrada obrigatória', 'Parcelas que cabem no bolso', 'Contemplação por lance ou sorteio'],
    href: '/consorcio/imovel',
    prazo: 'Até 200 meses',
    image: img2,
  },
  {
    icon: Car,
    title: 'Automóveis',
    description: 'Carro novo ou seminovo. Conquiste seu veículo com parcelas acessíveis.',
    features: ['Carros novos e seminovos', 'Diversas marcas', 'Planos flexíveis'],
    href: '/consorcio/automovel',
    prazo: 'Até 80 meses',
    image: img3,
  },
  {
    icon: Truck,
    title: 'Veículos Pesados',
    description: 'Máquinas agrícolas para expandir seu agronegócio.',
    features: ['Tratores e Colheitadeiras', 'Pulverizadores', 'Máquinas agrícolas', 'Ideal para empresas'],
    highlight: true,
    featured: true,
    href: '/consorcio/pesados',
    badge: 'Em Alta',
    prazo: 'Até 180 meses',
    image: img4,
  },
  {
    icon: Building2,
    title: 'Construção',
    description: 'Crédito para construir, reformar ou ampliar seu imóvel.',
    features: ['Construção do zero', 'Reformas completas', 'Ampliações'],
    href: '/consorcio/imovel',
    prazo: 'Até 200 meses',
    image: img5,
  },
  {
    icon: Plane,
    title: 'Viagens',
    description: 'Planeje suas férias dos sonhos com o consórcio de serviços.',
    features: ['Viagens nacionais', 'Destinos internacionais', 'Pacotes completos'],
    href: '/consorcio/servicos',
    prazo: 'Até 60 meses',
    image: img6,
  },
  {
    icon: Smartphone,
    title: 'Serviços',
    description: 'Eletrônicos, móveis, festas e muito mais.',
    features: ['Eletrônicos', 'Móveis planejados', 'Eventos e festas'],
    href: '/consorcio/servicos',
    prazo: 'Até 60 meses',
    image: img7,
  }
]

export default function Services() {
  const router = useRouter()

  useEffect(() => {
    AOS.refresh()
  }, [])

  return (
    <>
      <section id="services" className="py-32 bg-[#0F1119] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#C9A05A]/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#1B3A6B]/[0.05] rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20" data-aos="fade-up">
            <motion.span
              className="text-xs font-semibold tracking-[0.25em] text-white uppercase mb-5 block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              O que oferecemos
            </motion.span>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-8">
              Nossos{' '}
              <span className="font-medium">Consórcios</span>
            </h2>
            <p className="text-[#C9A05A] text-xl font-light lg:whitespace-nowrap">
              Diversas modalidades de consórcio para realizar todos os seus sonhos — sem juros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group"
              >
                <div className={`relative h-full rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${service.featured
                  ? 'bg-[#C9A05A] border-2 border-[#C9A05A] shadow-xl shadow-[#C9A05A]/30 hover:shadow-2xl hover:shadow-[#C9A05A]/40 hover:bg-[#d4a85f]'
                  : 'bg-white/[0.03] border-[3px] border-[#C9A05A]/50 hover:border-[#C9A05A]/80 hover:shadow-2xl hover:shadow-black/30'
                  }`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${service.featured ? 'from-[#C9A05A]/80 via-[#C9A05A]/20 to-transparent' : 'from-[#0F1119] via-[#0F1119]/40 to-transparent'}`} />

                    {service.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#C9A05A] text-black text-xs font-medium px-3 py-1 rounded-full">
                          {service.badge}
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-4 right-4">
                      <span className="bg-black/60 backdrop-blur-sm text-white/80 text-xs font-light px-3 py-1 rounded-full border border-white/10">
                        {service.prazo}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${service.featured ? 'bg-black/15' : 'bg-[#C9A05A]/10'}`}>
                        <service.icon className={`w-5 h-5 ${service.featured ? 'text-black' : 'text-[#C9A05A]'}`} strokeWidth={1.5} />
                      </div>
                      <h3 className={`text-xl font-medium ${service.featured ? 'text-black' : 'text-white'}`}>
                        {service.title}
                      </h3>
                    </div>

                    <p className={`text-sm font-light leading-relaxed mb-5 ${service.featured ? 'text-black/75' : 'text-white/50'}`}>
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className={`flex items-center gap-2 text-sm ${service.featured ? 'text-black/70' : 'text-white/40'}`}>
                          <div className={`w-1 h-1 rounded-full flex-shrink-0 ${service.featured ? 'bg-black/50' : 'bg-[#C9A05A]/60'}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className={`pt-4 border-t flex items-center justify-between ${service.featured ? 'border-black/15' : 'border-white/5'}`}>
                      <AnimatedButton
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-none hover:bg-white/5"
                        onClick={() =>
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                        }
                      >
                        Simular
                      </AnimatedButton>
                      <AnimatedButton
                        variant="primary"
                        size="sm"
                        className={service.featured ? 'bg-[#C9A05A] text-black' : ''}
                        onClick={() => router.push(service.href)}
                      >
                        Saiba Mais
                        <ArrowRight className="w-3.5 h-3.5" />
                      </AnimatedButton>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Agro />
    </>
  )
}
