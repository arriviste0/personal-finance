
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { SavingsGoalSchema } from '@/lib/db-schemas';

type GoalPayload = Omit<SavingsGoalSchema, '_id' | 'userId' | 'createdAt' | 'updatedAt' | 'currentAmount' | 'isComplete'>;

// --- API Fetch Functions ---
const fetchGoals = async (): Promise<SavingsGoalSchema[]> => {
    const response = await fetch('/api/savings-goals');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const addGoal = async (newGoal: GoalPayload): Promise<SavingsGoalSchema> => {
    const response = await fetch('/api/savings-goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoal),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add goal');
    }
    return response.json();
};

const updateGoal = async (goalData: SavingsGoalSchema): Promise<SavingsGoalSchema> => {
    const response = await fetch(`/api/savings-goals/${goalData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goalData),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update goal');
    }
    return response.json();
}

const deleteGoal = async (goalId: string): Promise<{ message: string }> => {
    const response = await fetch(`/api/savings-goals/${goalId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete goal');
    }
    return response.json();
}

type ModifyFundsPayload = {
    goalId: string;
    amount: number;
    type: 'deposit' | 'withdraw';
}

const modifyGoalFunds = async (payload: ModifyFundsPayload): Promise<SavingsGoalSchema> => {
    const response = await fetch(`/api/savings-goals/${payload.goalId}/funds`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to modify funds');
    }
    return response.json();
}

// --- React Query Hooks ---
export function useGoals() {
    return useQuery<SavingsGoalSchema[], Error>({
        queryKey: ['goals'],
        queryFn: fetchGoals,
    });
}

export function useAddGoal() {
    const queryClient = useQueryClient();
    return useMutation<SavingsGoalSchema, Error, GoalPayload>({
        mutationFn: addGoal,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['goals'] });
        },
    });
}

export function useUpdateGoal() {
    const queryClient = useQueryClient();
    return useMutation<SavingsGoalSchema, Error, SavingsGoalSchema>({
        mutationFn: updateGoal,
        onSuccess: (updatedGoal) => {
            queryClient.invalidateQueries({ queryKey: ['goals'] });
            queryClient.setQueryData(['goals', updatedGoal._id], updatedGoal);
        },
    });
}

export function useDeleteGoal() {
    const queryClient = useQueryClient();
    return useMutation<{ message: string }, Error, string>({
        mutationFn: deleteGoal,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['goals'] });
        },
    });
}

export function useModifyGoalFunds() {
    const queryClient = useQueryClient();
    return useMutation<SavingsGoalSchema, Error, ModifyFundsPayload>({
        mutationFn: modifyGoalFunds,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['goals'] });
            // Potentially invalidate wallet balance too
        },
    });
}
