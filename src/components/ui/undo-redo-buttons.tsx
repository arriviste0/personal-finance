import React from 'react';
import { Button } from '@/components/ui/button';
import { Undo, Redo } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UndoRedoButtonsProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'outline' | 'ghost' | 'secondary';
}

export function UndoRedoButtons({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  className,
  size = 'default',
  variant = 'outline'
}: UndoRedoButtonsProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Button
        variant={variant}
        size={size}
        onClick={onUndo}
        disabled={!canUndo}
        className="retro-button"
        title="Undo (Ctrl+Z)"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        variant={variant}
        size={size}
        onClick={onRedo}
        disabled={!canRedo}
        className="retro-button"
        title="Redo (Ctrl+Y)"
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  );
} 