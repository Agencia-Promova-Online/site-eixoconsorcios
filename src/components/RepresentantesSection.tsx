'use client'

import { FormEvent, useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

type CredenciamentoForm = {
  nome: string
  email: string
  telefone: string
  cpf: string
  cnpj: string
  cidade: string
  pais: string
  jaAtua: string
  segmento: string
  faturamento: string
  leadsPorDia: string
}

const initialForm: CredenciamentoForm = {
  nome: '',
  email: '',
  telefone: '',
  cpf: '',
  cnpj: '',
  cidade: '',
  pais: '',
  jaAtua: '',
  segmento: '',
  faturamento: '',
  leadsPorDia: '',
}

const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, '').slice(0, 11)
  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim()
  }
  return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim()
}

export default function RepresentantesSection() {
  const [formData, setFormData] = useState<CredenciamentoForm>(initialForm)
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmitCredenciamento = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormStatus('loading')

    try {
      await addDoc(collection(db, 'credenciamento_representantes'), {
        ...formData,
        status: 'sem_contato',
        origem: 'site',
        createdAt: serverTimestamp(),
      })

      setFormStatus('success')
      setFormData(initialForm)
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <section className="bg-[#121417] py-20 sm:py-24" id="credenciamento">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div data-aos="fade-up">
            <p className="text-[#C9A05A] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
              Credenciamento de Representantes
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-white leading-tight mb-5">
              Estrutura para representantes que querem crescimento previsível
            </h2>
            <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed mb-6">
              A Eixo é administradora e oferece uma plataforma com suporte estratégico,
              marketing e operação profissional para representantes que já atuam no mercado.
            </p>
            <ul className="space-y-3 text-white/65 text-sm sm:text-base font-light">
              <li>Tráfego pago e campanhas com foco em leads qualificados.</li>
              <li>Ferramentas profissionais para operação comercial e acompanhamento.</li>
              <li>Suporte estratégico para escalar com consistência.</li>
            </ul>
          </div>

          <div data-aos="fade-up" data-aos-delay="100" className="bg-white rounded-2xl p-6 sm:p-8">
            <h3 className="text-[#1C1C2E] text-2xl font-medium mb-2">Solicitar credenciamento</h3>
            <p className="text-[#1C1C2E]/65 text-sm mb-6">
              Preencha seus dados para avaliação do perfil.
            </p>

            <form onSubmit={handleSubmitCredenciamento} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" name="nome" placeholder="Nome completo *" value={formData.nome} onChange={(e) => setFormData((prev) => ({ ...prev, nome: e.target.value }))} required className="sm:col-span-2 h-11 px-4 rounded-lg border border-[#D8D8E2] text-sm text-[#1C1C2E] placeholder:text-[#1C1C2E]/45 focus:outline-none focus:ring-2 focus:ring-[#C9A05A]/35" />
              <input type="email" name="email" placeholder="E-mail *" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} required className="h-11 px-4 rounded-lg border border-[#D8D8E2] text-sm text-[#1C1C2E] placeholder:text-[#1C1C2E]/45 focus:outline-none focus:ring-2 focus:ring-[#C9A05A]/35" />
              <input type="tel" name="telefone" placeholder="Telefone *" value={formData.telefone} onChange={(e) => setFormData((prev) => ({ ...prev, telefone: formatPhone(e.target.value) }))} maxLength={15} required className="h-11 px-4 rounded-lg border border-[#D8D8E2] text-sm text-[#1C1C2E] placeholder:text-[#1C1C2E]/45 focus:outline-none focus:ring-2 focus:ring-[#C9A05A]/35" />
              <input type="text" name="cpf" placeholder="CPF *" value={formData.cpf} onChange={(e) => setFormData((prev) => ({ ...prev, cpf: e.target.value }))} required className="h-11 px-4 rounded-lg border border-[#D8D8E2] text-sm text-[#1C1C2E] placeholder:text-[#1C1C2E]/45 focus:outline-none focus:ring-2 focus:ring-[#C9A05A]/35" />
              <input type="text" name="cnpj" placeholder="CNPJ da Empresa *" value={formData.cnpj} onChange={(e) => setFormData((prev) => ({ ...prev, cnpj: e.target.value }))} required className="h-11 px-4 rounded-lg border border-[#D8D8E2] text-sm text-[#1C1C2E] placeholder:text-[#1C1C2E]/45 focus:outline-none focus:ring-2 focus:ring-[#C9A05A]/35" />
              <input type="text" name="cidade" placeholder="Cidade *" value={formData.cidade} onChange={(e) => setFormData((prev) => ({ ...prev, cidade: e.target.value }))} required className="h-11 px-4 rounded-lg border border-[#D8D8E2] text-sm text-[#1C1C2E] placeholder:text-[#1C1C2E]/45 focus:outline-none focus:ring-2 focus:ring-[#C9A05A]/35" />
              <input type="text" name="pais" placeholder="País *" value={formData.pais} onChange={(e) => setFormData((prev) => ({ ...prev, pais: e.target.value }))} required className="h-11 px-4 rounded-lg border border-[#D8D8E2] text-sm text-[#1C1C2E] placeholder:text-[#1C1C2E]/45 focus:outline-none focus:ring-2 focus:ring-[#C9A05A]/35" />

              <select name="ja_atua" value={formData.jaAtua} onChange={(e) => setFormData((prev) => ({ ...prev, jaAtua: e.target.value }))} required className="sm:col-span-2 h-11 px-4 rounded-lg border border-[#D8D8E2] text-sm text-[#1C1C2E] focus:outline-none focus:ring-2 focus:ring-[#C9A05A]/35">
                <option value="">Você já atua como representante de consórcio? *</option>
                <option>Sim</option>
                <option>Não</option>
              </select>

              <select name="segmento" value={formData.segmento} onChange={(e) => setFormData((prev) => ({ ...prev, segmento: e.target.value }))} required className="sm:col-span-2 h-11 px-4 rounded-lg border border-[#D8D8E2] text-sm text-[#1C1C2E] focus:outline-none focus:ring-2 focus:ring-[#C9A05A]/35">
                <option value="">Qual segmento você trabalha hoje? *</option>
                <option>Imóveis</option>
                <option>Automóveis</option>
                <option>Pesados</option>
                <option>Serviços</option>
                <option>Outro</option>
              </select>

              <select name="faturamento" value={formData.faturamento} onChange={(e) => setFormData((prev) => ({ ...prev, faturamento: e.target.value }))} required className="sm:col-span-2 h-11 px-4 rounded-lg border border-[#D8D8E2] text-sm text-[#1C1C2E] focus:outline-none focus:ring-2 focus:ring-[#C9A05A]/35">
                <option value="">Quanto você fatura hoje com consórcio? *</option>
                <option>Até R$ 500 mil/mês</option>
                <option>R$ 500 mil a R$ 1 milhão/mês</option>
                <option>R$ 1 milhão a R$ 2 milhões/mês</option>
                <option>R$ 2 milhões a R$ 4 milhões/mês</option>
                <option>R$ 2 milhões a R$ 4 milhões/mês</option>
                <option>Acima de R$ 4 milhões/mês</option>

              </select>


              <input type="number" min="0" name="leads_por_dia" placeholder="Quantos leads qualificados você deseja receber por dia? *" value={formData.leadsPorDia} onChange={(e) => setFormData((prev) => ({ ...prev, leadsPorDia: e.target.value }))} required className="sm:col-span-2 h-11 px-4 rounded-lg border border-[#D8D8E2] text-sm text-[#1C1C2E] placeholder:text-[#1C1C2E]/45 focus:outline-none focus:ring-2 focus:ring-[#C9A05A]/35" />

              {formStatus === 'success' ? (
                <p className="sm:col-span-2 text-sm text-green-700">
                  Formulário enviado com sucesso. Nossa equipe vai analisar seu perfil.
                </p>
              ) : null}
              {formStatus === 'error' ? (
                <p className="sm:col-span-2 text-sm text-red-600">
                  Não foi possível enviar agora. Tente novamente em instantes.
                </p>
              ) : null}

              <button type="submit" disabled={formStatus === 'loading'} className="sm:col-span-2 h-11 rounded-lg bg-[#1C1C2E] text-white text-sm font-medium hover:bg-[#11111b] transition-colors disabled:opacity-70">
                {formStatus === 'loading' ? 'Enviando...' : 'Enviar para avaliação'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 sm:mt-16" data-aos="fade-up">
          <p className="text-[#C9A05A] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Como Funciona
          </p>
          <h3 className="text-2xl sm:text-3xl font-light text-white leading-tight mb-3">
            Um processo simples e transparente para você começar a receber leads qualificados
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="rounded-xl border border-[#D6C9A8]/40 bg-[#F5F2EC] p-5">
              <span className="text-[#C9A05A] text-xl font-medium">01</span>
              <h4 className="text-[#1C1C2E] text-base font-medium mt-2 mb-2">Preenche o Formulário</h4>
              <p className="text-[#1C1C2E]/75 text-sm font-light leading-relaxed">
                Responda às perguntas de qualificação para entendermos seu perfil e objetivos como representante.
              </p>
            </div>

            <div className="rounded-xl border border-[#D6C9A8]/40 bg-[#F5F2EC] p-5">
              <span className="text-[#C9A05A] text-xl font-medium">02</span>
              <h4 className="text-[#1C1C2E] text-base font-medium mt-2 mb-2">Perfil Analisado</h4>
              <p className="text-[#1C1C2E]/75 text-sm font-light leading-relaxed">
                Nossa equipe analisa seu perfil para garantir o seu credenciamento como representante de consórcio.
              </p>
            </div>

            <div className="rounded-xl border border-[#D6C9A8]/40 bg-[#F5F2EC] p-5">
              <span className="text-[#C9A05A] text-xl font-medium">03</span>
              <h4 className="text-[#1C1C2E] text-base font-medium mt-2 mb-2">Pagamento Realizado</h4>
              <p className="text-[#1C1C2E]/75 text-sm font-light leading-relaxed">
                Após aprovação, você efetua o investimento e garante sua vaga na estrutura premium.
              </p>
            </div>

            <div className="rounded-xl border border-[#D6C9A8]/40 bg-[#F5F2EC] p-5">
              <span className="text-[#C9A05A] text-xl font-medium">04</span>
              <h4 className="text-[#1C1C2E] text-base font-medium mt-2 mb-2">Estrutura Ativada</h4>
              <p className="text-[#1C1C2E]/75 text-sm font-light leading-relaxed">
                Site, CRM, campanhas, criativos e treinamentos são implementados. Você começa a receber leads qualificados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
