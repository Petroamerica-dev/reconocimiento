import type { ValueType } from "./global";

export interface User {
    userId: number;
    email: string;
    name: string;
    bossId: number;
}

export interface Value {
    valueId: number;
    name: ValueType;
    shortDescription: string;
    description: string;
}

export interface Behavior {
    behaviorId: number;
    valueId: number;
    description: string;
    suggestionText: string;
    whenApplied: string;
}

export interface Recognition {
    recognitionId: number;
    senderId: number;
    receiverId: number;
    behaviorId: number;
    message: string;
    recognitionDate: string;
    emailStatus: string;
}

export interface ValueResponse extends Value {
    behaviors: Behavior[];
}