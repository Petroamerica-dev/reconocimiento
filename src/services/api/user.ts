import type { SearchUser } from "@/types/data";
import { api } from "../client";

const apiUser = {
    search: async (params: { searchTerm: string, currentPage: number, pageSize: number, excludeUserId: number }) =>
        await api.get<SearchUser[]>('/users/search', { params }),
};

export default apiUser;