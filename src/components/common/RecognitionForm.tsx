import CustomSelect from "../ui/CustomSelect";
import SearchEmployee from "./SearchEmployee";
import type { RecognitionForm } from "@/types/recognition";
import type { SelectOption, ValueOption } from "@/types/global";
import { convertToFirstLetterUpperCase } from "@/utils/converters";

interface Props {
    recognitionForm: RecognitionForm;
    handleRecognitionFormChange: (key: keyof RecognitionForm, value: SelectOption | null | string) => void;
    messagePlaceholder: string;
    loading: boolean;
    valueOptions: ValueOption[];
    behaviorOptions: any[];
    handleSubmit: () => void;
}

export default function RecognitionForm({
    recognitionForm,
    handleRecognitionFormChange,
    messagePlaceholder,
    loading,
    valueOptions,
    behaviorOptions,
    handleSubmit,
}: Props) {
    const Icon = valueOptions.find((v) => v.core_value_id === Number(recognitionForm.value?.value))?.icon;

    return (
        <div className="bg-white rounded-xl md:p-8 p-4 w-full">
            <div className="flex flex-row items-center gap-2 mb-4">
                {Icon && (
                    <div className={`w-15 h-15 p-1 rounded-full flex items-center justify-center ${valueOptions.find((v) => v.core_value_id === Number(recognitionForm.value?.value))?.bgColorSecondary}`}>
                        <Icon
                            className={`w-8 h-8 text-white`}
                        />
                    </div>
                )}
                <div>
                    <h3 className=" text-2xl">Estas reconociendo por:</h3>
                    <h4 className={`text-3xl font-semibold ${valueOptions.find((v) => v.core_value_id === Number(recognitionForm.value?.value))?.iconColor}`}>{convertToFirstLetterUpperCase(recognitionForm.value?.label || "")}</h4>
                </div>
            </div>
            <SearchEmployee
                selectedValue={recognitionForm.employee}
                handleSelect={
                    (value) => handleRecognitionFormChange("employee", value)
                }
            />

            {recognitionForm.value && (
                <CustomSelect
                    label="¿Qué quieres reconocer específicamente? *"
                    options={behaviorOptions}
                    selectedValue={recognitionForm.behavior}
                    onSelect={(value) => handleRecognitionFormChange("behavior", value)}
                />
            )}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Mensaje adicional (opcional)
                </label>
                <textarea
                    value={recognitionForm.message}
                    onChange={(e) => handleRecognitionFormChange("message", e.target.value)}
                    placeholder={messagePlaceholder || "Añade un mensaje personal..."}
                    rows={4}
                    className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none transition-colors resize-none ${recognitionForm.message ? "" : "italic"}`}
                />
            </div>
            <button
                onClick={handleSubmit}
                className="cursor-pointer w-full bg-blue-500 text-white py-2 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.01] transition-all duration-200  flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
            >
                Enviar reconocimiento
            </button>
        </div>
    );
}
