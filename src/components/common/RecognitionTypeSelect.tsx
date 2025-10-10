import Tooltip from "../ui/Tooltip";
import type { RecognitionType } from "@/types/recognition";



interface RecognitionTypeSelectProps {
    types: Record<string, RecognitionType>;
    selected: string;
    setSelected: (value: string) => void;
}

export default function RecognitionTypeSelect({
    types,
    selected,
    setSelected,
}: RecognitionTypeSelectProps) {
    return (
        <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
                Este espacio fue creado para destacar las acciones que reflejan nuestros valores en acción:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(types).map(([key, type]) => {
                    const Icon = type.icon;
                    const isSelected = selected === key;
                    return (
                        <div className="flex flex-col items-center gap-2 justify-between">
                            <button
                                key={key}
                                type="button"
                                onClick={() => setSelected(key)}
                                className={`cursor-pointer relative p-6 rounded-xl border-3 transition-all duration-300 transform hover:scale-105 ${type.borderColor}  h-full`}
                            >
                                <div
                                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${type.bgColor} ${isSelected ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
                                />
                                <div className="relative">
                                    <div
                                        className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isSelected ? "bg-white bg-opacity-20" : "bg-gray-100"}`}
                                    >
                                        <Icon
                                            className={`w-8 h-8 ${isSelected ? type.color : "text-gray-400"}`}
                                        />
                                    </div>
                                    <h3
                                        className={`text-xl font-bold ${isSelected ? type.color : "text-gray-600"}`}
                                    >
                                        {type.title}
                                    </h3>
                                    <p className={`text-sm ${isSelected ? type.color : "text-gray-600"}`}>{type.shortDescription}</p>
                                </div>
                            </button>
                            <Tooltip text={type.shortDescription} maxWidth="50px" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
