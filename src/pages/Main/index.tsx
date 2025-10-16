import RecognitionForm from "@/components/common/RecognitionForm";
import HoverCards from "@/components/common/HoverCards";
import { ChevronsDown } from "lucide-react";
export default function Main() {
    return (
        <div className="flex flex-col justify-center items-center ">
            <div className="lg:max-w-3/5  max-w-full lg:p-0 p-4 flex flex-col gap-2 items-center">
                <div className=" max-w-full  flex flex-col  items-center mt-10">
                    <p className="text-center text-white lg:text-4xl text-2xl font-semibold slide-in-1">
                        En Petroamérica creemos que el reconocimiento impulsa compromiso, confianza y orgullo por pertenecer
                    </p>
                    <br />
                    <p className="text-center text-white mb-2 slide-in-2"><span className="font-semibold">Reconocer es fácil:</span> elige una competencia, selecciona el comportamiento que observaste y deja un mensaje sincero.</p>
                    <br />
                    <HoverCards />
                    <br />
                    <button className="cursor-pointer fade-in" onClick={() => window.scrollTo({ top: document.getElementById("employee-recognition")?.offsetTop, behavior: 'smooth' })}>
                        <ChevronsDown className="w-16 h-16 text-white" />
                        <p className="text-gray-100 text-sm">Continuar</p>
                    </button>
                </div>
            </div>
            <div className="lg:max-w-3/5  max-w-full lg:p-0 p-4 flex flex-col gap-2 items-center my-8" id="employee-recognition">
                <h2 className="text-center text-white text-4xl font-semibold mb-10">Reconoce al colaborador</h2>
                <RecognitionForm />
            </div>
            <p className="text-center text-white text-xl slide-in-2 italic mb-8">
                Un reconocimiento a tiempo vale más que mil felicitaciones tardías
            </p>
        </div>
    )
}
