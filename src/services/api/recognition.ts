import type { Recognition } from "@/types/data";
import { api } from "../client";
import type { RecognitionEmailRequest, RecognitionRequest } from "@/types/recognition";

const apiRecognition = {
    create: async (recognition: RecognitionRequest) => await api.post<{ error?: string, recognition: Recognition, success: boolean }>('/recognition', recognition),
    sendEmail: async (recognitionRequest: RecognitionEmailRequest) =>
        await api.post<{ success: boolean }>('/send-email', recognitionRequest),
};

export default apiRecognition;
