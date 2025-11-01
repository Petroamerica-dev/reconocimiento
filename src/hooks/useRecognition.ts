// import { useAuth } from "@/context/AuthProvider";
// import apiRecognition from "@/services/api/recognition";
// import apiUser from "@/services/api/user";
import apiValue from "@/services/api/value";
import type { Behavior, ValueResponse } from "@/types/data";
import type { SelectOption, ValueOption } from "@/types/global";
import type { RecognitionForm, } from "@/types/recognition";
import { valueStyles } from "@/utils/constants";
import { useEffect, useState } from "react";

const initialRecognitionForm = {
    employee: null,
    value: null,
    behavior: null,
    message: "",
}

export const useRecognition = () => {
    // const { user } = useAuth()
    const [loading, setLoading] = useState(true);

    const [recognitionForm, setRecognitionForm] = useState<RecognitionForm>({ ...initialRecognitionForm });

    const [values, setValues] = useState<ValueResponse[]>([]);
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

            // const recognitionRequest: RecognitionRequest = {
            //     senderId: Number(user?.userId),
            //     receiverId: Number(recognitionForm.employee.id),
            //     behaviorId: Number(recognitionForm.behavior.id),
            //     message: recognitionForm.message,
            // };

            // const response = await apiRecognition.create(recognitionRequest);

            // const dataResponse = response.data;

            // if (!dataResponse.success) {
            //     throw new Error(dataResponse.error || "Error al crear reconocimiento");
            // }

            // const recognitionResponse = dataResponse.recognition;

            // if (!recognitionResponse) {
            //     throw new Error("Error al crear reconocimiento");
            // }

            // const boss = await apiUser.getUserById(user?.bossId.toString() || "");

            // const emailResponse = await apiRecognition.sendEmail({
            //     recognitionId: recognitionResponse.recognitionId,
            //     to: recognitionForm.employee.label,
            //     copy: boss?.data?.email,
            //     recognition: recognitionResponse.message,
            //     comentary: recognitionForm.message,
            // });

            // if (emailResponse.data.success) {
            setModalData({
                open: true,
                title: "¡Reconocimiento Enviado!",
                message: `Has valorado el esfuerzo de un colaborador. Gracias por fortalecer la cultura en Petroamérica`,
                icon: "success",
            });

            // } else {
            //     throw new Error("Error al enviar correo electrónico");
            // }
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
                const vf = values.find(v => v.valueId === Number((value as SelectOption)?.id));
                if (vf) {
                    setBehaviorOptions(vf.behaviors.map(b => ({
                        id: b.behaviorId,
                        label: b.description,
                        value: b.behaviorId.toString(),
                        tooltip: b.whenApplied
                    })));
                    setBehaviors(vf.behaviors);
                }
            } else {
                setBehaviorOptions([]);
                setBehaviors([]);
                setMessagePlaceholder("");
            }
        } else if (key === "behavior") {
            const bf = behaviors.find(b => b.behaviorId === Number((value as SelectOption)?.id));
            if (bf) {
                setMessagePlaceholder(bf.suggestionText);
            } else {
                setMessagePlaceholder("");
            }
        }
    };


    const fetchValues = async () => {
        try {
            const values = await apiValue.getAll();
            const vo = values.data.map(v => {
                const valueStyle = valueStyles[v.name];
                return {
                    valueId: v.valueId,
                    name: v.name,
                    shortDescription: v.shortDescription,
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
            console.log(values.data)
            setValues(values.data);
            setValueOptions(vo);
        } catch (error) {
            console.error("Error fetching values:", error);
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