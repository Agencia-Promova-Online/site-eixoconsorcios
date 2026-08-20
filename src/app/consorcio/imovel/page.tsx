'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AOS from 'aos'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AnimatedButton } from '@/components/ui/animated-button'
import bannerImg from '@/assets/imovel/banner.png'
import casaImg from '@/assets/imovel/casa.png'
import apartamentoImg from '@/assets/imovel/apartamento.png'
import terrenoImg from '@/assets/imovel/terreno.png'
import {
  Home,
  Shield,
  CheckCircle,
  ChevronDown,
  Zap,
  TrendingUp,
  Users,
  Clock,
  Landmark,
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

interface PropertyType {
  title: string
  description: string
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
  { value: 'Até 200', label: 'meses' },
  { value: '0%', label: 'Juros' },
  { value: 'Sem', label: 'Entrada' },
  { value: '5.000+', label: 'Contemplados' },
]

const benefits: Benefit[] = [
  {
    icon: Shield,
    title: 'Sem Juros',
    description:
      'Diferente do financiamento tradicional, no consórcio você não paga juros. Sua carta de crédito vale o valor integral que você contratou.',
  },
  {
    icon: CheckCircle,
    title: 'Adesão Flexível',
    description:
      'Escolha entre consórcio com ou sem adesão, conforme sua preferência. Ajustamos o melhor plano para sua realidade financeira.',
  },
  {
    icon: TrendingUp,
    title: 'Poder de Compra à Vista',
    description:
      'Ao ser contemplado, você recebe a carta de crédito e negocia o imóvel como comprador à vista, garantindo descontos de até 15%.',
  },
  {
    icon: Zap,
    title: 'Contemplação por Lance',
    description:
      'Quer ser contemplado mais rápido? Ofereça um lance nas assembleias mensais e adiante sua contemplação conforme sua disponibilidade financeira.',
  },
  {
    icon: Clock,
    title: 'Parcelas Flexíveis',
    description:
      'Planos de 60 a 200 meses para encaixar no seu orçamento. Escolha o valor da carta de crédito e o prazo ideal para sua realidade.',
  },
  {
    icon: Users,
    title: 'Transparência e Segurança',
    description:
      'Eixo é 100% autorizada e fiscalizada pelo Banco Central. Operamos com total transparência nos valores, prazos e contemplações.',
  },
]

const propertyTypes = [
  {
    title: 'Casa Residencial',
    description: 'Casa própria no bairro que você sempre quis, com o quintal que a família merece.',
    image: casaImg,
    isLocal: true,
  },
  {
    title: 'Apartamento',
    description: 'Do estúdio compacto ao apartamento de alto padrão, realize seu projeto com planejamento.',
    image: apartamentoImg,
    isLocal: true,
  },
  {
    title: 'Terreno',
    description: 'Compre o terreno e construa do jeito que você sempre imaginou, no ritmo certo.',
    image: terrenoImg,
    isLocal: true,
  },
  {
    title: 'Construção',
    description: 'Use a carta de crédito para financiar a construção ou reforma do seu imóvel.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop',
    isLocal: false,
  },
]

const steps: Step[] = [
  {
    number: '01',
    title: 'Escolha e Adira',
    description:
      'Escolha o valor da carta de crédito e o prazo ideal. Nossa equipe orienta a adesão com transparência e sem compromisso comercial.',
  },
  {
    number: '02',
    title: 'Contribua Mensalmente',
    description:
      'Pague sua parcela mensal e acumule crédito. Cada pagamento é um passo a mais em direção ao seu imóvel.',
  },
  {
    number: '03',
    title: 'Participe das Assembleias',
    description:
      'Todos os meses há contemplações por sorteio e lance. Você pode ser contemplado a qualquer momento durante o plano.',
  },
  {
    number: '04',
    title: 'Use a Carta de Crédito',
    description:
      'Com a carta em mãos, negocie e adquira o imóvel que deseja como comprador à vista, com todo o poder de barganha.',
  },
]

const faqItems: FAQItem[] = [
  {
    question: 'Como funciona a contemplação no consórcio de imóveis?',
    answer:
      'A contemplação acontece em assembleias mensais por duas formas: sorteio, que é aleatório e todos os consorciados participam igualmente, ou lance, onde você oferece um percentual do seu crédito para ser contemplado antes. Após a contemplação, a carta de crédito é liberada para a compra do imóvel.',
  },
  {
    question: 'Qual o valor mínimo e máximo da carta de crédito?',
    answer:
      'As cartas de crédito para imóveis variam geralmente entre R$ 100.000 e R$ 5.000.000, dependendo da administradora e do plano escolhido. Nossa equipe vai ajudá-lo a encontrar o valor ideal para o imóvel que você deseja adquirir.',
  },
  {
    question: 'Posso usar o FGTS no consórcio de imóveis?',
    answer:
      'Sim! O FGTS pode ser utilizado de três formas: para dar um lance e antecipar sua contemplação, para amortizar o saldo devedor após a contemplação ou para complementar a carta de crédito caso o imóvel seja de valor superior. As regras seguem as normas da Caixa Econômica Federal.',
  },
  {
    question: 'O que acontece se eu atrasar uma parcela?',
    answer:
      'O atraso de parcelas suspende sua participação nas assembleias enquanto perdurar a inadimplência, mas não cancela seu consórcio automaticamente. Ao regularizar a situação, você volta a concorrer normalmente. Recomendamos sempre manter as parcelas em dia para aproveitar todas as oportunidades de contemplação.',
  },
  {
    question: 'Posso usar a carta de crédito para qualquer tipo de imóvel?',
    answer:
      'A carta de crédito para imóveis pode ser usada para compra de imóvel residencial novo ou usado, terreno, imóvel comercial (com algumas restrições de plano) e até para construção ou reforma — desde que previsto no contrato. Nossa equipe orienta sobre as regras de cada administradora.',
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

export default function ConsorcioDeimoveis() {
  const router = useRouter()
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
        <Image
          src={bannerImg}
          alt="Consórcio de Imóveis — Eixo"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1119]/70 via-[#0F1119]/60 to-[#0F1119]/80" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A05A]/40 bg-[#C9A05A]/10 mb-6"
            data-aos="fade-down"
          >
            <Home className="w-3.5 h-3.5 text-[#C9A05A]" strokeWidth={1.5} />
            <span className="text-[#C9A05A] text-xs font-medium tracking-widest uppercase">
              Até 200 meses
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-7xl font-light text-white leading-tight tracking-tight mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Consórcio de
            <br />
            <span className="text-[#C9A05A]">Imóveis</span>
          </h1>

          <p
            className="text-lg sm:text-xl text-white/70 font-light max-w-2xl mx-auto mb-10 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Realize o sonho da casa própria sem pagar juros. Planejamento
            inteligente para conquistar o imóvel que você merece.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <AnimatedButton
              variant="primary"
              size="lg"
              onClick={() => router.push('/contato')}
            >
              Fale com nossa equipe
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              size="lg"
              onClick={() => {
                document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Como funciona
            </AnimatedButton>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/40" strokeWidth={1} />
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
              <span className="text-[#C9A05A]">Consórcio de Imóveis?</span>
            </h2>
            <p
              className="mt-4 text-[#1C1C2E]/60 font-light leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              Uma alternativa inteligente ao financiamento, sem juros e com
              total segurança para você e sua família.
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
              Opções
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1C2E] leading-tight"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              O que você pode{' '}
              <span className="text-[#C9A05A]">adquirir?</span>
            </h2>
            <p
              className="mt-4 text-[#1C1C2E]/60 font-light leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              A carta de crédito imobiliário oferece flexibilidade para
              diferentes objetivos de vida.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertyTypes.map((property, index) => (
              <div
                key={index}
                className="group relative rounded-3xl overflow-hidden aspect-[3/4]"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                {property.isLocal ? (
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <img
                    src={property.image as string}
                    alt={property.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1119]/80 via-transparent to-transparent" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1119] via-[#0F1119]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <p className="text-white/80 text-xs font-light leading-relaxed mb-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {property.description}
                  </p>
                  <h3 className="text-white font-medium text-lg">
                    {property.title}
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
              Como funciona o{' '}
              <span className="text-[#C9A05A]">consórcio?</span>
            </h2>
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
                Tire suas principais dúvidas sobre o Consórcio de Imóveis.
              </p>
            </div>

            <FAQAccordion items={faqItems} />

            <div className="mt-12 text-center" data-aos="fade-up">
              <p className="text-[#1C1C2E]/50 text-sm font-light mb-4">
                Ainda tem dúvidas? Fale com um de nossos especialistas.
              </p>
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 text-[#C9A05A] font-medium text-sm hover:gap-3 transition-all"
              >
                Falar com um consultor →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#C9A05A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div
              className="inline-flex items-center gap-2 mb-6"
              data-aos="fade-down"
            >
              <Landmark className="w-5 h-5 text-white/60" strokeWidth={1.5} />
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6"
              data-aos="fade-up"
            >
              Pronto para conquistar
              <br />
              <span className="font-medium">seu imóvel?</span>
            </h2>
            <p
              className="text-white/80 font-light text-lg mb-10 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Converse com nossos especialistas e descubra o plano ideal para
              você. Sem compromisso, sem burocracia.
            </p>
            <div
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <AnimatedButton
                variant="primary"
                size="lg"
                onClick={() => router.push('/contato')}
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
