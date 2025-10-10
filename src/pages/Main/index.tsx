import EmployeeRecognitionForm from "@/components/common/EmployeeRecognitionForm";
import { ChevronsDown } from "lucide-react";

export default function Main() {
    return (
        <div className="flex flex-col justify-center items-center ">
            <div className="lg:max-w-1/2  max-w-full lg:p-0 p-4 flex flex-col gap-2 items-center">
                <div className=" max-w-full h-screen flex flex-col gap-2 items-center justify-center">
                    <p className="text-center text-white text-4xl font-semibold slide-in-1">
                        En Petroamérica creemos que el reconocimiento impulsa compromiso, confianza y orgullo por pertenecer.
                    </p>
                    <br />
                    <p className="text-center text-white text-lg slide-in-2">
                        Un reconocimiento a tiempo vale más que mil felicitaciones tardías, porque cuando alguien se siente visto en el momento justo, encuentra motivación donde otros solo verían rutina.
                    </p>
                    <br />
                    <button className="cursor-pointer fade-in" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                        <ChevronsDown className="w-16 h-16 text-white" />
                    </button>
                </div>
                <div className="py-10">
                    <h2 className="text-center text-white text-4xl font-semibold mb-10">Haz tu reconocimiento</h2>
                    <EmployeeRecognitionForm />
                </div>
            </div>
        </div>
    )
}
