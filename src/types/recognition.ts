import type { LucideIcon } from "lucide-react";

interface BehaviorOption {
    description: string;
    suggestionText: string
}

export interface RecognitionType {
    title: string;
    icon: LucideIcon;
    bgColor: string;
    color: string;
    borderColor: string;
    behaviors: BehaviorOption[];
    shortDescription: string;
}