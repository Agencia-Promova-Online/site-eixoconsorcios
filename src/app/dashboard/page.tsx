'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import {
  IconArrowLeft,
  IconBook,
  IconBrandTabler,
  IconMail,
  IconPhone,
  IconUserBolt,
} from '@tabler/icons-react'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar'
import BlogManager from '@/components/dashboard/BlogManager'
import { auth, db } from '@/lib/firebase'
import { cn } from '@/lib/utils'

type LeadStatus = 'sem_contato' | 'em_andamento' | 'concluido'
type LeadView = 'credenciamento' | 'contatos'
type DashboardView = LeadView | 'blog'

type Lead = {
  id: string
  source: LeadView
  nome: string
  email: string
  telefone: string
  status: LeadStatus
  cidade?: string
  pais?: string
  cpf?: string
  jaAtua?: string
  segmento?: string
  faturamento?: string
  leadsPorDia?: string
  mensagem?: string
  consorcio?: string
}

const statusOptions: { value: LeadStatus; label: string }[] = [
  { value: 'sem_contato', label: 'Sem contato' },
  { value: 'em_andamento', label: 'Em andamento' },
  { value: 'concluido', label: 'Concluído' },
]

const statusColors: Record<LeadStatus, string> = {
  sem_contato: 'bg-[#F8E7D2] text-[#8A5A1C]',
  em_andamento: 'bg-[#DDE8FF] text-[#244FA3]',
  concluido: 'bg-[#DDF5E5] text-[#1E7A3D]',
}

const cleanPhone = (phone: string) => phone.replace(/\D/g, '')

export default function DashboardPage() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [accessError, setAccessError] = useState('')
  const [activeView, setActiveView] = useState<DashboardView>('credenciamento')
  const [statusFilter, setStatusFilter] = useState<'todos' | LeadStatus>('todos')
  const [credenciamentoLeads, setCredenciamentoLeads] = useState<Lead[]>([])
  const [contatoLeads, setContatoLeads] = useState<Lead[]>([])
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const loadLeads = useCallback(async () => {
    const credenciamentoRef = query(collection(db, 'credenciamento_representantes'), orderBy('createdAt', 'desc'))
    const contatosRef = query(collection(db, 'contatos_site'), orderBy('createdAt', 'desc'))

    const [credenciamentoSnap, contatosSnap] = await Promise.all([
      getDocs(credenciamentoRef),
      getDocs(contatosRef),
    ])

    const credParsed: Lead[] = credenciamentoSnap.docs.map((item) => ({
      id: item.id,
      source: 'credenciamento',
      nome: item.data().nome || '-',
      email: item.data().email || '-',
      telefone: item.data().telefone || '-',
      status: (item.data().status as LeadStatus) || 'sem_contato',
      cidade: item.data().cidade || '-',
      pais: item.data().pais || '-',
      cpf: item.data().cpf || '-',
      jaAtua: item.data().jaAtua || '-',
      segmento: item.data().segmento || '-',
      faturamento: item.data().faturamento || '-',
      leadsPorDia: item.data().leadsPorDia || '-',
    }))

    const contatosParsed: Lead[] = contatosSnap.docs.map((item) => ({
      id: item.id,
      source: 'contatos',
      nome: item.data().name || '-',
      email: item.data().email || '-',
      telefone: item.data().phone || '-',
      status: (item.data().status as LeadStatus) || 'sem_contato',
      mensagem: item.data().message || '-',
      consorcio: item.data().consorcio || '-',
    }))

    setCredenciamentoLeads(credParsed)
    setContatoLeads(contatosParsed)

    if (selectedLead) {
      const sourceList = selectedLead.source === 'credenciamento' ? credParsed : contatosParsed
      const updated = sourceList.find((lead) => lead.id === selectedLead.id)
      setSelectedLead(updated || null)
    }
  }, [selectedLead])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace('/login')
        return
      }

      try {
        setAccessError('')
        const userRef = doc(db, 'users', user.uid)
        const userSnap = await getDoc(userRef)
        const isAdmin = userSnap.data()?.admin === true

        if (!isAdmin) {
          setAuthorized(false)
          setLoading(false)
          return
        }

        await loadLeads()
        setAuthorized(true)
      } catch (error: unknown) {
        console.error('Erro ao validar acesso ao dashboard:', error)
        setAuthorized(false)
        setAccessError('Nao foi possivel validar seu acesso ao dashboard. Confira o documento users/{uid} e as permissoes do Firestore.')
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router, loadLeads])

  const leadsByView = useMemo(() => {
    const list = activeView === 'credenciamento' ? credenciamentoLeads : contatoLeads
    if (statusFilter === 'todos') return list
    return list.filter((lead) => lead.status === statusFilter)
  }, [activeView, statusFilter, credenciamentoLeads, contatoLeads])

  const handleUpdateStatus = async (lead: Lead, status: LeadStatus) => {
    const collectionName = lead.source === 'credenciamento' ? 'credenciamento_representantes' : 'contatos_site'
    await updateDoc(doc(db, collectionName, lead.id), { status, updatedAt: serverTimestamp() })
    await loadLeads()
  }

  if (loading) {
    return <main className="min-h-screen bg-[#F1F2F6] flex items-center justify-center">Carregando dashboard...</main>
  }

  if (!authorized) {
    return (
      <main className="min-h-screen bg-[#F1F2F6] flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <h1 className="text-2xl font-semibold text-[#1C1C2E] mb-3">Acesso negado</h1>
          <p className="text-[#1C1C2E]/70">Seu usuário não possui permissão de administrador para acessar o dashboard.</p>
          {accessError ? <p className="mt-3 text-sm text-red-600">{accessError}</p> : null}
        </div>
      </main>
    )
  }

  const sidebarLinks = [
    {
      label: 'Representantes',
      href: '#',
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700" />,
      onClick: () => {
        setActiveView('credenciamento')
        setSelectedLead(null)
      },
      active: activeView === 'credenciamento',
    },
    {
      label: 'Contatos do site',
      href: '#',
      icon: <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700" />,
      onClick: () => {
        setActiveView('contatos')
        setSelectedLead(null)
      },
      active: activeView === 'contatos',
    },
    {
      label: 'Blogs',
      href: '#',
      icon: <IconBook className="h-5 w-5 shrink-0 text-neutral-700" />,
      onClick: () => {
        setActiveView('blog')
        setSelectedLead(null)
      },
      active: activeView === 'blog',
    },
    {
      label: 'Sair',
      href: '#',
      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700" />,
      onClick: async () => {
        await signOut(auth)
        router.replace('/login')
      },
      active: false,
    },
  ]

  return (
    <main className="min-h-screen bg-[#ECEFF3]">
      <div
        className={cn(
          'flex w-full min-h-screen flex-1 flex-col overflow-hidden border border-neutral-200 bg-gray-100 md:flex-row'
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10 bg-[#F7F8FA]">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              <Link href="/" className="flex items-center gap-2 py-1 text-sm font-medium text-[#1C1C2E]">
                <span className="whitespace-pre">Eixo Dashboard</span>
              </Link>
              <div className="mt-8 flex flex-col gap-2">
                {sidebarLinks.map((link) => (
                  <SidebarLink
                    key={link.label}
                    link={{ label: link.label, href: link.href, icon: link.icon }}
                    onClick={(event) => {
                      event.preventDefault()
                      link.onClick()
                    }}
                    className={cn(
                      'rounded-lg px-2 transition-colors',
                      link.active ? 'bg-[#1C1C2E]/10' : 'hover:bg-[#1C1C2E]/5'
                    )}
                  />
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>

        <section className="flex w-full flex-1 flex-col gap-4 bg-white p-3 sm:p-6 lg:p-8 overflow-y-auto">
          {activeView === 'blog' ? (
            <div className="space-y-6">
              <div className="border-b border-black/10 pb-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[#C9A05A] mb-2">Admin</p>
                <h2 className="text-2xl font-semibold text-[#1C1C2E]">Blog</h2>
                <p className="text-sm text-[#1C1C2E]/60">Crie, edite e publique os conteúdos do blog.</p>
              </div>
              <BlogManager />
            </div>
          ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_340px]">
            <div className="rounded-2xl border border-black/10 bg-[#FCFCFD] p-4 sm:p-5">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[#1C1C2E]">
                    {activeView === 'credenciamento' ? 'Leads de credenciamento' : 'Contatos do site'}
                  </h2>
                  <p className="text-sm text-[#1C1C2E]/60">{leadsByView.length} registro(s) no filtro atual</p>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'todos' | LeadStatus)}
                  className="h-10 rounded-lg border border-black/15 px-3 text-sm text-[#1C1C2E]"
                >
                  <option value="todos">Todos os status</option>
                  {statusOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-1">
                {leadsByView.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={cn(
                      'w-full rounded-xl border p-4 text-left transition-all',
                      selectedLead?.id === lead.id
                        ? 'border-[#C9A05A]/60 bg-[#FFFDF8]'
                        : 'border-black/10 bg-white hover:border-[#C9A05A]/35'
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-[#1C1C2E]">{lead.nome}</p>
                        <p className="text-sm text-[#1C1C2E]/65">{lead.email}</p>
                        <p className="text-sm text-[#1C1C2E]/65">{lead.telefone || '-'}</p>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-xs ${statusColors[lead.status]}`}>
                        {statusOptions.find((item) => item.value === lead.status)?.label}
                      </span>
                    </div>
                  </button>
                ))}

                {leadsByView.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-black/20 p-8 text-center text-sm text-[#1C1C2E]/55">
                    Nenhum lead encontrado para o filtro selecionado.
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-[#FCFCFD] p-4 sm:p-5">
              {!selectedLead ? (
                <p className="text-sm text-[#1C1C2E]/60">
                  Selecione um lead para ver detalhes, ligar, enviar e-mail e atualizar status.
                </p>
              ) : (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1C1C2E]">{selectedLead.nome}</h3>
                    <p className="text-sm text-[#1C1C2E]/60">
                      {selectedLead.source === 'credenciamento' ? 'Formulário de credenciamento' : 'Formulário de contato'}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm text-[#1C1C2E]">
                    <p className="flex items-center gap-2"><IconMail size={16} /> {selectedLead.email}</p>
                    <p className="flex items-center gap-2"><IconPhone size={16} /> {selectedLead.telefone || '-'}</p>
                    {selectedLead.source === 'credenciamento' ? (
                      <>
                        <p>Segmento: {selectedLead.segmento}</p>
                        <p>Cidade: {selectedLead.cidade} | País: {selectedLead.pais}</p>
                        <p>Leads desejados/dia: {selectedLead.leadsPorDia}</p>
                      </>
                    ) : (
                      <>
                        <p>Tipo de consórcio: {selectedLead.consorcio || '-'}</p>
                        <p>Mensagem: {selectedLead.mensagem || '-'}</p>
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`tel:${cleanPhone(selectedLead.telefone)}`}
                      className="flex h-10 items-center justify-center rounded-lg border border-[#1C1C2E]/20 text-sm font-medium text-[#1C1C2E]"
                    >
                      Ligar
                    </a>
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="flex h-10 items-center justify-center rounded-lg bg-[#1C1C2E] text-sm font-medium text-white"
                    >
                      Enviar e-mail
                    </a>
                  </div>

                  <div>
                    <p className="mb-2 text-xs uppercase tracking-wider text-[#1C1C2E]/55">Atualizar status</p>
                    <div className="space-y-2">
                      {statusOptions.map((status) => (
                        <button
                          key={status.value}
                          onClick={() => handleUpdateStatus(selectedLead, status.value)}
                          className={cn(
                            'h-9 w-full rounded-lg text-sm font-medium transition-colors',
                            selectedLead.status === status.value
                              ? 'bg-[#C9A05A] text-[#121417]'
                              : 'bg-[#F1F3F7] text-[#1C1C2E] hover:bg-[#E9EAF0]'
                          )}
                        >
                          {status.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          )}
        </section>
      </div>
    </main>
  )
}
