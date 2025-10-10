import CustomSelect from "@/components/ui/CustomSelect";
import { Award, Send, Users, Zap } from "lucide-react";
import { useState } from "react";
import RecognitionTypeSelect from "./RecognitionTypeSelect";
import CustomModal from "../ui/CustomModal";
import type { RecognitionType } from "@/types/recognition";

const employees = [
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'María González' },
    { id: 3, name: 'Carlos Rodríguez' },
    { id: 4, name: 'Ana Martínez' },
    { id: 5, name: 'Luis Torres' }
];

const recognitionTypes: Record<string, RecognitionType> = {
    leadership: {
        title: 'Liderazgo',
        icon: Award,
        bgColor: 'bg-blue-50',
        color: 'text-blue-400',
        borderColor: 'border-blue-300',
        behaviors: [
            { description: 'Inspira a otros con su ejemplo y actitud', suggestionText: "Tu coherencia y actitud positiva inspiran confianza. Eres ejemplo de compromiso en Petroamérica." },
            { description: 'Toma iniciativa para resolver problemas', suggestionText: "Gracias por liderar la solución antes de que el problema creciera. Esa proactividad es liderazgo real." },
            { description: 'Promueve la comunicación y la confianza', suggestionText: "Tu disposición al diálogo permitió que el equipo se entendiera mejor y trabajara en armonía." },
            { description: 'Brinda apoyo y guía a compañeros con menos experiencia', suggestionText: "Tu orientación a tus compañeros reflejó tu compromiso con su crecimiento y el del equipo." },
            { description: 'Asume responsabilidad ante situaciones difíciles', suggestionText: "Tu capacidad para dar la cara y buscar soluciones habla de tu madurez y liderazgo." },
            { description: 'Da retroalimentación o sugerencias constructivas', suggestionText: "Aprecio la forma en que das retroalimentación: directa, respetuosa y siempre orientada a mejorar." },
            { description: 'Motiva al equipo en momentos de presión', suggestionText: "Tu actitud positiva ayudó a que el equipo mantuviera el foco incluso bajo presión." },
            { description: 'Reconoce y celebra los logros de otros', suggestionText: "Gracias por reconocer y celebrar el esfuerzo del grupo; eso fortalece el orgullo de pertenecer." },
            { description: 'Fomenta la autonomía y confianza', suggestionText: "Confiaste en otros y les diste espacio para crecer. Ese gesto desarrolla nuevos líderes." },
            { description: 'Representa los valores de Petroamérica con coherencia', suggestionText: "Tu ejemplo diario refleja los valores que nos distinguen como Petroamérica." },

        ],
        shortDescription: "Cuando inspiramos y tomamos iniciativa."
    },
    efficiency: {
        title: 'Eficiencia',
        icon: Zap,
        bgColor: 'bg-yellow-50',
        color: 'text-yellow-400',
        borderColor: 'border-yellow-300',
        behaviors: [
            { description: 'Implementa mejoras que optimizan tiempos o recursos', suggestionText: "Tu propuesta optimizó tiempos y recursos, mostrando tu compromiso con la mejora continua." },
            { description: 'Prioriza con claridad en situaciones de alta presión', suggestionText: "Tu capacidad para organizar prioridades permitió cumplir con eficiencia sin sacrificar la calidad." },
            { description: 'Anticipa problemas y evita reprocesos', suggestionText: "Gracias por prever el riesgo y actuar a tiempo. Evitaste una pérdida importante para la operación." },
            { description: 'Encuentra soluciones creativas a retos operativos', suggestionText: "u ingenio ayudó a resolver un reto operativo de forma práctica y segura. Gran aporte." },
            { description: 'Mantiene altos estándares pese a limitaciones', suggestionText: "Tu disciplina y constancia garantizan calidad y seguridad, incluso en condiciones difíciles." },
        ],
        shortDescription: "Cuando logramos más con responsabilidad y mejora continua."
    },
    teamWork: {
        title: 'Trabajo en Equipo',
        icon: Users,
        bgColor: 'bg-green-50',
        color: 'text-green-400',
        borderColor: 'border-green-300',
        behaviors: [
            { description: 'Comparte información clave de forma proactiva', suggestionText: "Gracias por anticiparte y compartir la información que permitió al equipo avanzar más rápido y con menos errores." },
            { description: 'Fomenta la cooperación entre áreas o turnos', suggestionText: "Tu iniciativa para unir esfuerzos entre áreas fue clave para resolver el problema." },
            { description: 'Apoya a compañeros en momentos críticos', suggestionText: "Aprecio tu apoyo desinteresado al equipo en un momento clave. Tu compromiso marcó la diferencia." },
            { description: 'Genera un ambiente positivo en su equipo', suggestionText: "Tu buena energía ayudó a mantener la calma y la unión del grupo en un día complejo." },
            { description: 'Reconoce públicamente el aporte de otros', suggestionText: "Destaco tu generosidad al resaltar los logros de tus compañeros. Eso fortalece nuestra cultura de colaboración." }
        ],
        shortDescription: "Cuando colaboramos y nos apoyamos."
    }
};


export default function EmployeeRecognitionForm() {
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [selectedRecognition, setSelectedRecognition] = useState("");
    const [selectedDescription, setSelectedDescription] = useState("");
    const [message, setMessage] = useState("");
    const [modalData, setModalData] = useState<{
        open: boolean;
        title: string;
        message: string;
        icon: "success" | "error";
    }>({ open: false, title: "", message: "", icon: "success" });


    const handleSubmit = () => {
        if (!selectedEmployee || !selectedRecognition || !selectedDescription) {
            setModalData({
                open: true,
                title: "Error",
                message: "Por favor completa todos los campos requeridos",
                icon: "error",
            });
            return;
        }

        const employeeName = employees.find(
            (emp) => emp.id === parseInt(selectedEmployee)
        )?.name;
        const recognitionTitle =
            recognitionTypes[selectedRecognition as keyof typeof recognitionTypes]
                ?.title;

        setModalData({
            open: true,
            title: "¡Reconocimiento Enviado!",
            message: `Has reconocido a ${employeeName} por su ${recognitionTitle}`,
            icon: "success",
        });

        setSelectedEmployee("");
        setSelectedRecognition("");
        setSelectedDescription("");
        setMessage("");
    };

    const handleSuggestion = (description: string) => {
        const recognitionType = recognitionTypes[selectedRecognition as keyof typeof recognitionTypes];
        const behavior = recognitionType?.behaviors.find(
            (b) => b.description === description
        );
        if (behavior) {
            setMessage(behavior.suggestionText);
        }
    };

    return (
        <div className="bg-white rounded-xl p-8">
            <CustomSelect
                label="Selecciona un colaborador *"
                options={employees.map(emp => emp.name)}
                selectedValue={selectedEmployee}
                setSelectedValue={setSelectedEmployee}
            />

            <RecognitionTypeSelect
                types={recognitionTypes}
                selected={selectedRecognition}
                setSelected={(key) => {
                    setSelectedRecognition(key);
                    setSelectedDescription("");
                }}
            />

            <label className="block text-sm  text-gray-700 mb-3">
                <span className="font-semibold">Reconocer es fácil:</span> elige una competencia, selecciona el comportamiento que observaste y deja un mensaje sincero
            </label>
            {selectedRecognition && (
                <CustomSelect
                    label="¿Qué específicamente quieres reconocer? *"
                    options={recognitionTypes[selectedRecognition as keyof typeof recognitionTypes].behaviors.map(b => b.description)}
                    selectedValue={selectedDescription}
                    setSelectedValue={(value) => {
                        setSelectedDescription(value);
                        handleSuggestion(value);
                    }}
                />
            )}

            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Mensaje adicional (opcional)
                </label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Añade un mensaje personal..."
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none transition-colors resize-none"
                />
            </div>

            <button
                onClick={handleSubmit}
                className="cursor-pointer w-full bg-blue-400 text-white py-2 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200  flex items-center justify-center gap-2"
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
