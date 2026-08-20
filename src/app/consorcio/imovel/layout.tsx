import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Consórcio de Imóveis | Eixo — Casa Própria Sem Juros',
    description:
        'Realize o sonho da casa própria sem pagar juros. Cartas de crédito de R$ 100 mil a R$ 5 milhões, prazo de até 200 meses. Autorizado pelo Banco Central. Brasília-DF.',
    keywords: [
        'consórcio de imóveis',
        'consórcio imóvel Brasília',
        'consórcio casa própria sem juros',
        'consórcio apartamento DF',
        'consórcio terreno Brasília',
        'comprar imóvel sem financiamento',
        'consórcio imobiliário Banco Central',
        'Eixo imóveis',
    ],
    openGraph: {
        title: 'Consórcio de Imóveis | Eixo',
        description:
            'Realize o sonho da casa própria sem pagar juros. Planejamento inteligente para conquistar o imóvel que você merece.',
        url: 'https://eixoconsorcios.com.br/consorcio/imovel',
        siteName: 'Eixo',
        locale: 'pt_BR',
        type: 'website',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80',
                width: 1200,
                height: 630,
                alt: 'Consórcio de Imóveis — Eixo',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Consórcio de Imóveis | Eixo',
        description:
            'Casa própria sem juros. Até 200 meses, carta de crédito de até R$ 5 milhões. Brasília-DF.',
        images: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80',
        ],
    },
    alternates: {
        canonical: 'https://eixoconsorcios.com.br/consorcio/imovel',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function ImovelLayout({ children }: { children: React.ReactNode }) {
    return children
}
