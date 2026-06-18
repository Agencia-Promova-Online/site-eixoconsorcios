'use client'

import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plane,
  GraduationCap,
  Heart,
  PartyPopper,
  Sofa,
  Sun,
  ChevronDown,
  Clock,
  Percent,
  LayoutGrid,
  CreditCard,
  CheckCircle2,
  Headphones,
  Shield,
  Zap,
  Tag,
  Users,
  Star,
  TrendingUp,
} from 'lucide-react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AnimatedButton } from '@/components/ui/animated-button'
import img6 from '@/assets/imagens/img6.png'
import escola from '@/assets/servicos/escola.png'

const stats = [
  { label: 'Prazo máximo', value: 'Até 60 meses', icon: Clock },
  { label: 'Taxa de juros', value: '0% Juros', icon: Percent },
  { label: 'Categorias disponíveis', value: '+40 Categorias', icon: LayoutGrid },
  { label: 'Flexibilidade', value: 'Carta de Crédito Flexível', icon: CreditCard },
]

const services = [
  {
    title: 'Viagens',
    description:
      'Realize o sonho de conhecer o mundo. Use a carta de crédito para pacotes nacionais, internacionais, cruzeiros e experiências únicas.',
    image: img6,
    icon: Plane,
    examples: ['Pacotes internacionais', 'Cruzeiros', 'Lua de mel', 'Intercâmbio'],
    color: '#4F86C6',
  },
  {
    title: 'Educação',
    description:
      'Invista no seu futuro ou no dos seus filhos. Pós-graduação, MBA, cursos técnicos, idiomas e muito mais.',
    image: escola,
    icon: GraduationCap,
    examples: ['MBA e pós-graduação', 'Cursos de idiomas', 'Ensino técnico', 'Faculdade'],
    color: '#7C6FCD',
  },
  {
    title: 'Saúde e Estética',
    description:
      'Cuide do seu bem-estar com procedimentos estéticos, tratamentos odontológicos, cirurgias eletivas e mais.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop',
    icon: Heart,
    examples: ['Cirurgias estéticas', 'Tratamento dentário', 'Procedimentos eletivos', 'Bem-estar'],
    color: '#E87070',
  },
  {
    title: 'Eventos e Festas',
    description:
      'Celebre momentos especiais sem preocupação financeira. Casamentos, formaturas, festas de 15 anos e eventos corporativos.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&auto=format&fit=crop',
    icon: PartyPopper,
    examples: ['Casamentos', 'Formaturas', 'Festas de 15 anos', 'Eventos corporativos'],
    color: '#E8A44A',
  },
  {
    title: 'Móveis e Eletrônicos',
    description:
      'Decore ou renove seu espaço com móveis planejados, eletrodomésticos, tecnologia e eletrônicos de alta qualidade.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&auto=format&fit=crop',
    icon: Sofa,
    examples: ['Móveis planejados', 'Eletrodomésticos', 'Eletrônicos', 'Decoração'],
    color: '#5BB88A',
  },
  {
    title: 'Energia Solar',
    description:
      'Reduza sua conta de energia e valorize seu imóvel. Adquira um sistema fotovoltaico completo e economize por décadas.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&auto=format&fit=crop',
    icon: Sun,
    examples: ['Painel solar residencial', 'Sistema industrial', 'Monitoramento', 'Manutenção'],
    color: '#C9A05A',
  },
]

const howItWorks = [
  {
    icon: CreditCard,
    title: 'Carta de Crédito',
    description:
      'Ao ser contemplado, você recebe uma carta de crédito equivalente ao valor contratado, que pode ser utilizado em qualquer prestador do serviço escolhido no Brasil.',
  },
  {
    icon: LayoutGrid,
    title: 'Mais de 40 categorias',
    description:
      'A carta de crédito de serviços possui ampla abrangência. Desde uma viagem à Europa até um MBA, tudo pode ser financiado com uma única cota de consórcio.',
  },
  {
    icon: TrendingUp,
    title: 'Poder de negociação',
    description:
      'Com a carta de crédito em mãos, você negocia diretamente com o fornecedor como se estivesse pagando à vista — garantindo descontos e melhores condições.',
  },
  {
    icon: Shield,
    title: 'Segurança e transparência',
    description:
      'Todo o processo é regulamentado pelo Banco Central do Brasil. Você tem acesso completo às regras do grupo e ao extrato atualizado da sua cota.',
  },
]

const benefits = [
  {
    icon: Percent,
    title: 'Zero Juros',
    description:
      'Sem encargos de juros sobre o crédito contratado. Você paga apenas a taxa de administração, com total previsibilidade nas parcelas.',
  },
  {
    icon: Clock,
    title: 'Parcele em até 60 meses',
    description:
      'Divida o valor do serviço em até 60 parcelas mensais e planeje com antecedência a realização do seu sonho.',
  },
  {
    icon: Users,
    title: 'Para toda a família',
    description:
      'Qualquer pessoa física maior de 18 anos pode contratar. Ideal para casais, famílias e quem deseja se programar para grandes momentos.',
  },
  {
    icon: Star,
    title: 'Flexibilidade total',
    description:
      'Escolha o serviço no momento da contemplação. Não precisa decidir agora — você tem liberdade para escolher quando a carta estiver em mãos.',
  },
  {
    icon: Tag,
    title: 'Contemplação por Lance',
    description:
      'Quer antecipar? Ofereça um lance e concorra à contemplação antecipada. Quanto maior o lance, mais chances de ser contemplado antes.',
  },
  {
    icon: Headphones,
    title: 'Consultoria personalizada',
    description:
      'Nossa equipe orienta você a escolher a cota certa, no prazo adequado, para que o serviço desejado esteja dentro do orçamento.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Escolha o valor da carta',
    description:
      'Estime o custo do serviço que deseja realizar e escolha a carta de crédito mais adequada.',
  },
  {
    number: '02',
    title: 'Ingresse no grupo',
    description:
      'Após a assinatura do contrato, você passa a integrar um grupo de consorciados com objetivos semelhantes.',
  },
  {
    number: '03',
    title: 'Sorteios mensais e lances',
    description:
      'Mensalmente você concorre por sorteio ou pode ofertar um lance para ser contemplado antes.',
  },
  {
    number: '04',
    title: 'Realize seu serviço',
    description:
      'Com a carta de crédito em mãos, contrate o serviço desejado e viva a experiência que você planejou.',
  },
]

const faqs = [
  {
    question: 'Posso usar a carta de crédito em qualquer prestador de serviço?',
    answer:
      'Sim, desde que o prestador esteja devidamente registrado no CNPJ e o serviço seja compatível com a categoria contratada. A Eixo Consórcios orienta todo o processo de liberação da carta junto ao fornecedor escolhido por você.',
  },
  {
    question: 'Quanto tempo tenho para usar a carta de crédito após a contemplação?',
    answer:
      'Em geral, o prazo para utilização da carta é de 30 a 90 dias após a contemplação, a depender do regulamento do grupo. Durante esse período, nossa equipe auxilia na escolha do serviço e no processo de liberação dos recursos.',
  },
  {
    question: 'O consórcio de serviços tem limite mínimo de valor?',
    answer:
      'As cartas de crédito de serviços geralmente iniciam a partir de R$ 5.000, podendo chegar a valores acima de R$ 100.000 para serviços mais complexos como reformas, eventos de grande porte ou programas de saúde extensos. Solicite uma análise gratuita com nosso consultor.',
  },
  {
    question: 'Posso contratar mais de uma cota de serviços?',
    answer:
      'Sim. Você pode contratar quantas cotas desejar, inclusive para diferentes categorias de serviço. Muitos clientes utilizam uma cota para viagem e outra para educação, por exemplo, planejando múltiplos objetivos ao mesmo tempo.',
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

export default function ServicosPage() {
  const whatsappUrl =
    'https://wa.me/556131421052?text=Ol%C3%A1%2C%20vim%20do%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20cons%C3%B3rcio%20de%20servi%C3%A7os'

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
            src={img6}
            alt="Consórcio de Serviços — Eixo Consórcios"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0F1119]/70" />
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
              Até 60 meses
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
            <span className="text-[#C9A05A]">Serviços</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/60 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Realize experiências e conquistas além de bens materiais. Viagens, educação,
            saúde, eventos e muito mais — planejados sem juros e com total flexibilidade.
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
              Falar com consultor
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              size="lg"
              onClick={() =>
                document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Ver categorias
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
                <p className="text-[#1C1C2E] font-semibold text-base sm:text-lg leading-tight">
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
              O que você pode realizar
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1C1C2E] leading-tight">
              Mais de 40 categorias
              <br />
              <span className="text-[#C9A05A]">à sua escolha</span>
            </h2>
            <p className="text-[#1C1C2E]/55 font-light mt-4 leading-relaxed max-w-lg">
              O consórcio de serviços permite que você planeje e realize desde uma viagem
              dos sonhos até a instalação de energia solar na sua casa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <div
                key={svc.title}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                className="group relative rounded-3xl overflow-hidden aspect-[4/3]"
              >
                {typeof svc.image === 'string' ? (
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1119]/80 via-transparent to-transparent" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1119] via-[#0F1119]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 mb-3">
                    <p className="text-white/80 text-xs font-light leading-relaxed mb-3">
                      {svc.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {svc.examples.map((ex) => (
                        <span
                          key={ex}
                          className="px-2 py-0.5 bg-white/15 text-white/80 text-xs font-light rounded-full"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-white font-medium text-lg">{svc.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-[#1C1C2E]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5" data-aos="fade-right">
              <span className="text-[#C9A05A] text-xs font-medium tracking-widest uppercase block mb-3">
                Como funciona
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#FAF9F6] leading-tight mb-6">
                Planeje hoje,
                <br />
                <span className="text-[#C9A05A]">realize amanhã</span>
              </h2>
              <p className="text-white/60 font-light leading-relaxed mb-8">
                No consórcio de serviços, você contribui mensalmente com um grupo
                de pessoas que têm objetivos semelhantes. A cada assembleia, um ou
                mais integrantes são contemplados por sorteio ou lance. Ao ser
                contemplado, você recebe a carta de crédito e contrata o serviço
                desejado diretamente com o prestador de sua escolha — sem burocracia.
              </p>
              <AnimatedButton
                variant="primary"
                size="lg"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                Tire suas dúvidas
              </AnimatedButton>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5" data-aos="fade-left">
              {howItWorks.map((item, i) => (
                <div
                  key={item.title}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C9A05A]/10 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-[#C9A05A]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[#FAF9F6] font-semibold text-sm mb-2">{item.title}</h3>
                  <p className="text-white/50 text-xs font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
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
              Inteligência financeira
              <br />
              <span className="text-[#C9A05A]">para seus sonhos</span>
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
              Da primeira parcela
              <br />à realização do serviço
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
                Perguntas frequentes sobre serviços
              </h2>
              <p className="text-[#1C1C2E]/55 text-sm font-light leading-relaxed mb-8">
                Ainda tem dúvidas? Nossa equipe de consultores está disponível para
                te ajudar a escolher o melhor plano.
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
              Comece agora
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight mb-6">
              A experiência dos seus sonhos
              <br />começa com um plano
            </h2>
            <p className="text-white/75 font-light max-w-xl mx-auto mb-10 leading-relaxed">
              Fale com um consultor da Eixo Consórcios e descubra como planejar
              a sua próxima grande conquista sem comprometer suas finanças.
            </p>
            <AnimatedButton
              variant="primary"
              size="lg"
              onClick={() => window.open(whatsappUrl, '_blank')}
            >
              Quero planejar meu serviço
            </AnimatedButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
