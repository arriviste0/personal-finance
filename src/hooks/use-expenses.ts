
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { TransactionSchema } from '@/lib/db-schemas';

type ExpensePayload = Omit<TransactionSchema, '_id' | 'userId' | 'createdAt' | 'updatedAt'>;
type UpdateExpensePayload = Partial<ExpensePayload> & { _id: any };

const API_BASE_URL = '/api/expenses';

// Fetch Functions
const fetchExpenses = async (): Promise<TransactionSchema[]> => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch expenses');
    return response.json();
};

// Mutation Functions
const addExpense = async (newExpense: ExpensePayload): Promise<TransactionSchema> => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExpense),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add expense');
    }
    return response.json();
};

const updateExpense = async (expenseData: UpdateExpensePayload): Promise<TransactionSchema> => {
    const response = await fetch(`${API_BASE_URL}/${expenseData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update expense');
    }
    return response.json();
};

const deleteExpense = async (expenseId: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/${expenseId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete expense');
    }
    return response.json();
};

// Custom Hooks
export function useExpenses() {
    return useQuery<TransactionSchema[], Error>({
        queryKey: ['expenses'],
        queryFn: fetchExpenses,
    });
}

export function useAddExpense() {
    const queryClient = useQueryClient();
    return useMutation<TransactionSchema, Error, ExpensePayload>({
        mutationFn: addExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
            // Also invalidate budget if they are linked
            // queryClient.invalidateQueries({ queryKey: ['budget'] }); 
        },
    });
}

export function useUpdateExpense() {
    const queryClient = useQueryClient();
    return useMutation<TransactionSchema, Error, UpdateExpensePayload>({
        mutationFn: updateExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
}

export function useDeleteExpense() {
    const queryClient = useQueryClient();
    return useMutation<{ message: string }, Error, string>({
        mutationFn: deleteExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
}
