import assinatura from '../assets/assinatura.png';

const Assinatura: React.FC = () => {
    const openLink = (): void => {
        window.open('https://nossostudiomw.com.br/', '_blank');
    };

    return (
        <section className="w-full bg-black py-8 border-t border-gray-600">
            <div className="text-center">
                <p className="text-gray-200 mb-4 text-sm">
                    Desenvolvido por{' '}
                    <strong className="text-white">Fabrício Rodrigues</strong> /{' '}
                    <strong className="text-white">Gabriel Xavier</strong>
                </p>

                <button
                    className="mx-auto h-10 cursor-pointer hover:scale-105 transition-transform duration-300 bg-transparent border-0 p-0"
                    onClick={openLink}
                    aria-label="Visit NossoStudioMW website"
                >
                    <img
                        src={assinatura.src}
                        alt="NossoStudioMW"
                        className="h-10"
                    />
                </button>
            </div>
        </section>
    );
};

export default Assinatura;
