import RecognitionForm from "@/components/common/RecognitionForm";
import { useRecognition } from "@/hooks/useRecognition";
import ValueTypeSelect from "@/components/common/RecognitionTypeSelect";
import CustomModal from "@/components/ui/CustomModal";

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
        <>
            <div className="flex flex-col justify-center items-center">
                <div className="xl:max-w-2/3 lg:max-w-4/5  max-w-full xl:p-0 lg:p-4 sm:p-10 p-5 flex flex-col gap-2 items-center justify-center" id="value-select">
                    <div className=" max-w-full  flex flex-col  items-center mt-10">
                        <p className="text-center text-white lg:text-4xl text-2xl font-semibold slide-in-1">
                            En Petroamérica creemos que el reconocimiento impulsa compromiso, confianza y orgullo por pertenecer
                        </p>
                        <br />
                        <p className="text-center text-lg text-white mb-2 slide-in-2">Elige la competencia que mejor refleje lo que quieres reconocer</p>
                        <br />
                        <ValueTypeSelect
                            key={recognitionForm.value?.value}
                            options={valueOptions}
                            selectedValue={recognitionForm.value}
                            onSelect={(option) => handleRecognitionFormChange("value", option)}
                        />
                        <br />
                    </div>
                </div>

                <div
                    className={`xl:w-1/2 lg:w-4/5  w-full xl:p-0 lg:p-4 p-4 flex flex-col gap-2 items-center justify-center transition-all duration-700 ease-in-out ${recognitionForm.value
                        ? 'opacity-100 translate-y-0 max-h-[5000px]'
                        : 'opacity-0 translate-y-10 max-h-0 overflow-hidden'
                        }`}
                    id="employee-recognition"
                >
                    <RecognitionForm
                        recognitionForm={recognitionForm}
                        handleRecognitionFormChange={handleRecognitionFormChange}
                        messagePlaceholder={messagePlaceholder}
                        loading={loading}
                        valueOptions={valueOptions}
                        behaviorOptions={behaviorOptions}
                        handleSubmit={handleSubmit}
                    />
                    <br />
                </div>

                <p className="text-center text-white text-xl slide-in-2 italic mb-8">
                    Un reconocimiento a tiempo vale más que mil felicitaciones tardías
                </p>
            </div>
            <CustomModal
                isOpen={modalData.open}
                title={modalData.title}
                message={modalData.message}
                icon={modalData.icon}
                onClose={() => setModalData({ ...modalData, open: false })}
                secondButton={() => backToStart()}
            />
        </>
    )
}