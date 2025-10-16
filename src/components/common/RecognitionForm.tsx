import { Send } from "lucide-react";
import CustomModal from "../ui/CustomModal";
import CustomSelect from "../ui/CustomSelect";
import { useRecognition } from "@/hooks/useRecognition";
import ValueTypeSelect from "./RecognitionTypeSelect";
import SearchEmployee from "./SearchEmployee";

export default function RecognitionForm() {
    const {
        recognitionForm,
        messagePlaceholder,
        modalData,
        handleSubmit,
        handleRecognitionFormChange,
        setModalData,
        loading,
        valueOptions,
        behaviorOptions
    } = useRecognition();

    return (
        <div className="bg-white rounded-xl md:p-8 p-4 w-full">
            <SearchEmployee
                selectedValue={recognitionForm.employee}
                handleSelect={
                    (value) => handleRecognitionFormChange("employee", value)
                }
            />
            <ValueTypeSelect
                options={valueOptions}
                selectedValue={recognitionForm.value}
                onSelect={(key) => handleRecognitionFormChange("value", key)}
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
                className="cursor-pointer w-full bg-blue-400 text-white py-2 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.01] transition-all duration-200  flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
            >
                <Send className="w-5 h-5" />
                Enviar Reconocimiento
            </button>

            <CustomModal
                isOpen={modalData.open}
                title={modalData.title}
                message={modalData.message}
                icon={modalData.icon}
                onClose={() => setModalData({ ...modalData, open: false })}
            />
        </div>
    );
}
