import type { SelectOption, ValueOption } from "@/types/global";
import { convertToFirstLetterUpperCase } from "@/utils/converters";

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
                            className={`cursor-pointer rounded-xl flex flex-col transition-all duration-500 ease-in-out transform ${isSelected ? "scale-105 h-fit border-4 shadow-lg xl:p-10 md:py-8 md:px-7 py-6 px-5" : "hover:-translate-y-2 h-72 border-2 xl:p-6 md:py-4 md:px-5 py-2 px-3"} ${v.bgColor} ${isSelected ? v.borderColor : "border-transparent"} ${isSelected ? v.shadowColor : ""}  ${isSelected ? "md:my-0 my-5" : ""} gap-3 text-center`}
                        >

                            <div
                                className={`mx-auto rounded-full flex items-center justify-center ${isSelected ? `${v.bgColorSecondary} w-24 h-24` : `${v.iconBgColor} w-16 h-16`}`}
                            >
                                <Icon
                                    className={`transition-all duration-500 ease-in-out ${isSelected ? "w-14 h-14 text-white" : `w-8 h-8 ${v.iconColor}`}`}
                                />
                            </div>
                            <h3
                                className={`font-semibold transition-all duration-500 ease-in-out ${v.color} ${isSelected ? 'text-3xl' : 'text-2xl'}`}
                            >
                                {convertToFirstLetterUpperCase(v.name)}
                            </h3>
                            <div className="overflow-hidden">
                                <p className={`${v.color} transition-all duration-500 ease-in-out ${isSelected ? 'opacity-100' : 'opacity-90 '} text-lg`}>
                                    {isSelected ? v.description : v.shortDescription}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}