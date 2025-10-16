import type { ValueResponse } from "@/types/data";
import { api } from "../client";

const apiValue = {
    getAll: () => api.get<ValueResponse[]>('/values'),
};

export default apiValue;