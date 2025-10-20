import RecognitionForm from "@/components/common/RecognitionForm";
import { useRecognition } from "@/hooks/useRecognition";
import ValueTypeSelect from "@/components/common/RecognitionTypeSelect";
export default function Main() {
    const {
        recognitionForm,
        messagePlaceholder,
        modalData,
        handleSubmit,
        handleRecognitionFormChange,
        setModalData,
        loading,
        valueOptions,
        behaviorOptions,
        backToStart
    } = useRecognition();
    return (
        <div className="flex flex-col justify-center items-center ">
            <div className="h-screen lg:max-w-3/5  max-w-full lg:p-0 p-4 flex flex-col gap-2 items-center justify-center" id="value-select">
                <div className=" max-w-full  flex flex-col  items-center mt-10">
                    <p className="text-center text-white lg:text-4xl text-2xl font-semibold slide-in-1">
                        En Petroamérica creemos que el reconocimiento impulsa compromiso, confianza y orgullo por pertenecer
                    </p>
                    <br />
                    <p className="text-center text-lg text-white mb-2 slide-in-2">Elige la competencia que mejor refleje lo que quieres reconocer.</p>
                    <br />
                    <ValueTypeSelect
                        key={recognitionForm.value?.value}
                        options={valueOptions}
                        selectedValue={recognitionForm.value}
                        onSelect={(option) => handleRecognitionFormChange("value", option)}
                        onClose={() => handleRecognitionFormChange("value", null)}
                    />
                    <br />
                </div>
            </div>
            <div className="h-screen lg:max-w-3/5  max-w-full lg:p-0 p-4  flex flex-col gap-2 justify-center items-center " id="employee-recognition">
                <RecognitionForm
                    recognitionForm={recognitionForm}
                    handleRecognitionFormChange={handleRecognitionFormChange}
                    messagePlaceholder={messagePlaceholder}
                    modalData={modalData}
                    setModalData={setModalData}
                    loading={loading}
                    valueOptions={valueOptions}
                    behaviorOptions={behaviorOptions}
                    handleSubmit={handleSubmit}
                    backToStart={backToStart}
                />

            </div>
            <p className="text-center text-white text-xl slide-in-2 italic mb-8">
                Un reconocimiento a tiempo vale más que mil felicitaciones tardías
            </p>
        </div>
    )
}
