export interface SearchUser {
    user_id: number;
    name: string;
    email: string;
    area_name?: string;
    boss_name?: string;
}

export interface CoreValue {
    core_value_id: number;
    name: string;
    short_description: string;
    description: string;
}

export interface Behavior {
    behavior_id: number;
    core_value_id: number;
    description: string;
    suggestion_text: string;
    when_applied: string;
    is_deleted: boolean;
    created_at: Date;
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

export interface CoreValueResponse extends CoreValue {
    behaviors: Behavior[];
}