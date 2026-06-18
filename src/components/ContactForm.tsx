'use client'

import { useState, useEffect } from 'react'
import AOS from 'aos'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { AceternityInput, AceternityTextarea } from '@/components/ui/aceternity-input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Send, CheckCircle, MapPin, Phone, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { db } from '@/lib/firebase'



const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  )
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  useEffect(() => {
    AOS.refresh()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await addDoc(collection(db, 'contatos_site'), {
        ...formData,
        status: 'sem_contato',
        origem: 'site_contato',
        createdAt: serverTimestamp(),
      })
      setIsSubmitting(false)
      setIsSubmitted(true)

      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
      }, 3000)
    } catch {
      setIsSubmitting(false)
    }
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim()
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim()
  }

  return (
    <section id="contact" className="py-32 bg-[#0F1119] dark-section relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20" data-aos="fade-up">
          <motion.span
            className="text-sm font-light tracking-widest text-[#C9A05A] uppercase mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Fale conosco
          </motion.span>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-8">
            Entre em{' '}
            <span className="font-medium">Contato</span>
          </h2>
          <p className="text-white/50 max-w-3xl mx-auto text-xl font-light">
            Preencha o formulário e nossa equipe entrará em contato em breve.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-[#FAF9F6] border border-black/8 rounded-3xl p-5 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-light text-[#1C1C2E] mb-6 sm:mb-8">
                Informações de Contato
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-[#C9A05A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A05A]/20 transition-colors">
                    <MapPin className="w-6 h-6 text-[#C9A05A]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[#1C1C2E] font-light text-lg">Localização</p>
                    <p className="text-black/50 text-base font-light">Brasília - DF</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-[#C9A05A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A05A]/20 transition-colors">
                    <Phone className="w-6 h-6 text-[#C9A05A]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[#1C1C2E] font-light text-lg">Telefone</p>
                    <p className="text-black/50 text-base font-light">(61) 3142-1052</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-[#C9A05A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A05A]/20 transition-colors">
                    <Mail className="w-6 h-6 text-[#C9A05A]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[#1C1C2E] font-light text-lg">E-mail</p>
                    <p className="text-black/50 text-base font-light">atendimento@eixoconsorcios.com.br</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <button
                    onClick={() => window.open('https://wa.me/556131421052?text=Olá%2C%20estou%20no%20site%20e%20gostaria%20de%20saber%20mais', '_blank')}
                    className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors hover:scale-110"
                  >
                    <svg className="w-6 h-6 text-green-500 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516z" />
                    </svg>
                  </button>
                  <div>
                    <p className="text-[#1C1C2E] font-light text-lg">WhatsApp</p>
                    <button
                      onClick={() => window.open('https://wa.me/556131421052?text=Olá%2C%20estou%20no%20site%20e%20gostaria%20de%20saber%20mais', '_blank')}
                      className="text-green-600 hover:text-green-700 text-base font-light transition-colors"
                    >
                      (61) 3142-1052
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF9F6] border border-black/8 rounded-3xl p-5 sm:p-8">
              <h4 className="text-lg sm:text-xl font-light text-[#1C1C2E] mb-4 sm:mb-6">
                Horário de Atendimento
              </h4>
              <div className="space-y-3 text-base font-light">
                <div className="flex justify-between text-black/70">
                  <span>Segunda a sexta</span>
                  <span>08:30 às 18:00</span>
                </div>
                <div className="flex justify-between text-black/50">
                  <span>Sábado</span>
                  <span>08:30 às 12:00</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#FAF9F6] border border-black/8 rounded-3xl p-5 sm:p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-light text-[#1C1C2E] mb-2">
                    Mensagem Enviada!
                  </h3>
                  <p className="text-black/50 font-light">
                    Em breve entraremos em contato.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <LabelInputContainer>
                    <Label htmlFor="name" className="text-black/70 font-light">Nome Completo *</Label>
                    <AceternityInput
                      id="name"
                      placeholder="Digite seu nome"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-white text-[#1C1C2E] placeholder:text-black/30 focus-visible:ring-black/15"
                    />
                  </LabelInputContainer>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <LabelInputContainer>
                      <Label htmlFor="email" className="text-black/70 font-light">E-mail *</Label>
                      <AceternityInput
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-white text-[#1C1C2E] placeholder:text-black/30 focus-visible:ring-black/15"
                      />
                    </LabelInputContainer>

                    <LabelInputContainer>
                      <Label htmlFor="phone" className="text-black/70 font-light">Telefone *</Label>
                      <AceternityInput
                        id="phone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                        maxLength={15}
                        required
                        className="bg-white text-[#1C1C2E] placeholder:text-black/30 focus-visible:ring-black/15"
                      />
                    </LabelInputContainer>
                  </div>

                  <LabelInputContainer>
                    <Label htmlFor="message" className="text-black/70 font-light">Mensagem (Opcional)</Label>
                    <AceternityTextarea
                      id="message"
                      placeholder="Conte-nos mais sobre o que você procura..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-white text-[#1C1C2E] placeholder:text-black/30 focus-visible:ring-black/15"
                    />
                  </LabelInputContainer>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group/btn relative block h-12 w-full rounded-2xl bg-[#C9A05A] font-medium text-[#0F1119] transition-all duration-300 hover:bg-[#D6B572] hover:shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#0F1119]/30 border-t-[#0F1119] rounded-full animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />
                        Enviar Mensagem
                      </span>
                    )}
                    <BottomGradient />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto mt-8"
        >
          <div className="rounded-3xl overflow-hidden border border-white/10 h-72 lg:h-96">
            <iframe
              src="https://maps.google.com/maps?q=-15.841314461555962,-48.04395695581947&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(20%) contrast(1.05)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Eixo Consórcios — Brasília, DF"
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
