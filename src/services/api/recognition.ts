import { api } from "../client";
import type {  RecognitionRequest, RecognitionResponse } from "@/types/recognition";

const apiRecognition = {
    create: async (recognition: RecognitionRequest) => await api.post<RecognitionResponse>('/recognitions', recognition)
};

export default apiRecognition;
