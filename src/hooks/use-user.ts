
import { useQuery } from '@tanstack/react-query';
import type { UserSchema } from '@/lib/db-schemas';

// --- Fetch Function ---
const fetchUser = async (): Promise<UserSchema> => {
    const response = await fetch('/api/user');
    if (!response.ok) {
        // If the user is not logged in, the API returns 401, which is expected.
        // We can return null or an empty object to signify no user.
        if (response.status === 401) {
            return null as any; 
        }
        throw new Error('Failed to fetch user data');
    }
    return response.json();
};

// --- Custom Hook ---
export function useUser() {
    return useQuery<UserSchema | null, Error>({
        queryKey: ['user'],
        queryFn: fetchUser,
        staleTime: 1000 * 60 * 5, // Cache user data for 5 minutes
        retry: 1, // Don't retry endlessly on 401s
    });
}
