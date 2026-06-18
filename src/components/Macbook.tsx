'use client'

import React, { useRef, useEffect } from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Monitor, Shield, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import img from "../assets/dashboard1.png";

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        icon: Monitor,
        title: "Acompanhe Online",
        description: "Acesse sua conta e acompanhe seu consórcio de qualquer lugar"
    },
    {
        icon: Shield,
        title: "100% Seguro",
        description: "Seus dados protegidos com a mais alta tecnologia"
    },
    {
        icon: Zap,
        title: "Rápido e Fácil",
        description: "Consulta instantânea e processo simplificado"
    }
];

export default function Macbook() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) return;

        const ctx = gsap.context(() => {
            if (titleRef.current) {
                const words = titleRef.current.querySelectorAll('.word');
                gsap.fromTo(
                    words,
                    {
                        opacity: 0,
                        y: 40,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 80%',
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="platform" className="relative bg-white overflow-hidden">
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
                        backgroundSize: '48px 48px'
                    }}
                />
            </div>

            <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-black/[0.02] rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-black/[0.02] rounded-full blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-0 relative z-10">
                <div className="text-center">
                    <motion.span
                        className="text-sm font-light tracking-widest text-black/40 uppercase mb-4 block"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Plataforma Digital
                    </motion.span>

                    <h2
                        ref={titleRef}
                        className="text-5xl sm:text-6xl lg:text-7xl font-light text-black mb-8"
                    >
                        <span className="word inline-block">Controle</span>{' '}
                        <span className="word inline-block">total</span>{' '}
                        <span className="word inline-block">na</span>{' '}
                        <span className="word inline-block">palma</span>{' '}
                        <span className="word inline-block">da</span>{' '}
                        <span className="word inline-block font-medium">sua mão</span>
                    </h2>

                    <motion.p
                        className="text-black/50 max-w-3xl mx-auto text-xl font-light mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        Nossa plataforma digital permite que você acompanhe seu consórcio em tempo real,
                        gerencie suas cotas de forma simples e intuitiva.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-0">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="group flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 cursor-default bg-[#C9A05A] shadow-lg shadow-[#C9A05A]/20 hover:bg-[#1C1C2E] hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white/20 group-hover:bg-white/10 transition-colors duration-300">
                                    <feature.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-lg font-medium mb-2 text-[#1C1C2E] group-hover:text-white transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-sm font-light text-[#1C1C2E]/70 group-hover:text-white/60 transition-colors duration-300">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full overflow-hidden bg-white">
                <MacbookScroll
                    title={
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-7xl sm:text-8xl lg:text-7xl font-light text-black">
                                Eixo <span className="font-medium">Consórcios</span>
                            </span>
                            <span className="text-2xl sm:text-3xl lg:text-2xl text-black/50 font-light max-w-lg px-4">
                                Acompanhe e realize seus sonhos com nossa plataforma completa
                            </span>
                        </div>
                    }
                    src={img.src}
                    showGradient={true}
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative z-10">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-[#2A2A2A] rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
                        <h3 className="text-3xl sm:text-4xl font-light text-white mb-4">
                            Pronto para começar?
                        </h3>
                        <p className="text-white/55 text-lg font-light mb-8 max-w-xl mx-auto">
                            Solicite uma análise gratuita e descubra as melhores opções para realizar seu objetivo.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contato"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A05A] text-black font-medium text-base rounded-full hover:bg-[#E8C97A] transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A05A]/20 hover:-translate-y-1"
                            >
                                Solicitar Análise Gratuita
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/plataforma"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white/70 font-light text-base rounded-full hover:border-[#C9A05A]/60 hover:text-[#C9A05A] transition-all duration-300"
                            >
                                Ver Plataforma Completa
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
