import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Fale Conosco | Eixo — Atendimento e Consultoria',
    description:
        'Entre em contato com a Eixo. Tire suas dúvidas sobre consórcio de imóveis, veículos e serviços. Atendimento especializado em Brasília-DF.',
    keywords: [
        'contato Eixo',
        'telefone Eixo',
        'WhatsApp Eixo',
        'endereço Eixo Brasília',
        'consultoria de consórcio DF',
        'atendimento consórcio',
    ],
    openGraph: {
        title: 'Fale Conosco | Eixo',
        description:
            'Tire suas dúvidas e solicite uma consultoria personalizada sobre consórcios.',
        url: 'https://eixoconsorcios.com.br/contato',
        siteName: 'Eixo',
        locale: 'pt_BR',
        type: 'website',
        images: [
            {
                url: 'https://eixoconsorcios.com.br/og-contato.png',
                width: 1200,
                height: 630,
                alt: 'Fale Conosco — Eixo',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Fale Conosco | Eixo',
        description:
            'Tire suas dúvidas e solicite uma consultoria personalizada sobre consórcios.',
        images: ['https://eixoconsorcios.com.br/og-contato.png'],
    },
    alternates: {
        canonical: 'https://eixoconsorcios.com.br/contato',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function ContatoLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
