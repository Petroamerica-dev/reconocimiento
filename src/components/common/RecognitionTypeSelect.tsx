import type { SelectOption, ValueOption } from "@/types/global";
import { convertToFirstLetterUpperCase } from "@/utils/converters";

interface RecognitionTypeSelectProps {
    options: ValueOption[];
    selectedValue: SelectOption | null;
    onSelect: (value: SelectOption | null) => void;
    onClose: () => void;
}

export default function ValueTypeSelect({
    options,
    selectedValue,
    onSelect,
    onClose
}: RecognitionTypeSelectProps) {
    return (
        <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {options.map((v) => {
                    const Icon = v.icon;
                    const isSelected = selectedValue?.value === v.valueId.toString();
                    return (
                        <div
                            key={v.valueId}
                            onClick={() => onSelect({
                                id: v.valueId,
                                label: v.name,
                                value: v.valueId.toString(),
                                tooltip: v.description
                            })}
                            className={`xl:p-6 md:py-4 md:px-5 py-2 px-3 rounded-xl flex flex-col transition-all duration-500 ease-in-out transform ${isSelected ? "scale-105 h-fit border-4 shadow-lg" : "hover:-translate-y-2 h-72 border-2"} ${v.bgColor} ${isSelected ? v.borderColor : "border-transparent"} ${isSelected ? v.shadowColor : ""} gap-2 text-center`}


                        >

                            <div
                                className={`w-16 h-16 mx-auto  rounded-full flex items-center justify-center ${isSelected ? v.bgColorSecondary : v.iconBgColor}`}
                            >
                                <Icon
                                    className={`w-8 h-8 ${isSelected ? "text-white" : v.iconColor}`}
                                />
                            </div>
                            <h3
                                className={`text-2xl font-semibold ${v.color}`}
                            >
                                {convertToFirstLetterUpperCase(v.name)}
                            </h3>
                            <div className="overflow-hidden">
                                <p className={`${v.color} transition-opacity duration-500 ${isSelected ? 'opacity-100 md:text-sm text-lg' : 'opacity-90 text-lg'}`}>
                                    {isSelected ? v.description : v.shortDescription}
                                </p>
                            </div>
                            {isSelected && (
                                <div
                                    className="flex flex-col gap-2 animate-fadeIn"
                                    style={{ animation: "fadeIn 0.4s ease-in-out" }}
                                >
                                    <button
                                        className={`cursor-pointer bg-white px-4 py-2 rounded-md ${v.iconColor}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.scrollTo({
                                                top: document.getElementById("employee-recognition")?.offsetTop,
                                                behavior: "smooth",
                                            });
                                        }}
                                    >
                                        Continuar
                                    </button>
                                    <button
                                        className={`cursor-pointer border-2 border-white px-4 py-2 rounded-md ${v.color}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onClose();
                                        }}
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
