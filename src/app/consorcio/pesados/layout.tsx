import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Consórcio de Veículos Pesados e Agronegócio | Eixo',
    description:
        'Renove sua frota ou expanda o agronegócio sem pagar juros. Consórcio de caminhões, tratores, ônibus e máquinas agrícolas com prazos de até 180 meses. Brasília-DF.',
    keywords: [
        'consórcio veículos pesados',
        'consórcio caminhão Brasília',
        'consórcio trator DF',
        'consórcio máquinas agrícolas',
        'consórcio ônibus',
        'consórcio agronegócio',
        'consórcio frota empresarial',
        'consórcio produtor rural',
        'Eixo pesados',
        'renovar frota sem juros',
    ],
    openGraph: {
        title: 'Consórcio de Veículos Pesados e Agronegócio | Eixo',
        description:
            'Renove sua frota ou expanda o agronegócio sem pagar juros. Caminhões, tratores, ônibus e máquinas agrícolas com prazos de até 180 meses.',
        url: 'https://eixoconsorcios.com.br/consorcio/pesados',
        siteName: 'Eixo',
        locale: 'pt_BR',
        type: 'website',
        images: [
            {
                url: 'https://eixoconsorcios.com.br/og-pesados.jpg',
                width: 1200,
                height: 630,
                alt: 'Consórcio de Veículos Pesados — Eixo',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Consórcio de Veículos Pesados e Agronegócio | Eixo',
        description:
            'Caminhões, tratores, ônibus e máquinas agrícolas sem juros. Até 180 meses. Brasília-DF.',
    },
    alternates: {
        canonical: 'https://eixoconsorcios.com.br/consorcio/pesados',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function PesadosLayout({ children }: { children: React.ReactNode }) {
    return children
}
