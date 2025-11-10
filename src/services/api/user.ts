import type { SearchUser } from "@/types/data";
import { api } from "../client";

const apiUser = {
    search: async (searchTerm: string, currentPage: number, pageSize: number) =>
        await api.get<SearchUser[]>('/users/search', {
            params: {
                searchTerm,
                currentPage,
                pageSize
            }
        }),
};

export default apiUser;