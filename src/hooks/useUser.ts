import apiUser from "@/services/api/user";
import type { User } from "@/types/data";
import type { SelectOption } from "@/types/global";
import { useCallback, useState, useEffect, useRef } from "react";

export const useUser = () => {
    const [loading, setLoading] = useState(false);
    const [userOptions, setUserOptions] = useState<SelectOption[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    const debounceTimerRef = useRef<any | null>(null);

    const searchUsers = useCallback((searchTerm: string, delay: number = 500) => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        if (!searchTerm.trim()) {
            setUsers([]);
            setUserOptions([]);
            setLoading(false);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);

        debounceTimerRef.current = setTimeout(async () => {
            try {
                const users = await apiUser.search(searchTerm, 1, 10);
                setUsers(users.data);
                setUserOptions(users.data.map((user) => ({
                    id: user.userId,
                    label: user.name,
                    sublabel: user.email,
                    value: user.userId.toString(),
                })));
            } catch (error) {
                setError("Error fetching users");
                setUsers([]);
                setUserOptions([]);
            } finally {
                setLoading(false);
            }
        }, delay);
    }, []);

    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    return {
        loading,
        userOptions,
        users,
        error,
        searchUsers
    };
};