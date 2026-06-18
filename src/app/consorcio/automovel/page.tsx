'use client'

import { useEffect, useState } from 'react'
import AOS from 'aos'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AnimatedButton } from '@/components/ui/animated-button'
import {
  Car,
  Shield,
  CheckCircle,
  ChevronDown,
  Zap,
  Star,
  Users,
  Clock,
  TrendingUp,
  CreditCard,
} from 'lucide-react'

interface Benefit {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  title: string
  description: string
}

interface Stat {
  value: string
  label: string
}

interface CarCategory {
  title: string
  description: string
  tag: string
  image: string
}

interface Step {
  number: string
  title: string
  description: string
}

interface FAQItem {
  question: string
  answer: string
}

const stats: Stat[] = [
  { value: 'Até 80', label: 'meses' },
  { value: '0%', label: 'Juros' },
  { value: 'Novos e', label: 'Seminovos' },
  { value: 'Milhares', label: 'Contemplados' },
]

const benefits: Benefit[] = [
  {
    icon: Shield,
    title: 'Sem Juros',
    description:
      'Pague apenas a taxa de administração, muito menor do que os juros de um financiamento convencional. Economize de verdade na compra do seu carro.',
  },
  {
    icon: Car,
    title: 'Carros Novos e Seminovos',
    description:
      'A carta de crédito pode ser usada tanto para veículos zero quilômetro quanto para seminovos de até 5 anos de fabricação, com ampla liberdade de escolha.',
  },
  {
    icon: Star,
    title: 'Diversas Marcas',
    description:
      'Volkswagen, Fiat, GM, Toyota, Honda, Ford, Hyundai, BMW, Mercedes-Benz e muito mais. Você escolhe a marca e o modelo que mais combina com você.',
  },
  {
    icon: Clock,
    title: 'Planos Flexíveis',
    description:
      'Prazos de 24 a 80 meses e cartas de crédito variadas para encaixar perfeitamente no seu orçamento mensal, sem apertar as finanças.',
  },
  {
    icon: Zap,
    title: 'Contemplação por Lance ou Sorteio',
    description:
      'Seja contemplado a qualquer momento pelo sorteio mensal ou acelere sua contemplação oferecendo um lance nas assembleias mensais.',
  },
  {
    icon: CreditCard,
    title: 'Carta de Crédito à Vista',
    description:
      'Com a carta em mãos você negocia como comprador à vista na concessionária, garantindo descontos e condições especiais que o financiado não consegue.',
  },
]

const carCategories: CarCategory[] = [
  {
    title: 'Carros Populares',
    description:
      'Hatch, sedã e compactos das principais marcas do Brasil. Economia e praticidade com as melhores condições.',
    tag: 'A partir de R$ 40 mil',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&auto=format&fit=crop',
  },
  {
    title: 'Carros Premium',
    description:
      'Berlinas e esportivos de alto padrão. BMW, Mercedes, Audi, Volvo e muito mais com parcelas que cabem no bolso.',
    tag: 'A partir de R$ 150 mil',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&auto=format&fit=crop',
  },
  {
    title: 'SUVs e Pickups',
    description:
      'Para quem precisa de espaço, conforto e versatilidade. Os SUVs e pickups mais desejados do mercado ao seu alcance.',
    tag: 'A partir de R$ 80 mil',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&auto=format&fit=crop',
  },
]

const steps: Step[] = [
  {
    number: '01',
    title: 'Escolha e Adira',
    description:
      'Escolha o valor da carta de crédito e o prazo que cabe no seu orçamento. Nossa equipe orienta a adesão com clareza e sem burocracia.',
  },
  {
    number: '02',
    title: 'Contribua Mensalmente',
    description:
      'Pague sua parcela mensal sem juros e acumule crédito. Cada pagamento é uma etapa a mais na conquista do seu veículo.',
  },
  {
    number: '03',
    title: 'Participe das Assembleias',
    description:
      'A cada mês há contemplações por sorteio e lance. Você pode ofertar um lance para ser contemplado antes e escolher seu carro mais rápido.',
  },
  {
    number: '04',
    title: 'Escolha e Compre à Vista',
    description:
      'Com a carta de crédito liberada, vá à concessionária ou ao vendedor e negocie como comprador à vista, com todo o poder de barganha.',
  },
]

const faqItems: FAQItem[] = [
  {
    question: 'Posso comprar um carro seminovo com o consórcio de automóveis?',
    answer:
      'Sim. A carta de crédito de automóveis pode ser usada para adquirir veículos novos zero quilômetro ou seminovos de até 5 anos de fabricação (alguns planos aceitam veículos mais antigos). O importante é que o veículo esteja dentro do valor da carta contratada.',
  },
  {
    question: 'Qual é a diferença entre consórcio e financiamento de veículo?',
    answer:
      'No financiamento você paga juros — que no Brasil podem ultrapassar 20% ao ano — e o veículo fica alienado ao banco. No consórcio você não paga juros, apenas uma taxa de administração muito menor, mas não recebe o veículo imediatamente, sendo contemplado por sorteio ou lance ao longo do plano. O consórcio é a melhor opção para quem pode aguardar e quer economizar.',
  },
  {
    question: 'Quanto tempo leva para ser contemplado?',
    answer:
      'Não há um prazo fixo, pois a contemplação por sorteio é aleatória e pode ocorrer no primeiro mês ou somente ao final do plano. Porém, você pode antecipar a contemplação oferecendo lances nas assembleias mensais. Historicamente, a maioria dos consorciados é contemplada antes de completar 50% do prazo do plano.',
  },
  {
    question: 'Posso usar a carta de crédito para qualquer marca de veículo?',
    answer:
      'Sim. Diferente de alguns financiamentos que são atrelados à montadora, a carta de crédito do consórcio é flexível e pode ser usada para adquirir veículos de praticamente qualquer marca disponível no mercado brasileiro — desde populares até importados de alto padrão.',
  },
]

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-[#1C1C2E]/10 rounded-2xl overflow-hidden"
          data-aos="fade-up"
          data-aos-delay={index * 60}
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-[#FAF9F6] transition-colors"
          >
            <span className="text-[#1C1C2E] font-medium text-sm sm:text-base pr-4">
              {item.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-[#C9A05A] flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                }`}
              strokeWidth={1.5}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
          >
            <div className="px-6 pb-5 pt-1 bg-white border-t border-[#1C1C2E]/5">
              <p className="text-[#1C1C2E]/60 text-sm font-light leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ConsorcioDeAutomoveis() {
  const whatsappUrl =
    'https://wa.me/556131421052?text=Ol%C3%A1%2C%20vim%20do%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20cons%C3%B3rcio%20de%20ve%C3%ADculos'

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

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&auto=format&fit=crop"
          alt="Carro moderno"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1119]/75 via-[#0F1119]/55 to-[#0F1119]/85" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A05A]/40 bg-[#C9A05A]/10 mb-6"
            data-aos="fade-down"
          >
            <Car className="w-3.5 h-3.5 text-[#C9A05A]" strokeWidth={1.5} />
            <span className="text-[#C9A05A] text-xs font-medium tracking-widest uppercase">
              Até 80 meses
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-7xl font-light text-white leading-tight tracking-tight mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Consórcio de
            <br />
            <span className="text-[#C9A05A]">Automóveis</span>
          </h1>

          <p
            className="text-lg sm:text-xl text-white/70 font-light max-w-2xl mx-auto mb-10 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Seu carro novo ou seminovo com parcelas que cabem no bolso. Sem juros,
            adesão flexível e com total liberdade para escolher o modelo que você quiser.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <AnimatedButton
              variant="primary"
              size="lg"
              onClick={() => window.open(whatsappUrl, '_blank')}
            >
              Fale com nossa equipe
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              size="lg"
              onClick={() =>
                document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Como funciona
            </AnimatedButton>
          </div>
        </div>

      </section>

      <section className="bg-[#0F1119] py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-3xl overflow-hidden">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#0F1119] px-8 py-10 text-center"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <p className="text-3xl sm:text-4xl font-light text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-[#C9A05A] text-sm font-light tracking-widest uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p
              className="text-[#C9A05A] text-xs font-medium tracking-widest uppercase mb-4"
              data-aos="fade-up"
            >
              Vantagens
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1C2E] leading-tight"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Por que escolher o{' '}
              <span className="text-[#C9A05A]">Consórcio de Automóveis?</span>
            </h2>
            <p
              className="mt-4 text-[#1C1C2E]/60 font-light leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              A forma mais inteligente e econômica de trocar de carro sem comprometer
              seu orçamento com juros abusivos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 border border-[#1C1C2E]/5 hover:border-[#C9A05A]/20 hover:shadow-xl hover:shadow-[#C9A05A]/5 transition-all duration-300 hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#C9A05A]/10 flex items-center justify-center mb-6 group-hover:bg-[#C9A05A]/20 transition-colors">
                  <benefit.icon
                    className="w-5 h-5 text-[#C9A05A]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-[#1C1C2E] font-medium text-lg mb-3">
                  {benefit.title}
                </h3>
                <p className="text-[#1C1C2E]/60 text-sm font-light leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p
              className="text-[#C9A05A] text-xs font-medium tracking-widest uppercase mb-4"
              data-aos="fade-up"
            >
              Categorias
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1C2E] leading-tight"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Qual categoria é a{' '}
              <span className="text-[#C9A05A]">sua?</span>
            </h2>
            <p
              className="mt-4 text-[#1C1C2E]/60 font-light leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              Do popular ao premium, temos o plano certo para qualquer sonho sobre
              quatro rodas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {carCategories.map((category, index) => (
              <div
                key={index}
                className="group relative rounded-3xl overflow-hidden aspect-[4/5]"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1119]/80 via-transparent to-transparent" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1119] via-[#0F1119]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute top-5 left-5 z-10">
                  <span className="inline-block px-3 py-1 bg-[#C9A05A]/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                    {category.tag}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <p className="text-white/80 text-sm font-light leading-relaxed mb-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {category.description}
                  </p>
                  <h3 className="text-white font-medium text-xl">
                    {category.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="py-24 bg-[#0F1119]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p
              className="text-[#C9A05A] text-xs font-medium tracking-widest uppercase mb-4"
              data-aos="fade-up"
            >
              Processo
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Simples e{' '}
              <span className="text-[#C9A05A]">transparente</span>
            </h2>
            <p
              className="mt-4 text-white/50 font-light"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              Entenda como funciona o consórcio de automóveis do começo ao fim.
            </p>
          </div>

          <div className="relative">
            <div
              className="hidden lg:block absolute h-px bg-white/10 z-0"
              style={{ top: '2rem', left: 'calc(12.5%)', right: 'calc(12.5%)' }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center relative z-10"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="w-16 h-16 rounded-full border border-[#C9A05A]/25 bg-[#0F1119] flex items-center justify-center mb-6">
                    <span className="text-[#C9A05A]/70 font-light text-lg">{step.number}</span>
                  </div>
                  <h3 className="text-white font-medium text-lg mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm font-light leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p
                className="text-[#C9A05A] text-xs font-medium tracking-widest uppercase mb-4"
                data-aos="fade-up"
              >
                Dúvidas frequentes
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1C2E] leading-tight"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Perguntas{' '}
                <span className="text-[#C9A05A]">frequentes</span>
              </h2>
              <p
                className="mt-4 text-[#1C1C2E]/60 font-light"
                data-aos="fade-up"
                data-aos-delay="150"
              >
                Tudo que você precisa saber antes de contratar o Consórcio de Automóveis.
              </p>
            </div>

            <FAQAccordion items={faqItems} />

            <div className="mt-12 text-center" data-aos="fade-up">
              <p className="text-[#1C1C2E]/50 text-sm font-light mb-4">
                Tem alguma outra dúvida? Nossa equipe está pronta para ajudar.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#C9A05A] font-medium text-sm hover:gap-3 transition-all"
              >
                Falar com um consultor →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#C9A05A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6" data-aos="fade-down">
              <Car className="w-5 h-5 text-white/60" strokeWidth={1.5} />
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6"
              data-aos="fade-up"
            >
              Pronto para sair
              <br />
              <span className="font-medium">de carro novo?</span>
            </h2>
            <p
              className="text-white/80 font-light text-lg mb-10 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Fale com nossos consultores e descubra o plano perfeito para o
              seu próximo veículo. Atendimento sem pressão, sem burocracia.
            </p>
            <div data-aos="fade-up" data-aos-delay="200">
              <AnimatedButton
                variant="primary"
                size="lg"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                Falar com consultor
              </AnimatedButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
