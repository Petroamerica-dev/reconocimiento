import type { CoreValueResponse } from "@/types/data";
import { api } from "../client";

const apiCoreValue = {
    getAll: () => api.get<CoreValueResponse[]>('/core-values'),
};

export default apiCoreValue;