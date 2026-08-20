'use client'

import { useEffect, useState } from 'react'
import AOS from 'aos'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArrowLeft, ChevronRight } from 'lucide-react'

const sections = [
  { id: 'informacoes-gerais', title: '1. Informações Gerais' },
  { id: 'dados-coletados', title: '2. Dados Coletados' },
  { id: 'uso-dos-dados', title: '3. Como Usamos os Dados' },
  { id: 'compartilhamento', title: '4. Compartilhamento de Dados' },
  { id: 'seguranca', title: '5. Segurança dos Dados' },
  { id: 'cookies', title: '6. Cookies' },
  { id: 'seus-direitos', title: '7. Seus Direitos (LGPD)' },
  { id: 'retencao', title: '8. Retenção de Dados' },
  { id: 'dpo', title: '9. Contato do DPO' },
  { id: 'alteracoes', title: '10. Alterações desta Política' },
]

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-xl sm:text-2xl font-medium text-[#1C1C2E] mb-4 scroll-mt-32 pt-2"
    >
      {children}
    </h2>
  )
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#1C1C2E]/65 font-light text-base leading-relaxed mb-4">
      {children}
    </p>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mb-4 ml-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[#1C1C2E]/65 font-light text-base leading-relaxed">
          <ChevronRight className="w-4 h-4 text-[#C9A05A] flex-shrink-0 mt-0.5" strokeWidth={2} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Divider() {
  return <div className="my-10 h-px bg-gradient-to-r from-transparent via-[#D6C9A8]/60 to-transparent" />
}

export default function PrivacidadePage() {
  const [activeSection, setActiveSection] = useState<string>('informacoes-gerais')

  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic', offset: 50 })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-30% 0px -65% 0px' }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleSectionClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <Navbar />

      <section className="pt-40 pb-16 bg-[#FAF9F6] border-b border-[#D6C9A8]/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#1C1C2E]/50 text-sm font-light hover:text-[#C9A05A] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>

          <div data-aos="fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C9A05A]/30 bg-[#C9A05A]/8 mb-6">
              <span className="text-[#C9A05A] text-xs font-medium tracking-widest uppercase">
                Documento Legal
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#1C1C2E] tracking-tight mb-4">
              Política de Privacidade
            </h1>
            <p className="text-[#1C1C2E]/50 font-light">
              Última atualização:{' '}
              <time dateTime="2025-01-15">15 de janeiro de 2025</time>
            </p>
            <p className="mt-4 max-w-2xl text-[#1C1C2E]/55 font-light leading-relaxed">
              A Eixo respeita e protege a privacidade dos seus
              clientes e visitantes. Este documento explica de forma clara e
              transparente como coletamos, usamos e protegemos seus dados
              pessoais, em conformidade com a{' '}
              <strong className="font-medium text-[#1C1C2E]/80">
                Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)
              </strong>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-16 items-start">

            <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-28">
              <div className="bg-white border border-[#D6C9A8]/40 rounded-2xl p-6">
                <p className="text-[#1C1C2E] text-xs font-semibold tracking-widest uppercase mb-5">
                  Índice
                </p>
                <nav className="space-y-1">
                  {sections.map(({ id, title }) => (
                    <button
                      key={id}
                      onClick={() => handleSectionClick(id)}
                      className={`w-full text-left text-sm font-light px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                        activeSection === id
                          ? 'bg-[#C9A05A]/10 text-[#C9A05A] font-medium'
                          : 'text-[#1C1C2E]/55 hover:text-[#1C1C2E] hover:bg-[#FAF9F6]'
                      }`}
                    >
                      {title}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="mt-4 bg-[#1C1C2E] rounded-2xl p-5">
                <p className="text-white/50 text-xs font-light mb-1">
                  Dúvidas sobre privacidade?
                </p>
                <p className="text-white font-medium text-sm mb-3">
                  Fale com nosso DPO
                </p>
                <a
                  href="mailto:atendimento@eixoconsorcios.com.br"
                  className="text-[#C9A05A] text-xs font-light break-all hover:underline"
                >
                  atendimento@eixoconsorcios.com.br
                </a>
              </div>
            </aside>

            <div className="flex-1 max-w-4xl" data-aos="fade-up">
              <div className="lg:hidden mb-8 bg-white border border-[#D6C9A8]/40 rounded-2xl p-5">
                <p className="text-[#1C1C2E] text-xs font-semibold tracking-widest uppercase mb-4">
                  Índice
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {sections.map(({ id, title }) => (
                    <button
                      key={id}
                      onClick={() => handleSectionClick(id)}
                      className="text-left text-sm text-[#1C1C2E]/60 font-light px-2 py-1.5 rounded-lg hover:text-[#C9A05A] transition-colors cursor-pointer"
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </div>

              <SectionTitle id="informacoes-gerais">
                1. Informações Gerais
              </SectionTitle>
              <Paragraph>
                A presente Política de Privacidade é fornecida pela{' '}
                <strong className="font-medium text-[#1C1C2E]/80">
                  Eixo
                </strong>
                , empresa devidamente constituída sob as leis da República
                Federativa do Brasil, inscrita no CNPJ sob o número{' '}
                <strong className="font-medium text-[#1C1C2E]/80">
                  41.704.227/0001-03
                </strong>
                , com sede em Brasília, Distrito Federal, e que atua como
                administradora de consórcios, em conformidade com a regulamentação
                do Banco Central do Brasil (BACEN).
              </Paragraph>
              <Paragraph>
                Esta política se aplica a todos os visitantes do site{' '}
                <strong className="font-medium text-[#1C1C2E]/80">
                  eixoconsorcios.com.br
                </strong>{' '}
                e da plataforma digital, bem como a clientes ativos e ex-clientes
                que tenham compartilhado dados com a Eixo em qualquer
                momento. Ao acessar nossos serviços, você confirma que leu,
                entendeu e concorda com os termos desta política.
              </Paragraph>
              <Paragraph>
                Caso não concorde com qualquer disposição aqui prevista,
                solicitamos que cesse imediatamente o uso dos nossos serviços e
                entre em contato com nosso encarregado de dados (DPO) para
                esclarecimentos.
              </Paragraph>

              <Divider />

              <SectionTitle id="dados-coletados">
                2. Dados Coletados
              </SectionTitle>
              <Paragraph>
                Para a prestação dos nossos serviços de consórcio com qualidade
                e segurança, coletamos as seguintes categorias de dados pessoais:
              </Paragraph>
              <p className="text-[#1C1C2E]/80 font-medium text-sm mb-2">
                Dados de identificação:
              </p>
              <BulletList
                items={[
                  'Nome completo',
                  'Número do CPF (Cadastro de Pessoas Físicas)',
                  'RG ou outro documento de identidade',
                  'Data de nascimento',
                  'Nacionalidade e estado civil',
                ]}
              />
              <p className="text-[#1C1C2E]/80 font-medium text-sm mb-2 mt-4">
                Dados de contato:
              </p>
              <BulletList
                items={[
                  'Endereço de e-mail',
                  'Número de telefone celular e/ou fixo',
                  'Endereço residencial completo (logradouro, número, complemento, CEP, cidade, estado)',
                ]}
              />
              <p className="text-[#1C1C2E]/80 font-medium text-sm mb-2 mt-4">
                Dados financeiros:
              </p>
              <BulletList
                items={[
                  'Renda mensal declarada',
                  'Dados bancários para débito das parcelas (quando aplicável)',
                  'Histórico de pagamentos no âmbito do consórcio',
                  'Informações de crédito para análise de capacidade financeira',
                  'Valor da carta de crédito contratada e histórico de lances',
                ]}
              />
              <p className="text-[#1C1C2E]/80 font-medium text-sm mb-2 mt-4">
                Dados de uso e navegação:
              </p>
              <BulletList
                items={[
                  'Endereço IP e localização aproximada',
                  'Tipo de dispositivo, navegador e sistema operacional',
                  'Páginas visitadas, tempo de acesso e interações na plataforma',
                  'Dados de cookies e tecnologias similares (ver seção 6)',
                ]}
              />

              <Divider />

              <SectionTitle id="uso-dos-dados">
                3. Como Usamos os Dados
              </SectionTitle>
              <Paragraph>
                Utilizamos os dados pessoais coletados com base nas seguintes
                finalidades e fundamentos legais previstos na LGPD:
              </Paragraph>
              <BulletList
                items={[
                  'Prestação de serviços de consórcio: cadastro, manutenção e encerramento de cotas, realização de assembleias, processamento de lances e liberação de cartas de crédito.',
                  'Comunicação e atendimento: envio de notificações sobre boletos, assembleias, contemplações, comunicados regulatórios e respostas às solicitações dos titulares.',
                  'Cumprimento de obrigações legais e regulatórias: reportes ao Banco Central do Brasil, órgãos de fiscalização, autoridades judiciais e administrativas, conforme exigido pela legislação vigente.',
                  'Prevenção à fraude e segurança: verificação de identidade, análise de risco de crédito e prevenção a atividades ilícitas.',
                  'Melhoria dos serviços: análise de dados agregados e anonimizados para aprimorar a plataforma, identificar falhas e desenvolver novos produtos.',
                  'Marketing e comunicações comerciais: envio de ofertas, novidades e informações relevantes sobre consórcios, mediante consentimento expresso do titular.',
                ]}
              />
              <Paragraph>
                Nunca utilizaremos seus dados para finalidades incompatíveis com
                aquelas declaradas nesta política sem comunicação prévia e, quando
                necessário, novo consentimento.
              </Paragraph>

              <Divider />

              <SectionTitle id="compartilhamento">
                4. Compartilhamento de Dados
              </SectionTitle>
              <Paragraph>
                A Eixo não vende, aluga ou cede seus dados pessoais a
                terceiros para fins comerciais. O compartilhamento ocorre apenas
                nas situações abaixo, sempre com adoção de medidas de segurança
                adequadas:
              </Paragraph>
              <BulletList
                items={[
                  'Administradoras de consórcio autorizadas pelo Banco Central do Brasil (BACEN), parceiras da Eixo para gestão dos grupos.',
                  'Prestadores de serviços contratados para operar em nosso nome (ex.: processamento de pagamentos, hospedagem de dados, envio de comunicações), vinculados por cláusulas contratuais de confidencialidade e proteção de dados.',
                  'Autoridades públicas, judiciais ou regulatórias, quando exigido por lei, ordem judicial ou regulamentação do Banco Central do Brasil.',
                  'Parceiros de análise de crédito (bureaus de crédito), mediante consentimento e nos limites necessários para a análise de capacidade financeira.',
                  'Eventual adquirente ou sucessor em caso de fusão, aquisição ou reestruturação societária, garantido o aviso prévio ao titular.',
                ]}
              />
              <Paragraph>
                Todos os terceiros que recebem dados pessoais da Eixo
                são contratualmente obrigados a manter a confidencialidade e a
                utilizar os dados exclusivamente para as finalidades autorizadas,
                em conformidade com a LGPD.
              </Paragraph>

              <Divider />

              <SectionTitle id="seguranca">
                5. Segurança dos Dados
              </SectionTitle>
              <Paragraph>
                Adotamos medidas técnicas e organizacionais adequadas para
                proteger seus dados pessoais contra acesso não autorizado,
                alteração, divulgação ou destruição, incluindo:
              </Paragraph>
              <BulletList
                items={[
                  'Criptografia de dados em trânsito com protocolo TLS 1.3 e em repouso com AES-256.',
                  'Autenticação em dois fatores (2FA) para acesso à plataforma e sistemas internos.',
                  'Controle de acesso baseado em função (RBAC), garantindo que apenas colaboradores autorizados acessem dados sensíveis.',
                  'Monitoramento contínuo de atividades suspeitas e sistema de detecção de intrusões (IDS).',
                  'Backups automáticos e plano de recuperação de desastres (DRP).',
                  'Testes periódicos de penetração (pentests) conduzidos por empresas especializadas.',
                  'Programa interno de conscientização e treinamento sobre proteção de dados para todos os colaboradores.',
                ]}
              />
              <Paragraph>
                Em caso de incidente de segurança que possa afetar seus dados
                pessoais, notificaremos a Autoridade Nacional de Proteção de
                Dados (ANPD) e os titulares afetados no prazo legal estabelecido
                pela LGPD.
              </Paragraph>

              <Divider />

              <SectionTitle id="cookies">6. Cookies</SectionTitle>
              <Paragraph>
                Nosso site utiliza cookies e tecnologias de rastreamento similares
                para melhorar sua experiência de navegação. Os cookies são pequenos
                arquivos de texto armazenados no seu dispositivo pelo navegador.
              </Paragraph>
              <p className="text-[#1C1C2E]/80 font-medium text-sm mb-2">
                Tipos de cookies que utilizamos:
              </p>
              <BulletList
                items={[
                  'Cookies estritamente necessários: essenciais para o funcionamento do site e da plataforma. Não podem ser desativados sem comprometer a funcionalidade dos serviços.',
                  'Cookies de desempenho e análise: coletam informações sobre como os visitantes usam o site (páginas acessadas, tempo de visita). Utilizamos ferramentas como Google Analytics com anonimização de IP.',
                  'Cookies de funcionalidade: lembram suas preferências (idioma, configurações) para personalizar sua experiência.',
                  'Cookies de marketing: utilizados para apresentar conteúdos e anúncios relevantes com base no seu perfil de navegação. Requerem consentimento explícito.',
                ]}
              />
              <Paragraph>
                Você pode gerenciar, desativar ou excluir cookies a qualquer
                momento pelas configurações do seu navegador. A desativação de
                cookies essenciais pode impactar o funcionamento de determinadas
                funcionalidades do site e da plataforma.
              </Paragraph>

              <Divider />

              <SectionTitle id="seus-direitos">
                7. Seus Direitos (LGPD)
              </SectionTitle>
              <Paragraph>
                A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) garante aos
                titulares de dados pessoais um conjunto de direitos que a Eixo
                se compromete a respeitar integralmente:
              </Paragraph>
              <BulletList
                items={[
                  'Direito de confirmação e acesso: confirmar a existência de tratamento e acessar uma cópia dos seus dados pessoais que processamos.',
                  'Direito de correção: solicitar a correção de dados incompletos, inexatos ou desatualizados.',
                  'Direito de anonimização, bloqueio ou eliminação: nos casos em que os dados sejam desnecessários, excessivos ou tratados em desconformidade com a LGPD.',
                  'Direito de portabilidade: receber seus dados em formato estruturado e interoperável, para transferência a outro fornecedor de serviço.',
                  'Direito de eliminação: solicitar a exclusão dos dados tratados com base no seu consentimento.',
                  'Direito de informação: obter informações sobre entidades públicas ou privadas com as quais compartilhamos seus dados.',
                  'Direito de revogação do consentimento: retirar o consentimento a qualquer momento, sem prejuízo da licitude do tratamento realizado anteriormente.',
                  'Direito de não sujeição a decisões automatizadas: solicitar revisão humana de decisões tomadas exclusivamente com base em tratamento automatizado de dados.',
                  'Direito de petição: apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).',
                ]}
              />
              <Paragraph>
                Para exercer qualquer um destes direitos, entre em contato com
                nosso DPO pelo e-mail{' '}
                <a
                  href="mailto:atendimento@eixoconsorcios.com.br"
                  className="text-[#C9A05A] hover:underline"
                >
                  atendimento@eixoconsorcios.com.br
                </a>
                . Responderemos em até 15 (quinze) dias úteis, conforme exigido
                pela legislação.
              </Paragraph>

              <Divider />

              <SectionTitle id="retencao">
                8. Retenção de Dados
              </SectionTitle>
              <Paragraph>
                Conservamos seus dados pessoais pelo tempo estritamente necessário
                para as finalidades descritas nesta política ou conforme exigido
                pela legislação aplicável:
              </Paragraph>
              <BulletList
                items={[
                  'Dados contratuais do consórcio: mantidos por no mínimo 10 (dez) anos após o encerramento do grupo, em atendimento às normas do Banco Central do Brasil e da legislação tributária.',
                  'Dados de análise de crédito: retidos por até 5 (cinco) anos, conforme regulamentação do sistema financeiro nacional.',
                  'Dados de comunicação e atendimento: conservados por até 5 (cinco) anos para fins de comprovação e resolução de disputas.',
                  'Dados de navegação e cookies: retidos por até 24 (vinte e quatro) meses, salvo configuração diferente pelo usuário.',
                  'Dados tratados com base exclusivamente em consentimento: eliminados imediatamente após a revogação do consentimento, salvo quando houver outra base legal que justifique a manutenção.',
                ]}
              />
              <Paragraph>
                Após o prazo de retenção aplicável, os dados serão eliminados de
                forma segura ou anonimizados, de modo que não seja mais possível
                identificar o titular.
              </Paragraph>

              <Divider />

              <SectionTitle id="dpo">
                9. Contato do DPO (Encarregado de Dados)
              </SectionTitle>
              <Paragraph>
                Em cumprimento ao art. 41 da LGPD, a Eixo designou um
                Encarregado pelo Tratamento de Dados Pessoais (Data Protection
                Officer — DPO), responsável por atuar como canal de comunicação
                entre a empresa, os titulares de dados e a Autoridade Nacional de
                Proteção de Dados (ANPD).
              </Paragraph>
              <div className="bg-white border border-[#D6C9A8]/50 rounded-2xl p-6 mb-6">
                <p className="text-[#1C1C2E] font-medium mb-4">
                  Dados do Encarregado (DPO)
                </p>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="text-[#1C1C2E]/50 font-light text-sm w-32 flex-shrink-0">
                      Empresa:
                    </span>
                    <span className="text-[#1C1C2E]/80 font-light text-sm">
                      Eixo
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#1C1C2E]/50 font-light text-sm w-32 flex-shrink-0">
                      CNPJ:
                    </span>
                    <span className="text-[#1C1C2E]/80 font-light text-sm">
                      41.704.227/0001-03
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#1C1C2E]/50 font-light text-sm w-32 flex-shrink-0">
                      E-mail do DPO:
                    </span>
                    <a
                      href="mailto:atendimento@eixoconsorcios.com.br"
                      className="text-[#C9A05A] font-light text-sm hover:underline break-all"
                    >
                      atendimento@eixoconsorcios.com.br
                    </a>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#1C1C2E]/50 font-light text-sm w-32 flex-shrink-0">
                      Endereço:
                    </span>
                    <span className="text-[#1C1C2E]/80 font-light text-sm">
                      Brasília — Distrito Federal, Brasil
                    </span>
                  </div>
                </div>
              </div>
              <Paragraph>
                O DPO analisará todas as solicitações relacionadas à proteção de
                dados e responderá em até 15 (quinze) dias úteis. Para demandas
                mais complexas, o prazo poderá ser prorrogado mediante comunicação
                ao solicitante.
              </Paragraph>

              <Divider />

              <SectionTitle id="alteracoes">
                10. Alterações desta Política
              </SectionTitle>
              <Paragraph>
                A Eixo reserva-se o direito de atualizar esta Política
                de Privacidade periodicamente, em virtude de mudanças na
                legislação, em nossas práticas de tratamento de dados ou em
                decorrência de novas funcionalidades da plataforma.
              </Paragraph>
              <Paragraph>
                Quando realizarmos alterações relevantes, adotaremos as seguintes
                medidas de comunicação:
              </Paragraph>
              <BulletList
                items={[
                  'Publicação da versão atualizada nesta página, com indicação da data da última revisão.',
                  'Notificação por e-mail aos clientes cadastrados, com antecedência mínima de 30 (trinta) dias antes da entrada em vigor das novas condições.',
                  'Exibição de aviso em destaque no site e na plataforma digital durante o período de transição.',
                ]}
              />
              <Paragraph>
                A continuidade do uso dos nossos serviços após a entrada em vigor
                das alterações será interpretada como concordância com a nova
                versão da política. Caso não concorde com as alterações, você tem
                o direito de encerrar o uso dos nossos serviços e solicitar a
                eliminação dos seus dados, nos termos da LGPD.
              </Paragraph>
              <Paragraph>
                Recomendamos a leitura periódica desta política para mantê-lo
                sempre informado sobre como protegemos seus dados. Dúvidas ou
                sugestões sobre esta Política de Privacidade podem ser
                encaminhadas a qualquer momento para{' '}
                <a
                  href="mailto:atendimento@eixoconsorcios.com.br"
                  className="text-[#C9A05A] hover:underline"
                >
                  atendimento@eixoconsorcios.com.br
                </a>
                .
              </Paragraph>

              <div className="mt-10 p-5 rounded-2xl bg-[#1C1C2E]/3 border border-[#D6C9A8]/40">
                <p className="text-[#1C1C2E]/50 text-sm font-light leading-relaxed">
                  Este documento foi elaborado em conformidade com a{' '}
                  <strong className="font-medium">Lei nº 13.709/2018</strong>{' '}
                  (Lei Geral de Proteção de Dados — LGPD), com a{' '}
                  <strong className="font-medium">
                    Resolução BACEN nº 4.893/2021
                  </strong>{' '}
                  e demais normas aplicáveis ao setor de consórcios. A versão
                  vigente desta política é a publicada nesta página.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
