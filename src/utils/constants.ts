import type { SelectOption, ValueStyle, ValueType } from "@/types/global";
import { Award, Users, Zap } from "lucide-react";

export const employees: SelectOption[] = [
    { id: 1, label: 'Juan Pérez', value: 'Juan Pérez' },
    { id: 2, label: 'María González', value: 'María González' },
    { id: 3, label: 'Carlos Rodríguez', value: 'Carlos Rodríguez' },
    { id: 4, label: 'Ana Martínez', value: 'Ana Martínez' },
    { id: 5, label: 'Luis Torres', value: 'Luis Torres' }
];

export const valueStyles: Record<ValueType, ValueStyle> = {
    "LIDERAZGO": {
        icon: Award,
        bgColor: 'bg-blue-50',
        color: 'text-white',
        iconColor: 'text-blue-400',
        borderColor: 'border-blue-300',
        shadowColor: "shadow-blue-800/25",
        bgGradient: "bg-gradient-to-r from-blue-500 to-blue-700"
    },
    "EFICIENCIA": {
        icon: Zap,
        bgColor: 'bg-yellow-50',
        color: 'text-white',
        iconColor: 'text-yellow-400',
        borderColor: 'border-yellow-300',
        shadowColor: "shadow-yellow-500/25",
        bgGradient: "bg-gradient-to-r from-yellow-300 to-orange-300"
    },
    "TRABAJO EN EQUIPO": {
        icon: Users,
        bgColor: 'bg-green-50',
        color: 'text-white',
        iconColor: 'text-green-400',
        borderColor: 'border-green-300',
        shadowColor: "shadow-green-500/25",
        bgGradient: "bg-gradient-to-r from-green-500 to-lime-500"
    }
};
