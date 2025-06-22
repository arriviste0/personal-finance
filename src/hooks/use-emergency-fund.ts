
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { EmergencyFundSchema, EmergencyFundTransactionSchema } from '@/lib/db-schemas';

const API_BASE_URL = '/api/emergency-fund';

// --- Fetch Functions ---
const fetchEmergencyFund = async (): Promise<EmergencyFundSchema> => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch emergency fund data');
    return response.json();
};

const fetchEmergencyFundTransactions = async (): Promise<EmergencyFundTransactionSchema[]> => {
    const response = await fetch(`${API_BASE_URL}/transactions`);
    if (!response.ok) throw new Error('Failed to fetch emergency fund transactions');
    return response.json();
};

// --- Mutation Functions ---
const updateEmergencyFund = async (data: { targetAmount: number }): Promise<EmergencyFundSchema> => {
    const response = await fetch(API_BASE_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update fund');
    }
    return response.json();
};

type AddTransactionPayload = {
    amount: number;
    type: 'deposit' | 'withdrawal';
    notes?: string;
};

const addEmergencyFundTransaction = async (payload: AddTransactionPayload): Promise<EmergencyFundTransactionSchema> => {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Transaction failed');
    }
    return response.json();
};

// --- Custom Hooks ---
export function useEmergencyFund() {
    return useQuery<EmergencyFundSchema, Error>({
        queryKey: ['emergencyFund'],
        queryFn: fetchEmergencyFund,
    });
}

export function useEmergencyFundTransactions() {
    return useQuery<EmergencyFundTransactionSchema[], Error>({
        queryKey: ['emergencyFundTransactions'],
        queryFn: fetchEmergencyFundTransactions,
    });
}

export function useUpdateEmergencyFund() {
    const queryClient = useQueryClient();
    return useMutation<EmergencyFundSchema, Error, { targetAmount: number }>({
        mutationFn: updateEmergencyFund,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['emergencyFund'] });
        },
    });
}

export function useAddEmergencyFundTransaction() {
    const queryClient = useQueryClient();
    return useMutation<EmergencyFundTransactionSchema, Error, AddTransactionPayload>({
        mutationFn: addEmergencyFundTransaction,
        onSuccess: () => {
            // Invalidate both the fund details and transaction list
            queryClient.invalidateQueries({ queryKey: ['emergencyFund'] });
            queryClient.invalidateQueries({ queryKey: ['emergencyFundTransactions'] });
        },
    });
}
