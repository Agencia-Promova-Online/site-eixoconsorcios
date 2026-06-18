import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Plataforma Digital | Eixo Consórcios — Controle Total do seu Consórcio',
    description:
        'Acesse sua conta, realize simulações, acompanhe assembleias e gerencie seus lances em tempo real. Tecnologia e autonomia para o seu consórcio na palma da sua mão.',
    keywords: [
        'plataforma digital consórcio',
        'área do cliente consórcio',
        'simulador de consórcio online',
        'acompanhar assembleia online',
        'lance consórcio digital',
        'Eixo Consórcios plataforma',
        'gestão de consórcio online',
    ],
    openGraph: {
        title: 'Plataforma Digital | Eixo Consórcios',
        description:
            'Controle o seu consórcio com total autonomia. Acompanhe assembleias, dê lances e simule planos em tempo real.',
        url: 'https://eixoconsorcios.com.br/plataforma',
        siteName: 'Eixo Consórcios',
        locale: 'pt_BR',
        type: 'website',
        images: [
            {
                url: 'https://eixoconsorcios.com.br/og-plataforma.png',
                width: 1200,
                height: 630,
                alt: 'Plataforma Digital Eixo Consórcios',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Plataforma Digital | Eixo Consórcios',
        description:
            'Controle o seu consórcio com total autonomia. Acompanhe tudo em tempo real.',
        images: ['https://eixoconsorcios.com.br/og-plataforma.png'],
    },
    alternates: {
        canonical: 'https://eixoconsorcios.com.br/plataforma',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function PlataformaLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
