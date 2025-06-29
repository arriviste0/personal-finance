import { useEffect } from 'react';

interface KeyboardShortcutsProps {
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export function useKeyboardShortcuts({
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false
}: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if user is typing in an input field
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
        return;
      }

      // Ctrl+Z for Undo
      if (event.ctrlKey && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        if (canUndo && onUndo) {
          onUndo();
        }
      }

      // Ctrl+Y or Ctrl+Shift+Z for Redo
      if ((event.ctrlKey && event.key === 'y') || (event.ctrlKey && event.shiftKey && event.key === 'Z')) {
        event.preventDefault();
        if (canRedo && onRedo) {
          onRedo();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onUndo, onRedo, canUndo, canRedo]);
} 