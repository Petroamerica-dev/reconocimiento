import type { EmailSendingRequest } from "@/types/email"
import { api } from "../client"

const apiEmail = {
    sendRecognition: async (data: EmailSendingRequest) => {
        return await api.post<{ success: boolean }>('/emails', data)
    }
}

export default apiEmail