import type { LucideIcon } from "lucide-react";
import type { Value } from "./data";

export interface SelectOption {
    id: number;
    label: string;
    value: string;
    sublabel?: string;
    tooltip?: string
}

export type ValueType = "EFICIENCIA" | "LIDERAZGO" | "TRABAJO EN EQUIPO"

export interface ValueStyle {
    icon: LucideIcon;
    bgColor: string;
    color: string;
    iconColor: string;
    iconBgColor: string;
    borderColor: string;
    shadowColor: string;
    bgColorSecondary: string;
}

export type ValueOption = Value & ValueStyle