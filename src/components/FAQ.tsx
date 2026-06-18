'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

const faqItems = [
  {
    question: 'O que é um consórcio e como funciona?',
    answer:
      'O consórcio é uma modalidade de compra coletiva em que um grupo de pessoas se reúne para poupar e adquirir bens ou serviços. Cada participante paga uma parcela mensal ao fundo comum, e mensalmente um ou mais integrantes são contemplados com a carta de crédito — seja por sorteio ou pela oferta de um lance. Ao ser contemplado, você usa o crédito para comprar o bem ou contratar o serviço desejado, continuando a pagar as parcelas normalmente até o encerramento do grupo.',
  },
  {
    question: 'Consórcio tem juros?',
    answer:
      'Não. Essa é uma das maiores vantagens do consórcio em relação ao financiamento tradicional. No consórcio você não paga juros — apenas a taxa de administração, diluída nas parcelas, e o fundo de reserva, que protege o grupo. Isso torna o consórcio até 30% mais barato do que o financiamento ao longo do prazo.',
  },
  {
    question: 'Preciso dar entrada para contratar um consórcio?',
    answer:
      'Não. O consórcio não exige entrada. O único valor antecipado é a primeira parcela no momento da adesão. Você começa a pagar mensalmente e concorre às contemplações desde a primeira assembleia.',
  },
  {
    question: 'Quanto tempo leva para ser contemplado?',
    answer:
      'A contemplação por sorteio pode ocorrer a qualquer momento, desde o primeiro até o último mês do plano — todos os participantes são contemplados dentro do prazo do grupo, sem exceção. Para antecipar a contemplação, você pode oferecer um lance com parte do seu crédito ou com recursos próprios. Nossa equipe analisa o histórico das assembleias e traça estratégias personalizadas para aumentar suas chances.',
  },
  {
    question: 'O que é um lance e como funciona?',
    answer:
      'O lance é uma oferta feita pelo consorciado para antecipar sua contemplação. Funciona como um leilão: quem oferece o maior percentual do crédito é contemplado naquela assembleia. O valor do lance pode vir do próprio saldo de parcelas já pagas (lance embutido) ou de recursos externos. Cada administradora tem regras específicas — nossa equipe orienta sobre a melhor estratégia para o seu caso.',
  },
  {
    question: 'O consórcio é seguro? Como é regulamentado?',
    answer:
      'Sim. O sistema de consórcios no Brasil é regulamentado e fiscalizado pelo Banco Central do Brasil (BACEN), assim como os bancos. As administradoras autorizadas devem seguir regras rígidas de transparência e gestão dos recursos. Trabalhamos exclusivamente com administradoras autorizadas pelo Banco Central, garantindo total segurança para o seu dinheiro.',
  },
  {
    question: 'O que acontece se eu atrasar ou não puder pagar uma parcela?',
    answer:
      'O atraso de parcelas suspende sua participação nas assembleias enquanto durar a inadimplência, mas não cancela o consórcio automaticamente. Ao regularizar a situação, você volta a concorrer normalmente. Em casos de desistência formal, o consorciado tem direito à devolução dos valores pagos, corrigidos, ao final do grupo ou em assembleia específica de exclusão.',
  },
  {
    question: 'Posso usar o FGTS no consórcio?',
    answer:
      'Sim, para consórcios de imóveis é possível utilizar o FGTS para dar um lance, amortizar o saldo devedor após a contemplação ou complementar a carta de crédito. As regras seguem as normas da Caixa Econômica Federal e se aplicam somente ao crédito imobiliário. Consulte nossos especialistas para verificar sua elegibilidade.',
  },
]

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-3">
      {faqItems.map((item, index) => (
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
              className={`w-5 h-5 text-[#C9A05A] flex-shrink-0 transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              strokeWidth={1.5}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
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

export default function FAQ() {
  return (
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
              Tudo que você precisa saber antes de começar o seu consórcio.
            </p>
          </div>

          <FAQAccordion />

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
  )
}
