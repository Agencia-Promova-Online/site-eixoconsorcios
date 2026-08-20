'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram } from 'lucide-react'
import { motion } from 'framer-motion'
import logo from '../assets/logo2.png'

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
  </svg>
)

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516z" />
  </svg>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Início', href: '/' },
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Blog', href: '/blog' },
    { name: 'Plataforma', href: '/plataforma' },
    { name: 'Contato', href: '/contato' },
  ]

  const services = [
    { name: 'Consórcio de Imóveis', href: '/consorcio/imovel' },
    { name: 'Consórcio de Automóveis', href: '/consorcio/automovel' },
    { name: 'Veículos Pesados', href: '/consorcio/pesados' },
    { name: 'Consórcio de Serviços', href: '/consorcio/servicos' },
  ]

  return (
    <footer className="bg-[#0F1119] border-t border-[#C9A05A]/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Image
                src={logo}
                alt="Eixo"
                width={320}
                height={320}
                className="h-24 w-auto"
              />
            </motion.div>
            <p className="text-[#FAF9F6]/60 text-sm font-light mb-6 leading-relaxed">
              Realizando sonhos através de consórcios.
              Sua conquista é nossa missão.
            </p>
            <div className="flex gap-3">
              {[
                { href: 'https://www.instagram.com/eixoconsorcios/', label: 'Instagram', Icon: () => <Instagram className="w-4 h-4" strokeWidth={1.5} /> },
                { href: 'https://www.facebook.com/profile.php?id=61588148514303', label: 'Facebook', Icon: () => <FacebookIcon className="w-4 h-4" /> },
                { href: 'https://wa.me/556131421052?text=' + encodeURIComponent('Olá! Estou no site da Eixo e gostaria de saber mais sobre os planos disponíveis. Podem me ajudar?'), label: 'WhatsApp', Icon: () => <WhatsAppIcon className="w-4 h-4" /> },
                { href: 'https://www.youtube.com/@eixoconsorcios', label: 'YouTube', Icon: () => <YouTubeIcon className="w-4 h-4" /> },
              ].map(({ href, label, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#C9A05A]/5 border border-[#C9A05A]/20 flex items-center justify-center text-[#C9A05A] hover:bg-[#C9A05A]/15 hover:border-[#C9A05A]/50 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[#C9A05A] font-medium text-sm tracking-widest uppercase mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#FAF9F6]/60 text-sm font-light hover:text-[#C9A05A] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#C9A05A] font-medium text-sm tracking-widest uppercase mb-6">Nossos Consórcios</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-[#FAF9F6]/60 text-sm font-light hover:text-[#C9A05A] transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#C9A05A] font-medium text-sm tracking-widest uppercase mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A05A] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-[#FAF9F6]/60 text-sm font-light">
                  Brasília - DF
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C9A05A] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-[#FAF9F6]/60 text-sm font-light">
                  (61) 3142-1052
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C9A05A] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-[#FAF9F6]/60 text-sm font-light break-all">
                  atendimento@eixoconsorcios.com.br
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A05A]/30 to-transparent" />

      <div className="bg-[#0F1119] border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-[#FAF9F6]/50 text-sm font-light">
                © {currentYear} Eixo. Todos os direitos reservados.
              </p>
              <p className="text-[#FAF9F6]/55 text-sm font-light mt-1">
                CNPJ: 41.704.227/0001-03
              </p>
              <p className="text-[#FAF9F6]/65 text-sm font-light mt-1">
                Autorização Banco Central N° 03/100/213/88
              </p>
            </div>
            <div className="flex gap-6 text-sm font-light">
              <Link href="/privacidade" className="text-[#FAF9F6]/50 hover:text-[#C9A05A] transition-colors">
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
