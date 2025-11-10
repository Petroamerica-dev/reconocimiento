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
    recognition: string;
    comentary: string;
}

export interface RecognitionRequest {
    sender_id: number;
    receiver_id: number;
    behavior_id: number;
    message?: string;
}

export interface RecognitionResponse {
    success: boolean;
    message: string;
    data?: {
        recognition_id: number;
        sender_id: number;
        receiver_id: number;
        behavior_id: 10;
        message: string;
        status: string,
    }
}