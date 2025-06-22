
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { InvestmentSchema } from '@/lib/db-schemas';

type InvestmentPayload = Omit<InvestmentSchema, '_id' | 'userId' | 'createdAt' | 'updatedAt'>;

const API_BASE_URL = '/api/investments';

// --- Fetch Functions ---
const fetchInvestments = async (): Promise<InvestmentSchema[]> => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch investments');
    return response.json();
};

// --- Mutation Functions ---
const addInvestment = async (newInvestment: InvestmentPayload): Promise<InvestmentSchema> => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInvestment),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add investment');
    }
    return response.json();
};

const updateInvestment = async (investmentData: InvestmentSchema): Promise<InvestmentSchema> => {
    const response = await fetch(`${API_BASE_URL}/${investmentData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(investmentData),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update investment');
    }
    return response.json();
};

const deleteInvestment = async (investmentId: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/${investmentId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete investment');
    }
    return response.json();
};

// --- Custom Hooks ---
export function useInvestments() {
    return useQuery<InvestmentSchema[], Error>({
        queryKey: ['investments'],
        queryFn: fetchInvestments,
    });
}

export function useAddInvestment() {
    const queryClient = useQueryClient();
    return useMutation<InvestmentSchema, Error, InvestmentPayload>({
        mutationFn: addInvestment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['investments'] });
        },
    });
}

export function useUpdateInvestment() {
    const queryClient = useQueryClient();
    return useMutation<InvestmentSchema, Error, InvestmentSchema>({
        mutationFn: updateInvestment,
        onSuccess: (updatedInvestment) => {
            queryClient.invalidateQueries({ queryKey: ['investments'] });
            queryClient.setQueryData(['investments', updatedInvestment._id], updatedInvestment);
        },
    });
}

export function useDeleteInvestment() {
    const queryClient = useQueryClient();
    return useMutation<{ message: string }, Error, string>({
        mutationFn: deleteInvestment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['investments'] });
        },
    });
}
