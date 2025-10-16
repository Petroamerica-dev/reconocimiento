import type { User } from "@/types/data";
import { api } from "../client";

const apiUser = {
    getAll: async () => await api.get<User[]>('/users'),
    search: async (searchTerm: string, currentPage: number, pageSize: number) =>
        await api.get<User[]>('/search-user', {
            params: {
                searchTerm,
                currentPage,
                pageSize
            }
        }),
    getUserById: async (userId: string) => await api.get<User>('/users/' + userId),
};

export default apiUser;
