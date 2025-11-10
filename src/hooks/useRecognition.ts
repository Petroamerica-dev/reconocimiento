import { useAuth } from "@/context/AuthProvider";
import apiEmail from "@/services/api/email";
import apiRecognition from "@/services/api/recognition";
import apiCoreValue from "@/services/api/value";
import type { Behavior, CoreValueResponse } from "@/types/data";
import type { SelectOption, ValueOption } from "@/types/global";
import type { RecognitionForm, RecognitionRequest, } from "@/types/recognition";
import { valueStyles } from "@/utils/constants";
import { useEffect, useState } from "react";

const initialRecognitionForm = {
    employee: null,
    value: null,
    behavior: null,
    message: "",
}

export const useRecognition = () => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(true);

    const [recognitionForm, setRecognitionForm] = useState<RecognitionForm>({ ...initialRecognitionForm });

    const [coreValues, setValues] = useState<CoreValueResponse[]>([]);
    const [behaviors, setBehaviors] = useState<Behavior[]>([]);

    const [valueOptions, setValueOptions] = useState<ValueOption[]>([]);
    const [behaviorOptions, setBehaviorOptions] = useState<SelectOption[]>([]);

    const [messagePlaceholder, setMessagePlaceholder] = useState("");
    const [modalData, setModalData] = useState<{
        open: boolean;
        title: string;
        message: string;
        icon: "success" | "error";
    }>({ open: false, title: "", message: "", icon: "success" });

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!recognitionForm.employee || !recognitionForm.value || !recognitionForm.behavior) {
                throw new Error("Por favor completa todos los campos requeridos");
            }

            const recognitionRequest: RecognitionRequest = {
                sender_id: Number(user?.userId),
                receiver_id: Number(recognitionForm.employee.id),
                behavior_id: Number(recognitionForm.behavior.id),
                message: recognitionForm.message,
            };

            const response = await apiRecognition.create(recognitionRequest);

            const dataResponse = response.data;

            if (!dataResponse.success || !dataResponse.data) {
                throw new Error("Error al crear reconocimiento");
            }

            const emailResponse = await apiEmail.sendRecognition({
                ...recognitionRequest,
                recognition_id: dataResponse.data.recognition_id
            });

            if (emailResponse.data.success) {
                setModalData({
                    open: true,
                    title: "¡Reconocimiento Enviado!",
                    message: `Has valorado el esfuerzo de un colaborador. Gracias por fortalecer la cultura en Petroamérica`,
                    icon: "success",
                });

            } else {
                throw new Error("Error al enviar correo electrónico");
            }
        } catch (error) {
            console.error("Error al enviar correo electrónico:", error);
            setModalData({
                open: true,
                title: "Error",
                message: (error as Error).message || "Error al enviar correo electrónico",
                icon: "error",
            });
        } finally {
            setLoading(false);
        }


    };

    const handleRecognitionFormChange = (key: keyof RecognitionForm, value: SelectOption | string | null) => {
        setRecognitionForm(prevState => ({ ...prevState, [key]: value }));
        if (key === "value") {
            if (value) {
                const vf = coreValues.find(v => v.core_value_id === Number((value as SelectOption)?.id));
                if (vf) {
                    setBehaviorOptions(vf.behaviors.map(b => ({
                        id: b.behavior_id,
                        label: b.description,
                        value: b.behavior_id.toString(),
                        tooltip: b.when_applied
                    })));
                    setBehaviors(vf.behaviors);
                }
            } else {
                setBehaviorOptions([]);
                setBehaviors([]);
                setMessagePlaceholder("");
            }
        } else if (key === "behavior") {
            const bf = behaviors.find(b => b.behavior_id === Number((value as SelectOption)?.id));
            if (bf) {
                setMessagePlaceholder(bf.suggestion_text);
            } else {
                setMessagePlaceholder("");
            }
        }
    };


    const fetchValues = async () => {
        try {
            const coreValues = await apiCoreValue.getAll();
            console.log(coreValues.data)
            const vo: ValueOption[] = coreValues.data.map(v => {
                const coreValueUpp = v.name.toUpperCase();
                const valueStyle = valueStyles[coreValueUpp as keyof typeof valueStyles];
                console.log(valueStyle)
                return {
                    core_value_id: v.core_value_id,
                    name: v.name,
                    short_description: v.short_description,
                    description: v.description,
                    bgColor: valueStyle.bgColor,
                    bgColorSecondary: valueStyle.bgColorSecondary,
                    borderColor: valueStyle.borderColor,
                    color: valueStyle.color,
                    iconColor: valueStyle.iconColor,
                    shadowColor: valueStyle.shadowColor,
                    icon: valueStyle.icon,
                    iconBgColor: valueStyle.iconBgColor
                }
            });
            console.log(coreValues.data)
            setValues(coreValues.data);
            setValueOptions(vo);
        } catch (error) {
            console.error("Error fetching coreValues:", error);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                await fetchValues();
            } catch (error) {
                setModalData({
                    open: true,
                    title: "Error",
                    message: "Error al cargar la información del formulario",
                    icon: "error",
                });
            } finally {
                setLoading(false);
            }
        })()
    }, []);

    const backToStart = () => {

        setRecognitionForm({ ...initialRecognitionForm });
        setMessagePlaceholder("");
        window.scrollTo({
            top: document.getElementById("value-select")?.offsetTop,
            behavior: "smooth",
        });
        setModalData({ ...modalData, open: false });
    };

    return {
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
    }
}