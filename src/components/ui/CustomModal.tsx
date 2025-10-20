interface CustomModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    icon?: "success" | "error";
    onClose: () => void;
    secondButton?: () => void;
}

export default function CustomModal({
    isOpen,
    title,
    message,
    icon = "success",
    onClose,
    secondButton
}: CustomModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center animate-[scale-in_0.3s_ease-out] ">
                <div
                    className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center`}
                >
                    {icon === "success" ? <img src="/img/success.png" alt="" /> : <img src="/img/error.png" alt="" />}
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                {icon === "error" ? (
                    <button
                        onClick={onClose}
                        className="cursor-pointer bg-red-400 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition-all"
                    >
                        Volver a intentar
                    </button>
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={onClose}
                            className="cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
                        >
                            Enviar otro reconocimiento
                        </button>
                        {secondButton && (
                            <button
                                onClick={secondButton}
                                className="cursor-pointer border-2 border-blue-500 text-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                            >
                                Volver al inicio
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
