import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Consórcio de Automóveis | Eixo — Sem Juros, Adesão Flexível',
    description:
        'Adquira seu carro novo ou seminovo sem pagar juros. Planos de 24 a 80 meses, cartas de crédito flexíveis e contemplação por sorteio ou lance. Brasília-DF.',
    keywords: [
        'consórcio de automóveis',
        'consórcio de carros Brasília',
        'consórcio veículo sem juros',
        'consórcio carro DF',
        'consórcio seminovo',
        'consórcio carro zero',
        'Eixo automóveis',
        'comprar carro sem financiamento',
    ],
    openGraph: {
        title: 'Consórcio de Automóveis | Eixo',
        description:
            'Seu carro novo ou seminovo com parcelas que cabem no bolso. Sem juros, adesão flexível e com total liberdade para escolher o modelo que você quiser.',
        url: 'https://eixoconsorcios.com.br/consorcio/automovel',
        siteName: 'Eixo',
        locale: 'pt_BR',
        type: 'website',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&auto=format&fit=crop&q=80',
                width: 1200,
                height: 630,
                alt: 'Consórcio de Automóveis — Eixo',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Consórcio de Automóveis | Eixo',
        description:
            'Adquira seu carro sem juros. Planos flexíveis de 24 a 80 meses. Brasília-DF.',
        images: [
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&auto=format&fit=crop&q=80',
        ],
    },
    alternates: {
        canonical: 'https://eixoconsorcios.com.br/consorcio/automovel',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function AutomovelLayout({ children }: { children: React.ReactNode }) {
    return children
}
