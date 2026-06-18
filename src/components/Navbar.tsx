'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Home, Car, Truck, Briefcase, Building2, User, Users } from 'lucide-react'
import logo from '../assets/logo2.png'

const consorcioItems = [
  { name: 'Consórcio de Imóveis', href: '/consorcio/imovel', icon: Building2, desc: 'Casa, apartamento ou terreno' },
  { name: 'Consórcio de Automóveis', href: '/consorcio/automovel', icon: Car, desc: 'Carro novo ou seminovo' },
  { name: 'Veículos Pesados', href: '/consorcio/pesados', icon: Truck, desc: 'Caminhões e máquinas agrícolas' },
  { name: 'Consórcio de Serviços', href: '/consorcio/servicos', icon: Briefcase, desc: 'Viagens, eventos e mais' },
]

const navigation = [
  { name: 'Início', href: '/' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Consórcios', href: '#', hasDropdown: true },
  { name: 'Blog', href: '/blog' },
  { name: 'Plataforma', href: '/plataforma' },
  { name: 'Contato', href: '/contato' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isConsorcioOpen, setIsConsorcioOpen] = useState(false)
  const [isMobileConsorcioOpen, setIsMobileConsorcioOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsConsorcioOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsConsorcioOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-300 ${isScrolled ? 'bg-black border-b border-white/10' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="hidden lg:grid items-center h-20"
          style={{ gridTemplateColumns: '1fr auto 1fr' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-start">
            <Link href="/">
              <motion.div
                className="flex items-center space-x-3 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src={logo}
                  alt="Eixo Consórcios"
                  title="Eixo Consórcios"
                  width={192}
                  height={192}
                  className="h-16 w-auto"
                  priority
                />
              </motion.div>
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex items-center gap-1 px-2 py-2">
              {navigation.map((item) => (
                item.hasDropdown ? (
                  <div key={item.name} className="relative" ref={dropdownRef}>
                    <motion.button
                      onClick={() => setIsConsorcioOpen(!isConsorcioOpen)}
                      className={`flex items-center gap-1 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                        isActive('/consorcio')
                          ? 'bg-white/15 text-white'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isConsorcioOpen ? 'rotate-180' : ''}`}
                      />
                    </motion.button>

                    <AnimatePresence>
                      {isConsorcioOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-72 backdrop-blur-xl bg-black/80 border border-white/10 rounded-2xl p-2 shadow-2xl"
                        >
                          {consorcioItems.map((c) => (
                            <Link
                              key={c.href}
                              href={c.href}
                              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors group"
                              onClick={() => setIsConsorcioOpen(false)}
                            >
                              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A05A]/20 transition-colors">
                                <c.icon className="w-4 h-4 text-white/60 group-hover:text-[#C9A05A] transition-colors" strokeWidth={1.5} />
                              </div>
                              <div>
                                <p className="text-white/90 text-sm font-medium">{c.name}</p>
                                <p className="text-white/40 text-xs font-light">{c.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div key={item.name} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href={item.href}
                      className={`block px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        isActive(item.href)
                          ? 'bg-white/15 text-white'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white text-black font-light text-sm rounded-full hover:shadow-lg hover:shadow-white/10 transition-all duration-300"
            >
              <User className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span className="hidden xl:inline">Portal do Cliente</span>
              <span className="xl:hidden">Cliente</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white text-black font-light text-sm rounded-full hover:shadow-lg hover:shadow-white/10 transition-all duration-300"
            >
              <Users className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span className="hidden xl:inline">Portal do Representante</span>
              <span className="xl:hidden">Representante</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          className="lg:hidden relative flex items-center justify-between h-16 px-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <Image
                src={logo}
                alt="Eixo Consórcios"
                width={96}
                height={96}
                className="h-8 w-auto"
                priority
              />
            </div>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <motion.span
                className="w-full h-[1.5px] bg-white rounded-full origin-left"
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? -1 : 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-full h-[1.5px] bg-white rounded-full"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-full h-[1.5px] bg-white rounded-full origin-left"
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </button>
        </motion.div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden mt-0 bg-black border-b border-white/10 px-6 py-6 shadow-2xl"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-2">
                {navigation.map((item, index) => (
                  item.hasDropdown ? (
                    <div key={item.name}>
                      <motion.button
                        className="flex items-center justify-between w-full text-white/70 hover:text-white font-light py-2 cursor-pointer"
                        onClick={() => setIsMobileConsorcioOpen(!isMobileConsorcioOpen)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${isMobileConsorcioOpen ? 'rotate-180' : ''}`} />
                      </motion.button>
                      <AnimatePresence>
                        {isMobileConsorcioOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-4 mt-1 space-y-1 overflow-hidden"
                          >
                            {consorcioItems.map((c) => (
                              <Link
                                key={c.href}
                                href={c.href}
                                className="flex items-center gap-2 py-2 text-white/50 hover:text-white transition-colors text-sm"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <c.icon className="w-4 h-4" strokeWidth={1.5} />
                                {c.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                      <Link
                        href={item.href}
                        className={`block py-2 font-light ${isActive(item.href) ? 'text-white' : 'text-white/70 hover:text-white'}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                ))}
                <motion.div
                  className="pt-4 border-t border-white/10 space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" className="flex items-center justify-center gap-1.5 py-2.5 bg-white text-black text-xs font-light rounded-full">
                      <User className="w-3 h-3" strokeWidth={1.5} />
                      Portal do Cliente
                    </button>
                    <button type="button" className="flex items-center justify-center gap-1.5 py-2.5 bg-white text-black text-xs font-light rounded-full">
                      <Users className="w-3 h-3" strokeWidth={1.5} />
                      Representante
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
