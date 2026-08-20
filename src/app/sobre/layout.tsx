import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sobre a Eixo | Quem Somos',
    description:
        'Conheça a Eixo: nascida em Brasília-DF, autorizada pelo Banco Central do Brasil e comprometida em transformar sonhos em realidade com transparência e segurança.',
    keywords: [
        'Eixo',
        'sobre Eixo',
        'quem somos consórcio',
        'administradora de consórcio Brasília',
        'consórcio autorizado Banco Central',
        'consórcio imóvel Brasília',
        'consórcio veículo DF',
    ],
    openGraph: {
        title: 'Sobre a Eixo | Quem Somos',
        description:
            'Conheça a Eixo: nascida em Brasília-DF, autorizada pelo Banco Central do Brasil e comprometida em transformar sonhos em realidade com transparência e segurança.',
        url: 'https://eixoconsorcios.com.br/sobre',
        siteName: 'Eixo',
        locale: 'pt_BR',
        type: 'website',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop&q=80',
                width: 1200,
                height: 630,
                alt: 'Equipe Eixo',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sobre a Eixo | Quem Somos',
        description:
            'Conheça a Eixo: nascida em Brasília-DF, autorizada pelo Banco Central do Brasil.',
        images: [
            'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop&q=80',
        ],
    },
    alternates: {
        canonical: 'https://eixoconsorcios.com.br/sobre',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function SobreLayout({ children }: { children: React.ReactNode }) {
    return children
}
