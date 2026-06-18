'use client'

import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { MapPin, Phone, Mail, Clock, ChevronDown, ChevronUp } from 'lucide-react'

const contactCards = [
  {
    icon: MapPin,
    title: 'Localização',
    lines: ['SCS Quadra 2, Bloco C', 'Brasília-DF, 70316-900'],
  },
  {
    icon: Phone,
    title: 'Telefone',
    lines: ['(61) 3142-1052', 'WhatsApp disponível'],
  },
  {
    icon: Mail,
    title: 'E-mail',
    lines: ['atendimento@eixoconsorcios.com.br', 'Resposta em até 24h úteis'],
  },
]

const hours = [
  { day: 'Segunda a sexta', time: '08:30 às 18:00', open: true },
  { day: 'Sábado', time: '08:30 às 12:00', open: true },
]

const faqs = [
  {
    question: 'Como funciona o consórcio?',
    answer:
      'O consórcio é uma modalidade de compra coletiva em que um grupo de pessoas se reúne para poupar e adquirir bens ou serviços. Cada participante paga uma parcela mensal ao fundo comum, e mensalmente um ou mais integrantes são contemplados com a carta de crédito — seja por sorteio ou pela oferta de um lance. Ao ser contemplado, você usa o crédito para comprar o bem ou contratar o serviço de sua escolha, continuando a pagar as parcelas normalmente até o encerramento do grupo.',
  },
  {
    question: 'Quanto tempo leva para ser contemplado?',
    answer:
      'O prazo de contemplação por sorteio é variável, podendo ocorrer desde o primeiro mês até o último mês do plano — todos os participantes são contemplados dentro do prazo do grupo, sem exceção. Para antecipar a contemplação, você pode oferecer um lance com parte do seu crédito ou com recursos próprios. Nossa equipe analisa o histórico das assembleias e traça estratégias personalizadas para aumentar suas chances.',
  },
  {
    question: 'Preciso de entrada para contratar?',
    answer:
      'Não. Essa é uma das grandes vantagens do consórcio: não há entrada, não há juros e não há IOF. Você paga apenas a taxa de administração, que é diluída nas parcelas, e o fundo de reserva, que protege o grupo. Isso torna o consórcio até 30% mais barato do que o financiamento tradicional ao longo do tempo. O único valor antecipado é a primeira parcela no momento da adesão.',
  },
]

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string
  answer: string
  index: number
}) {
  const [open, setOpen] = useState(false)

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      className="border border-[#D6C9A8]/40 rounded-2xl overflow-hidden bg-white transition-shadow duration-300 hover:shadow-md"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left group"
        aria-expanded={open}
      >
        <span className="text-[#1C1C2E] font-light text-base sm:text-lg group-hover:text-[#C9A05A] transition-colors duration-200">
          {question}
        </span>
        <span className="shrink-0 text-[#C9A05A]">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <p className="px-7 pb-7 text-[#6B6B80] font-light leading-relaxed text-sm sm:text-base border-t border-[#D6C9A8]/30 pt-5">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function ContatoPage() {
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

      <section className="bg-[#0F1119] pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#C9A05A]/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-24 w-72 h-72 rounded-full bg-[#C9A05A]/5 blur-2xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#C9A05A 1px, transparent 1px), linear-gradient(90deg, #C9A05A 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p
            data-aos="fade-down"
            className="text-[#C9A05A] text-xs tracking-[0.3em] uppercase font-light mb-5"
          >
            Estamos aqui para você
          </p>
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white leading-tight mb-6"
          >
            Fale{' '}
            <span className="text-[#C9A05A]">Conosco</span>
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-white/55 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            Nossos consultores estão prontos para apresentar o plano de consórcio
            ideal para o seu perfil — sem pressão, sem letras miúdas.
          </p>
        </div>
      </section>

      <section className="bg-[#0F1119] px-6 pb-16 relative z-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 pt-0">
          {contactCards.map((card, i) => (
            <div
              key={card.title}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="bg-white rounded-2xl shadow-lg border border-[#D6C9A8]/20 p-7 flex flex-col gap-4 hover:-translate-y-0.5 transition-transform duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#C9A05A]/10 flex items-center justify-center">
                <card.icon size={20} className="text-[#C9A05A]" />
              </div>
              <div>
                <p className="text-[#1C1C2E] font-light text-base mb-1.5">{card.title}</p>
                {card.lines.map((line) => (
                  <p key={line} className="text-[#6B6B80] text-sm font-light leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContactForm />

      <section className="py-20 px-6 bg-[#F5F2EC]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <p className="text-[#C9A05A] text-xs tracking-[0.3em] uppercase font-light mb-4">
              Atendimento
            </p>
            <h2 className="text-3xl sm:text-4xl font-extralight text-[#1C1C2E]">
              Horário de funcionamento
            </h2>
          </div>

          <div className="max-w-md mx-auto divide-y divide-[#D6C9A8]/40 bg-white rounded-2xl shadow-sm border border-[#D6C9A8]/20 overflow-hidden">
            {hours.map((h, i) => (
              <div
                key={h.day}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                className="flex items-center justify-between px-7 py-5"
              >
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-[#C9A05A]" />
                  <span className="text-[#1C1C2E] font-light text-sm">{h.day}</span>
                </div>
                <span
                  className={`text-sm font-light px-3 py-1 rounded-full ${h.open
                      ? 'text-[#C9A05A] bg-[#C9A05A]/10'
                      : 'text-[#6B6B80] bg-[#6B6B80]/10'
                    }`}
                >
                  {h.time}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="py-24 px-6 bg-[#FAF9F6]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14" data-aos="fade-up">
            <p className="text-[#C9A05A] text-xs tracking-[0.3em] uppercase font-light mb-4">
              Dúvidas frequentes
            </p>
            <h2 className="text-3xl sm:text-4xl font-extralight text-[#1C1C2E] leading-tight">
              Perguntas mais comuns
            </h2>
            <p className="text-[#6B6B80] font-light mt-4 text-base leading-relaxed">
              Não encontrou o que procura? Nossos consultores respondem em até 24 horas úteis.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
