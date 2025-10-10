interface CustomModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    icon?: "success" | "error";
    onClose: () => void;
}

export default function CustomModal({
    isOpen,
    title,
    message,
    icon = "success",
    onClose,
}: CustomModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center animate-[scale-in_0.3s_ease-out] ">
                <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full ${icon === "success" ? "bg-green-100" : "bg-blue-100"
                        } flex items-center justify-center`}
                >
                    <svg
                        className={`w-8 h-8 ${icon === "success" ? "text-green-500" : "text-blue-500"
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={
                                icon === "success"
                                    ? "M5 13l4 4L19 7"
                                    : "M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            }
                        ></path>
                    </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
                >
                    OK
                </button>
            </div>
        </div>
    );
}
