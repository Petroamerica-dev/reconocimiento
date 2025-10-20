import type { LucideIcon } from "lucide-react";
import type { SelectOption } from "./global";

interface BehaviorOption {
    description: string;
    suggestionText: string;
    whenApplied: string;
}

export interface RecognitionType {
    id: number;
    title: string;
    icon: LucideIcon;
    iconColor: string;
    bgColor: string;
    color: string;
    bgColorSecondary: string,
    borderColor: string;
    behaviors: BehaviorOption[];
    shortDescription: string;
    description: string;
    shadowColor: string;
}


export interface RecognitionForm {
    employee: SelectOption | null,
    value: SelectOption | null,
    behavior: SelectOption | null,
    message: string,
}

export interface RecognitionEmailRequest {
    recognitionId: number;
    to: string;
    copy?: string;
    recognition: string;
    comentary: string;
}

export interface RecognitionRequest {
    senderId: number;
    receiverId: number;
    behaviorId: number;
    message: string;
}