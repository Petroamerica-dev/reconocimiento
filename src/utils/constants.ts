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
        bgColor: 'bg-[#65D0FA]',
        color: 'text-blue-50',
        iconColor: 'text-[#3CA1F0]',
        iconBgColor: 'bg-blue-50',
        borderColor: 'border-blue-500',
        shadowColor: "shadow-blue-800/25",
        bgColorSecondary: "bg-blue-500"
    },
    "EFICIENCIA": {
        icon: Zap,
        bgColor: 'bg-[#FAEFB1]',
        color: 'text-[#9C743C]',
        iconColor: 'text-[#FFD86D]',
        iconBgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-500',
        shadowColor: "shadow-yellow-500/25",
        bgColorSecondary: "bg-yellow-500"
    },
    "TRABAJO EN EQUIPO": {
        icon: Users,
        bgColor: 'bg-[#85E1DE]',
        color: 'text-white',
        iconColor: 'text-[#40C0B4]',
        iconBgColor: 'bg-green-50',
        borderColor: 'border-green-500',
        shadowColor: "shadow-green-500/25",
        bgColorSecondary: "bg-green-500"
    }
};
