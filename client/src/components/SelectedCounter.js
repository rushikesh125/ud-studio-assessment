'use client';
import { useSelector } from 'react-redux';
import { Badge } from './ui/badge';

export function SelectedCounter() {
  const selected = useSelector((state) => state.search.selected);

  if (selected.size === 0) return null;

  return (
    <div className="mt-4">
      <Badge variant="secondary" className="text-lg px-4 py-2">
        Selected: {selected.size} images
      </Badge>
    </div>
  );
}