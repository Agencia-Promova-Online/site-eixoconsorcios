'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Activity,
  Calculator,
  ShieldCheck,
  Award,
  HeadphonesIcon,
  ClipboardList,
  UserPlus,
  SlidersHorizontal,
  LayoutDashboard,
  CheckCircle2,
  ArrowRight,
  Zap,
  Lock,
  TrendingUp,
} from 'lucide-react'
import { AnimatedButton } from '@/components/ui/animated-button'
import iphoneMockup from '@/assets/eixo-iphone.png'

const features = [
  {
    icon: Activity,
    title: 'Acompanhe em Tempo Real',
    description:
      'Visualize o status do seu consórcio, extratos, assembleias e lances em tempo real, de qualquer dispositivo.',
  },
  {
    icon: Calculator,
    title: 'Consulta Instantânea',
    description:
      'Consulte faixas de contribuição, prazos e créditos em segundos para apoiar seu planejamento com mais clareza.',
  },
  {
    icon: ShieldCheck,
    title: '100% Seguro',
    description:
      'Ambiente criptografado com certificação SSL, autenticação em dois fatores e monitoramento contínuo.',
  },
  {
    icon: Award,
    title: 'Contemplação Online',
    description:
      'Receba sua carta de crédito e gerencie toda a documentação de contemplação diretamente pela plataforma.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Suporte 24h',
    description:
      'Nossa equipe está disponível 24 horas por dia, 7 dias por semana para tirar todas as suas dúvidas.',
  },
  {
    icon: ClipboardList,
    title: 'Histórico Completo',
    description:
      'Acesse o histórico de todas as suas transações, boletos, lances e assembleias em um só lugar.',
  },
]

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Crie sua conta',
    description:
      'Cadastre-se gratuitamente em menos de 2 minutos. Basta seu CPF, e-mail e uma senha segura para começar.',
  },
  {
    number: '02',
    icon: SlidersHorizontal,
    title: 'Configure seu planejamento',
    description:
      'Defina parâmetros como prazo e crédito para visualizar cenários e entender melhor as etapas do consórcio.',
  },
  {
    number: '03',
    icon: LayoutDashboard,
    title: 'Acompanhe tudo',
    description:
      'Com o contrato ativo, gerencie tudo pelo seu painel: assembleias, lances, extratos e documentos.',
  },
]

const benefits = [
  {
    icon: Zap,
    title: 'Velocidade e praticidade',
    description:
      'Assine documentos digitalmente, gere 2ª via de boleto e acesse seu extrato sem precisar ligar ou ir a uma agência.',
  },
  {
    icon: Lock,
    title: 'Privacidade total',
    description:
      'Seus dados são tratados conforme a LGPD, com total transparência sobre o uso e armazenamento das informações.',
  },
  {
    icon: TrendingUp,
    title: 'Controle financeiro',
    description:
      'Planeje seu lance com antecedência usando as projeções da plataforma e maximize suas chances de contemplação.',
  },
  {
    icon: CheckCircle2,
    title: 'Conformidade regulatória',
    description:
      'Plataforma auditada e em total conformidade com as normas do Banco Central do Brasil para administradoras de consórcio.',
  },
]

export default function PlataformaPage() {
  const whatsappUrl =
    'https://wa.me/556131421052?text=Ol%C3%A1%2C%20vim%20do%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20plataforma%20digital'

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

      <section className="relative bg-[#0F1119] pt-40 pb-28 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#C9A05A]/8 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#C9A05A]/5 blur-[100px]" />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,160,90,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,160,90,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            data-aos="fade-down"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A05A]/30 bg-[#C9A05A]/10 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A05A] animate-pulse" />
            <span className="text-[#C9A05A] text-xs font-medium tracking-widest uppercase">
              Plataforma Digital
            </span>
          </div>

          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-4xl sm:text-5xl lg:text-7xl font-light text-white leading-[1.1] tracking-tight mb-6"
          >
            Nossa Plataforma
            <br />
            <span className="text-[#C9A05A]">Digital</span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="max-w-2xl mx-auto text-white/50 text-lg sm:text-xl font-light leading-relaxed mb-10"
          >
            Controle o seu consórcio com total autonomia — de qualquer lugar, a
            qualquer hora. Tecnologia que coloca o poder nas suas mãos.
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <AnimatedButton
              variant="primary"
              size="lg"
              onClick={() => window.open(whatsappUrl, '_blank')}
            >
              Começar agora
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              size="lg"
              onClick={() =>
                document
                  .getElementById('como-funciona')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Como funciona
            </AnimatedButton>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <p className="text-[#C9A05A] text-xs font-medium tracking-widest uppercase mb-4">
              Funcionalidades
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1C2E] tracking-tight">
              Tudo que você precisa,{' '}
              <span className="text-[#C9A05A]">em um lugar só</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                  className="group relative bg-white border border-[#D6C9A8]/40 rounded-3xl p-8 hover:border-[#C9A05A]/40 hover:shadow-xl hover:shadow-[#C9A05A]/5 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF9F6] border border-[#D6C9A8]/60 flex items-center justify-center mb-6 group-hover:bg-[#C9A05A]/10 group-hover:border-[#C9A05A]/30 transition-all">
                    <Icon
                      className="w-5 h-5 text-[#1C1C2E]/50 group-hover:text-[#C9A05A] transition-colors"
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3 className="text-[#1C1C2E] font-medium text-lg mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#1C1C2E]/55 text-sm font-light leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#C9A05A]/0 to-transparent group-hover:via-[#C9A05A]/40 transition-all duration-500" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="py-24 bg-[#1C1C2E]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <p className="text-[#C9A05A] text-xs font-medium tracking-widest uppercase mb-4">
              Passo a passo
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
              Como funciona
            </h2>
            <p className="mt-4 text-white/40 font-light max-w-lg mx-auto">
              Em três etapas simples você já está dentro da nossa plataforma,
              gerenciando seu consórcio com total controle.
            </p>
          </div>

          <div className="relative">
            <div
              className="hidden md:block absolute h-px bg-white/10 z-0"
              style={{ top: '3rem', left: 'calc(16.6%)', right: 'calc(16.6%)' }}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.number}
                    data-aos="fade-up"
                    data-aos-delay={index * 150}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="relative mb-6">
                      <div className="w-24 h-24 rounded-full border border-[#C9A05A]/25 bg-[#0F1119] flex items-center justify-center">
                        <Icon className="w-8 h-8 text-[#C9A05A]" strokeWidth={1.25} />
                      </div>
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#C9A05A] flex items-center justify-center text-[#0F1119] text-xs font-semibold">
                        {step.number.replace('0', '')}
                      </span>
                    </div>

                    <h3 className="text-white font-medium text-xl mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/45 text-sm font-light leading-relaxed max-w-xs">
                      {step.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#FAF9F6] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div data-aos="fade-right">
              <p className="text-[#C9A05A] text-xs font-medium tracking-widest uppercase mb-4">
                Dashboard
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#1C1C2E] tracking-tight leading-tight mb-8">
                DASHBOARD
              </h2>
              <div className="space-y-6 text-[#1C1C2E]/60 font-light text-lg leading-relaxed">
                <p>
                  Gerencie suas cotas, acompanhe assembleias ao vivo e faça ofertas
                  cada vez mais estratégicas. Nossa plataforma foi desenhada para
                  dar a você total autonomia sobre seu investimento.
                </p>
                <p>
                  Acesse extratos detalhados, gere boletos e acompanhe o histórico
                  de lances do seu grupo em tempo real. Toda a burocracia do
                  consórcio resolvida em poucos cliques, com a segurança que você
                  precisa.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    'Acompanhamento de assembleias em tempo real',
                    'Oferta de lances e consultas avançadas',
                    'Extratos e documentos sempre disponíveis',
                    'Notificações instantâneas sobre sua cota',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-base">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A05A]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              data-aos="fade-left"
              data-aos-delay="150"
              className="relative flex flex-col items-center"
            >
              <div className="relative w-full max-w-[420px] aspect-[9/18.5]">
                <Image
                  src={iphoneMockup}
                  alt="Plataforma Eixo no celular"
                  className="w-full h-auto object-contain z-10 relative"
                  priority
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[90%] rounded-full bg-[#C9A05A]/15 blur-[100px] -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <p className="text-[#C9A05A] text-xs font-medium tracking-widest uppercase mb-4">
                Vantagens
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1C2E] tracking-tight leading-tight mb-6">
                Por que nossa
                <br />
                <span className="text-[#C9A05A]">plataforma?</span>
              </h2>
              <p className="text-[#1C1C2E]/55 font-light leading-relaxed mb-8">
                Desenvolvemos cada funcionalidade pensando na sua experiência.
                Menos burocracia, mais controle e total transparência em cada
                etapa do seu consórcio.
              </p>
              <AnimatedButton
                variant="primary"
                size="lg"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                Fale com um especialista
              </AnimatedButton>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div
                    key={benefit.title}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="group p-6 rounded-2xl border border-[#D6C9A8]/40 bg-[#FAF9F6] hover:border-[#C9A05A]/40 hover:bg-white transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#C9A05A]/10 flex items-center justify-center mb-4 group-hover:bg-[#C9A05A]/20 transition-colors">
                      <Icon
                        className="w-4.5 h-4.5 text-[#C9A05A]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="text-[#1C1C2E] font-medium text-sm mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-[#1C1C2E]/50 text-sm font-light leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0F1119] relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C9A05A]/6 blur-[100px]" />
        </div>

        <div
          className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center"
          data-aos="fade-up"
        >
          <p className="text-[#C9A05A] text-xs font-medium tracking-widest uppercase mb-4">
            Comece hoje
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-light text-white tracking-tight mb-6">
            Pronto para dar
            <br />o próximo passo?
          </h2>
          <p className="max-w-xl mx-auto text-white/45 font-light mb-10">
            Fale com um de nossos especialistas e descubra como a Eixo
            Consórcios pode ajudar você a conquistar seus objetivos.
          </p>
          <AnimatedButton
            variant="primary"
            size="lg"
            onClick={() => window.open(whatsappUrl, '_blank')}
          >
            Entrar em contato
          </AnimatedButton>
        </div>
      </section>

      <Footer />
    </main>
  )
}
