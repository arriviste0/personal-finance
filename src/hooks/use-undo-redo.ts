import { useState, useCallback, useRef } from 'react';

export interface UndoRedoState<T> {
  past: T[];
  present: T;
  future: T[];
}

export interface UndoRedoActions<T> {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  pushState: (newState: T) => void;
  clearHistory: () => void;
}

export function useUndoRedo<T>(initialState: T, maxHistorySize: number = 50): [T, UndoRedoActions<T>] {
  const [state, setState] = useState<UndoRedoState<T>>({
    past: [],
    present: initialState,
    future: [],
  });

  const isUpdating = useRef(false);

  const pushState = useCallback((newState: T) => {
    if (isUpdating.current) return;
    
    setState(currentState => {
      const newPast = [...currentState.past, currentState.present];
      if (newPast.length > maxHistorySize) {
        newPast.shift();
      }
      
      return {
        past: newPast,
        present: newState,
        future: [],
      };
    });
  }, [maxHistorySize]);

  const undo = useCallback(() => {
    setState(currentState => {
      if (currentState.past.length === 0) return currentState;
      
      const previous = currentState.past[currentState.past.length - 1];
      const newPast = currentState.past.slice(0, -1);
      
      return {
        past: newPast,
        present: previous,
        future: [currentState.present, ...currentState.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState(currentState => {
      if (currentState.future.length === 0) return currentState;
      
      const next = currentState.future[0];
      const newFuture = currentState.future.slice(1);
      
      return {
        past: [...currentState.past, currentState.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const clearHistory = useCallback(() => {
    setState(currentState => ({
      past: [],
      present: currentState.present,
      future: [],
    }));
  }, []);

  const actions: UndoRedoActions<T> = {
    undo,
    redo,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    pushState,
    clearHistory,
  };

  return [state.present, actions];
}

// Hook for managing undo/redo with mutations
export function useUndoRedoWithMutation<T>(
  initialState: T,
  mutationFn: (data: T) => Promise<any>,
  onSuccess?: () => void,
  onError?: (error: Error) => void,
  maxHistorySize: number = 50
) {
  const [state, undoRedoActions] = useUndoRedo(initialState, maxHistorySize);
  const [isMutating, setIsMutating] = useState(false);

  const saveState = useCallback(async (newState: T) => {
    setIsMutating(true);
    try {
      await mutationFn(newState);
      undoRedoActions.pushState(newState);
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsMutating(false);
    }
  }, [mutationFn, undoRedoActions, onSuccess, onError]);

  return {
    state,
    undoRedoActions,
    saveState,
    isMutating,
  };
} 