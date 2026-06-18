import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Consórcio de Serviços | Eixo Consórcios — Viagens, Educação, Saúde e Mais',
    description:
        'Realize experiências além de bens materiais. Consórcio de serviços com mais de 40 categorias: viagens, educação, saúde, eventos, energia solar e muito mais. Sem juros, até 60 meses. Brasília-DF.',
    keywords: [
        'consórcio de serviços',
        'consórcio viagem Brasília',
        'consórcio educação DF',
        'consórcio saúde estética',
        'consórcio energia solar',
        'consórcio casamento',
        'consórcio MBA',
        'consórcio serviços sem juros',
        'Eixo Consórcios serviços',
        'carta de crédito para serviços',
    ],
    openGraph: {
        title: 'Consórcio de Serviços | Eixo Consórcios',
        description:
            'Realize experiências além de bens materiais. Mais de 40 categorias de serviços: viagens, educação, saúde, eventos e energia solar — sem juros e com total flexibilidade.',
        url: 'https://eixoconsorcios.com.br/consorcio/servicos',
        siteName: 'Eixo Consórcios',
        locale: 'pt_BR',
        type: 'website',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1488085061851-e7bf9cc76949?w=1200&auto=format&fit=crop&q=80',
                width: 1200,
                height: 630,
                alt: 'Consórcio de Serviços — Eixo Consórcios',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Consórcio de Serviços | Eixo Consórcios',
        description:
            'Viagens, educação, saúde, casamento e muito mais — sem juros, em até 60 meses. Brasília-DF.',
        images: [
            'https://images.unsplash.com/photo-1488085061851-e7bf9cc76949?w=1200&auto=format&fit=crop&q=80',
        ],
    },
    alternates: {
        canonical: 'https://eixoconsorcios.com.br/consorcio/servicos',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function ServicosLayout({ children }: { children: React.ReactNode }) {
    return children
}
