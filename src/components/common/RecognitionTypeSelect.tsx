import type { SelectOption, ValueOption } from "@/types/global";

interface RecognitionTypeSelectProps {
    options: ValueOption[];
    selectedValue: SelectOption | null;
    onSelect: (value: SelectOption | null) => void;
}

export default function ValueTypeSelect({
    options,
    selectedValue,
    onSelect,
}: RecognitionTypeSelectProps) {
    return (
        <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
                Selecciona un valor *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {options.map((v) => {
                    const Icon = v.icon;
                    const isSelected = selectedValue?.value === v.valueId.toString();
                    return (
                        <div className="flex flex-col items-center gap-2 justify-between" key={v.valueId}>
                            <button
                                type="button"
                                onClick={() => onSelect({
                                    id: v.valueId,
                                    label: v.name,
                                    value: v.valueId.toString(),
                                    tooltip: v.description
                                })}
                                className={`cursor-pointer relative xl:p-6 md:p-4 p-2 rounded-xl border-3 transition-all duration-300 transform hover:scale-105 ${isSelected ? v.borderColor : "border-gray-200"}  h-full`}
                            >
                                <div
                                    className={`absolute inset-0 rounded-lg bg-gradient-to-br ${v.bgGradient} ${isSelected ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
                                />
                                <div className="relative">
                                    <div
                                        className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isSelected ? "bg-white bg-opacity-20" : "bg-gray-100"}`}
                                    >
                                        <Icon
                                            className={`w-8 h-8 ${isSelected ? v.iconColor : "text-gray-400"}`}
                                        />
                                    </div>
                                    <h3
                                        className={`text-xl font-bold ${isSelected ? v.color : "text-gray-600"}`}
                                    >
                                        {v.name}
                                    </h3>
                                    <p className={`text-sm ${isSelected ? `${v.color} font-semibold` : "text-gray-600"}`}>{v.shortDescription}</p>
                                </div>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
