'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Shield, Eye, Handshake, Lightbulb, ChevronRight, Award } from 'lucide-react'
import { AnimatedButton } from '@/components/ui/animated-button'

const values = [
  {
    icon: Shield,
    title: 'Segurança',
    description:
      'Operamos sob rigorosa regulamentação do Banco Central do Brasil, garantindo total proteção ao seu patrimônio e investimento em todas as etapas do consórcio.',
  },
  {
    icon: Eye,
    title: 'Transparência',
    description:
      'Nenhuma taxa oculta, nenhuma surpresa. Você tem acesso completo a todas as informações do seu consórcio, extratos e assembleias em tempo real.',
  },
  {
    icon: Handshake,
    title: 'Compromisso',
    description:
      'Atuamos com responsabilidade em cada etapa do consórcio, com orientação técnica e acompanhamento contínuo para decisões conscientes.',
  },
  {
    icon: Lightbulb,
    title: 'Inovação',
    description:
      'Combinamos solidez e tecnologia de ponta para oferecer uma experiência moderna, digital e desburocratizada.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Gestão Rigorosa',
    description:
      'Administramos os consórcios com total conformidade regulatória, garantindo que cada contribuição é aplicada corretamente e os direitos dos consorciados são protegidos.',
  },
  {
    number: '02',
    title: 'Transparência Total',
    description:
      'Você tem acesso completo a extratos, atas de assembleia, contemplações e movimentações. Nenhuma informação oculta.',
  },
  {
    number: '03',
    title: 'Assembleias Mensais',
    description:
      'Realizamos assembleias mensais onde ocorrem as contemplações por sorteio e lance, com total equidade e documentação clara para todos os participantes.',
  },
  {
    number: '04',
    title: 'Suporte Contínuo',
    description:
      'Nossa equipe orienta consorciados em dúvidas, acompanha suas participações e viabiliza o uso da carta de crédito com agilidade quando contemplado.',
  },
]

export default function SobrePage() {
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

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&auto=format&fit=crop&q=80"
          alt="Equipe Eixo Consórcios"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0F1119]/65" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p
            data-aos="fade-down"
            className="text-[#C9A05A] text-sm tracking-[0.25em] uppercase font-light mb-5"
          >
            Nossa história
          </p>
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white leading-tight mb-6"
          >
            Sobre a{' '}
            <span className="text-[#C9A05A]">Eixo Consórcios</span>
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            Gestão de consórcios com transparência, segurança
            e compromisso em cada etapa.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <p className="text-[#C9A05A] text-xs tracking-[0.3em] uppercase font-light mb-4">
              Quem somos
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-[#1C1C2E] leading-tight mb-8">
              Transformamos{' '}
              <em className="not-italic text-[#C9A05A]">sonhos</em> em
              realidade
            </h2>
            <p className="text-[#6B6B80] font-light leading-relaxed mb-6 text-lg">
              A Eixo Consórcios nasceu em Brasília-DF com uma missão clara: democratizar
              o acesso ao planejamento financeiro por consórcio. Em um mercado repleto de promessas vazias,
              escolhemos construir nossa reputação sobre um único alicerce — a confiança.
            </p>
            <p className="text-[#6B6B80] font-light leading-relaxed mb-6 text-lg">
              Atendemos famílias e empreendedores em diferentes objetivos, como moradia,
              mobilidade, expansão de negócios, viagens e outros projetos de médio e longo prazo.
            </p>
            <p className="text-[#6B6B80] font-light leading-relaxed text-lg">
              Somos uma administradora autorizada pelo{' '}
              <strong className="font-normal text-[#1C1C2E]">
                Banco Central do Brasil
              </strong>
              , operando com total conformidade regulatória e o mais alto padrão de
              governança do setor.
            </p>

            <Link
              href="/contato"
              className="inline-flex items-center gap-2 mt-10 text-[#C9A05A] font-light text-sm tracking-widest uppercase border-b border-[#C9A05A]/40 pb-1 hover:border-[#C9A05A] transition-all duration-300 group"
            >
              Fale com nosso time
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          <div data-aos="fade-left" data-aos-delay="150" className="relative">
            <div
              className="relative"
              style={{
                clipPath: 'polygon(40px 0%, 100% 0%, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0% 100%, 0% 40px)',
              }}
            >
              <div
                className="absolute inset-0 bg-[#C9A05A]/30"
                style={{ margin: '-2px' }}
              />
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop"
                alt="Equipe Eixo Consórcios"
                className="w-full h-[420px] object-cover object-center relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#1C1C2E]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <p className="text-[#C9A05A] text-xs tracking-[0.3em] uppercase font-light mb-4">
              Nossos valores
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-tight">
              O que nos guia
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div
                key={value.title}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="bg-[#F5F2EC] rounded-2xl p-8 flex flex-col gap-5 group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#C9A05A]/15 flex items-center justify-center">
                  <value.icon size={22} className="text-[#C9A05A]" />
                </div>
                <h3 className="text-[#1C1C2E] font-light text-lg">{value.title}</h3>
                <p className="text-[#1C1C2E]/80 font-light text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 px-6 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center opacity-10"
        />
        <div className="absolute inset-0 bg-[#FAF9F6]/90" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <p className="text-[#C9A05A] text-xs tracking-[0.3em] uppercase font-light mb-4">
              Nosso processo
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-[#1C1C2E] leading-tight">
              Como trabalhamos
            </h2>
            <p className="text-[#6B6B80] font-light mt-4 max-w-xl mx-auto text-lg">
              Da primeira conversa à contemplação, você conta com suporte especializado em cada etapa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {steps.map((step, i) => (
              <div
                key={step.number}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="relative group h-full"
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(100%-0px)] w-full h-px bg-gradient-to-r from-[#C9A05A]/40 to-transparent z-0" />
                )}

                <div className="relative z-10 border rounded-2xl p-7 transition-all duration-300 bg-white border-[#D6C9A8]/40 group-hover:bg-[#1C1C2E] group-hover:border-[#C9A05A]/40 group-hover:shadow-xl h-full flex flex-col">
                  <span className="text-4xl font-extralight block mb-5 text-[#D6C9A8] group-hover:text-[#C9A05A] transition-colors duration-300">
                    {step.number}
                  </span>
                  <h3 className="font-light text-lg mb-3 text-[#1C1C2E] group-hover:text-white transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="font-light text-sm leading-relaxed text-[#6B6B80] group-hover:text-white/60 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white border-t border-[#D6C9A8]/30">
        <div className="max-w-5xl mx-auto" data-aos="fade-up">
          <div className="text-center mb-12">
            <p className="text-[#C9A05A] text-xs tracking-[0.3em] uppercase font-light mb-4">
              Regulamentação
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-[#1C1C2E] mb-6 leading-snug">
              Autorizada pelo<br />Banco Central do Brasil
            </h2>
          </div>
          <p className="text-[#6B6B80] font-light leading-relaxed text-xl max-w-5xl mx-auto text-justify">
            A Eixo Consórcios atua na comercialização de cotas de consórcio, em conformidade com a Lei nº 11.795/2008 e demais normas aplicáveis.
          </p>
          <p className="text-[#6B6B80] font-light leading-relaxed text-xl max-w-5xl mx-auto mt-6 text-justify">
            A administração, gestão dos grupos e fiscalização operacional são realizadas pela Alfa Administradora de Consórcios Ltda., empresa devidamente autorizada e fiscalizada pelo Banco Central do Brasil (BACEN).
          </p>
          <p className="text-[#6B6B80] font-light leading-relaxed text-xl max-w-5xl mx-auto mt-6 text-justify">
            A Eixo Consórcios exerce a atividade de representação comercial, atuando na intermediação e comercialização das cotas, sempre em conformidade com as diretrizes da administradora responsável.
          </p>
          <p className="text-[#6B6B80] font-light leading-relaxed text-xl max-w-5xl mx-auto mt-6 text-justify">
            A EIXO não comercializa cotas com data certa para contemplação ou cotas contempladas.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
            {['BACEN Autorizada', 'ABAC Associada', 'ISO 9001', 'LGPD Conforme'].map((badge, i) => (
              <div
                key={badge}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                className="flex items-center gap-2 border border-[#D6C9A8]/50 rounded-full px-5 py-2.5 text-sm text-[#6B6B80] font-light"
              >
                <Award size={14} className="text-[#C9A05A]" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#C9A05A]">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            data-aos="fade-up"
            className="text-3xl sm:text-4xl md:text-5xl font-extralight text-[#1C1C2E] leading-tight mb-6"
          >
            Quer entender melhor como funciona o consórcio?
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-[#1C1C2E]/70 font-light text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Converse com nossa equipe e receba orientação clara sobre
            regras, etapas e boas práticas para participar com segurança.
          </p>
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <AnimatedButton
              variant="primary"
              size="lg"
              onClick={() => router.push('/contato')}
            >
              Falar com a equipe
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              size="lg"
              onClick={() => router.push('/')}
            >
              Entender como funciona
            </AnimatedButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
