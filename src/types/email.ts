import type { RecognitionRequest } from "./recognition";

export interface EmailSendingRequest extends RecognitionRequest {
    recognition_id: number;
}