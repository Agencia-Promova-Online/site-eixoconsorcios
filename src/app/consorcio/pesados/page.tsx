'use client'

import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Truck,
  Tractor,
  Bus,
  Wrench,
  CheckCircle2,
  ChevronDown,
  Clock,
  Percent,
  Users,
  Shield,
  Zap,
  Headphones,
  Tag,
  Award,
} from 'lucide-react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AnimatedButton } from '@/components/ui/animated-button'
import img8 from '@/assets/imagens/img8.jpg'
import caminhao from '@/assets/agronegocio/caminhao.png'
import trator from '@/assets/agronegocio/trator.png'
import onibus from '@/assets/agronegocio/onibus.png'
import maquina from '@/assets/agronegocio/maquina.png'
import fazenda from '@/assets/agronegocio/fazenda.png'

const stats = [
  { label: 'Prazo máximo', value: 'Até 180 meses', icon: Clock },
  { label: 'Taxa de juros', value: '0% Juros', icon: Percent },
  { label: 'Categorias', value: 'Caminhões e Máquinas', icon: Truck },
  { label: 'Elegíveis', value: 'Empresas e Produtores', icon: Users },
]

const vehicles = [
  {
    title: 'Caminhões',
    description:
      'Frota leve a pesada para logística, construção civil e transporte de cargas. Todas as principais marcas do mercado.',
    image: caminhao,
    icon: Truck,
    tags: ['Leve', 'Médio', 'Pesado', 'Extra-pesado'],
  },
  {
    title: 'Tratores',
    description:
      'Tratores de alta performance para lavoura, pastagem e culturas diversificadas. Do pequeno ao grande produtor.',
    image: trator,
    icon: Tractor,
    tags: ['Agrícola', 'Compacto', '4x4', 'Alta potência'],
  },
  {
    title: 'Ônibus',
    description:
      'Ônibus urbanos, rodoviários e escolares. Renove sua frota e melhore a qualidade do transporte de passageiros.',
    image: onibus,
    icon: Bus,
    tags: ['Urbano', 'Rodoviário', 'Escolar', 'Executivo'],
  },
  {
    title: 'Máquinas Agrícolas',
    description:
      'Colheitadeiras, plantadeiras, pulverizadores e implementos. Tecnologia de ponta para maximizar sua produtividade.',
    image: maquina,
    icon: Wrench,
    tags: ['Colheitadeira', 'Plantadeira', 'Pulverizador', 'Implementos'],
  },
]

const agroBenefits = [
  'Aquisição de máquinas de última geração sem comprometer o fluxo de caixa',
  'Prazos de até 180 meses alinhados ao ciclo produtivo da sua propriedade',
  'Contemplação por lance para antecipar a compra nos períodos de maior necessidade',
  'Carta de crédito aceita pelas principais montadoras e revendas do Brasil',
  'Assessoria especializada em crédito rural e agronegócio',
  'Possibilidade de múltiplas cotas para renovação de toda a frota',
]

const benefits = [
  {
    icon: Percent,
    title: 'Sem Juros',
    description:
      'Diferente do financiamento tradicional, no consórcio você não paga juros. Apenas taxa de administração transparente e sem surpresas.',
  },
  {
    icon: Clock,
    title: 'Prazos Extensos',
    description:
      'Parcele em até 180 meses com prestações que cabem no orçamento do seu negócio, sem pressionar o fluxo de caixa.',
  },
  {
    icon: Users,
    title: 'PF e PJ',
    description:
      'Disponível para pessoa física e jurídica. Autônomos, microempreendedores, produtores rurais e grandes empresas.',
  },
  {
    icon: Tag,
    title: 'Diversas Marcas',
    description:
      'A carta de crédito é aceita nas principais marcas: Volvo, Scania, Mercedes-Benz, John Deere, Case, New Holland e mais.',
  },
  {
    icon: Award,
    title: 'Contemplação por Lance',
    description:
      'Ofereça um lance para antecipar sua contemplação e receber a carta de crédito antes do prazo estimado.',
  },
  {
    icon: Headphones,
    title: 'Suporte Especializado',
    description:
      'Consultores experientes no segmento de veículos pesados e agronegócio para orientar você em cada etapa.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Análise Personalizada',
    description:
      'Nosso consultor analisa o seu perfil, a quantidade de veículos desejados e o melhor prazo para o seu negócio.',
  },
  {
    number: '02',
    title: 'Adesão ao Grupo',
    description:
      'Você assina o contrato e passa a integrar um grupo de consorciados com perfil semelhante ao seu.',
  },
  {
    number: '03',
    title: 'Sorteios e Lances',
    description:
      'Mensalmente ocorrem sorteios. Você também pode ofertar um lance para acelerar a contemplação.',
  },
  {
    number: '04',
    title: 'Uso da Carta de Crédito',
    description:
      'Contemplado, você recebe a carta de crédito e escolhe o veículo ou a máquina que melhor atende à sua operação.',
  },
]

const faqs = [
  {
    question: 'Qual é o valor mínimo de carta de crédito para veículos pesados?',
    answer:
      'As cartas de crédito para veículos pesados iniciam a partir de R$ 80.000, podendo chegar a valores acima de R$ 1.000.000 para frotas completas ou maquinário agrícola de alto padrão. Nossa equipe realiza uma análise personalizada conforme a sua necessidade.',
  },
  {
    question: 'Produtor rural pessoa física pode participar?',
    answer:
      'Sim. Produtores rurais pessoas físicas são bem-vindos. Você pode utilizar a carta de crédito para adquirir tratores, colheitadeiras, pulverizadores e outros implementos agrícolas. Basta apresentar a documentação de atividade rural no momento da contemplação.',
  },
  {
    question: 'Posso comprar veículo usado com a carta de crédito de pesados?',
    answer:
      'Sim, desde que o veículo tenha no máximo 5 anos de fabricação (regra geral, podendo variar conforme a administradora). O bem precisa ser avaliado e aprovado antes da liberação da carta.',
  },
  {
    question: 'Como funciona a contemplação por lance em grupos de pesados?',
    answer:
      'A cada assembleia mensal, os consorciados podem ofertar lances — um percentual da carta de crédito que é descontado das parcelas restantes. O maior lance vence a contemplação daquele mês. Também ocorre um sorteio por meio da Loteria Federal para garantir igualdade de oportunidades entre todos os participantes.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#1C1C2E]/10 last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-[#1C1C2E] font-medium text-sm sm:text-base leading-snug group-hover:text-[#C9A05A] transition-colors">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-8 h-8 rounded-full border border-[#1C1C2E]/15 flex items-center justify-center text-[#1C1C2E]/50 group-hover:border-[#C9A05A]/40 group-hover:text-[#C9A05A] transition-colors"
        >
          <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[#1C1C2E]/60 text-sm font-light leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function PesadosPage() {
  const whatsappUrl =
    'https://wa.me/556131421052?text=Ol%C3%A1%2C%20vim%20do%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20cons%C3%B3rcio%20de%20ve%C3%ADculos%20pesados'

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
      offset: 60,
    })
  }, [])

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={img8}
            alt="Frota de caminhões e agronegócio"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1119]/80 via-[#0F1119]/70 to-[#0F1119]/90" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#C9A05A]/15 border border-[#C9A05A]/30 rounded-full px-4 py-2 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A05A] animate-pulse" />
            <span className="text-[#C9A05A] text-xs font-medium tracking-widest uppercase">
              Até 180 meses
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight mb-6"
          >
            Consórcio de
            <br />
            <span className="text-[#C9A05A]">Veículos Pesados</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/60 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Renove sua frota ou expanda o agronegócio sem pagar juros. Caminhões,
            tratores, ônibus e máquinas agrícolas com prazos de até 180 meses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <AnimatedButton
              variant="primary"
              size="lg"
              onClick={() => window.open(whatsappUrl, '_blank')}
            >
              Falar com especialista
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              size="lg"
              onClick={() =>
                document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Conheça as categorias
            </AnimatedButton>
          </motion.div>
        </div>

      </section>

      <section className="bg-[#FAF9F6] py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#C9A05A]/10 mb-4 group-hover:bg-[#C9A05A]/20 transition-colors">
                  <stat.icon className="w-5 h-5 text-[#C9A05A]" strokeWidth={1.5} />
                </div>
                <p className="text-[#1C1C2E] font-semibold text-lg sm:text-xl leading-tight">
                  {stat.value}
                </p>
                <p className="text-[#1C1C2E]/50 text-xs font-light mt-1 tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="categorias" className="py-20 sm:py-28 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16" data-aos="fade-up">
            <span className="text-[#C9A05A] text-xs font-medium tracking-widest uppercase block mb-3">
              Categorias
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1C1C2E] leading-tight">
              O veículo certo para
              <br />
              <span className="text-[#C9A05A]">cada operação</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles.map((v, i) => (
              <motion.div
                key={v.title}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="group rounded-3xl overflow-hidden bg-white border border-[#1C1C2E]/5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={v.image}
                    alt={v.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1119]/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-9 h-9 rounded-xl bg-[#C9A05A]/90 flex items-center justify-center">
                      <v.icon className="w-4 h-4 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-[#1C1C2E] font-semibold text-lg mb-2">{v.title}</h3>
                  <p className="text-[#1C1C2E]/55 text-sm font-light leading-relaxed mb-4">
                    {v.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {v.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-[#FAF9F6] border border-[#1C1C2E]/8 rounded-full text-[#1C1C2E]/60 text-xs font-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={fazenda}
            alt="Fazenda e agronegócio"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1119]/95 via-[#0F1119]/80 to-[#0F1119]/30" />
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/20 via-transparent to-transparent" />
        </div>

        <div
          className="absolute left-0 top-0 h-full w-[55%] lg:w-[50%] pointer-events-none"
          style={{ backdropFilter: 'blur(2px)' }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-xl lg:max-w-2xl" data-aos="fade-right">
            <span className="text-[#C9A05A] text-xs font-medium tracking-widest uppercase block mb-4">
              Agronegócio
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6">
              Impulsione seu{' '}
              <span className="font-medium text-[#E8C97A]">Agronegócio</span>
            </h2>
            <p className="text-white/60 font-light leading-relaxed mb-8 max-w-lg text-lg">
              O consórcio é a ferramenta ideal para o produtor rural que quer expandir
              a capacidade produtiva sem comprometer o capital de giro. Planeje com
              antecedência e adquira o maquinário necessário no momento certo da safra.
            </p>
            <ul className="space-y-3 mb-10">
              {agroBenefits.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-4 h-4 text-[#C9A05A] flex-shrink-0 mt-1"
                    strokeWidth={1.5}
                  />
                  <span className="text-white/65 text-sm font-light leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <AnimatedButton
              variant="primary"
              size="lg"
              onClick={() => window.open(whatsappUrl, '_blank')}
            >
              Falar com especialista
            </AnimatedButton>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
            <span className="text-[#C9A05A] text-xs font-medium tracking-widest uppercase block mb-3">
              Vantagens
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1C1C2E] leading-tight">
              Por que escolher o consórcio?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                className="group p-8 rounded-3xl bg-white border border-[#1C1C2E]/5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#C9A05A]/10 flex items-center justify-center mb-5 group-hover:bg-[#C9A05A]/20 transition-colors">
                  <b.icon className="w-5 h-5 text-[#C9A05A]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[#1C1C2E] font-semibold text-base mb-3">{b.title}</h3>
                <p className="text-[#1C1C2E]/55 text-sm font-light leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-[#0F1119]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
            <span className="text-[#C9A05A] text-xs font-medium tracking-widest uppercase block mb-3">
              Passo a passo
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight">
              Como funciona o consórcio
              <br />
              de veículos pesados?
            </h2>
          </div>

          <div className="relative">
            <div
              className="hidden lg:block absolute h-px bg-white/10 z-0"
              style={{ top: '2.5rem', left: 'calc(12.5%)', right: 'calc(12.5%)' }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className="flex flex-col items-center text-center relative z-10"
                >
                  <div className="w-16 h-16 rounded-full border border-[#C9A05A]/25 bg-[#0F1119] flex items-center justify-center mb-6">
                    <span className="text-[#C9A05A] font-light text-xl">{step.number}</span>
                  </div>
                  <h3 className="text-white font-medium text-lg mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm font-light leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4" data-aos="fade-right">
              <span className="text-[#C9A05A] text-xs font-medium tracking-widest uppercase block mb-3">
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-[#1C1C2E] leading-tight mb-6">
                Perguntas frequentes sobre pesados
              </h2>
              <p className="text-[#1C1C2E]/55 text-sm font-light leading-relaxed mb-8">
                Não encontrou sua dúvida? Nossa equipe está pronta para te atender.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#C9A05A] text-sm font-medium hover:underline underline-offset-4"
              >
                Fale com um consultor →
              </a>
            </div>

            <div className="lg:col-span-8" data-aos="fade-left">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-[#C9A05A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div data-aos="fade-up">
            <span className="text-white/70 text-xs font-medium tracking-widest uppercase block mb-4">
              Pronto para começar?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight mb-6">
              Renove sua frota sem pagar juros
            </h2>
            <p className="text-white/75 font-light max-w-xl mx-auto mb-10 leading-relaxed">
              Fale com um consultor especializado em veículos pesados e agronegócio.
              Faremos uma análise gratuita e personalizada para o seu negócio.
            </p>
            <AnimatedButton
              variant="primary"
              size="lg"
              onClick={() => window.open(whatsappUrl, '_blank')}
            >
              Quero uma análise gratuita
            </AnimatedButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
