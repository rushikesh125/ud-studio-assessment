// components/ImageGrid.js
'use client';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSelect } from '../store/searchSlice';
import { Checkbox } from './ui/checkbox';
import Image from 'next/image';
import { Check } from 'lucide-react';

export function ImageGrid() {
  const dispatch = useDispatch();
  const { images, selected, message } = useSelector((state) => state.search);

  if (images.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg">Start searching for images!</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-lg font-medium mb-4 text-gray-800">{message}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => {
          const isSelected = selected.has(img.id);

          return (
            <div
              key={img.id}
              className={`relative group cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ${
                isSelected ? 'ring-4 ring-blue-500 ring-offset-2' : ''
              }`}
              onClick={() => dispatch(toggleSelect(img.id))}
            >
              {/* Image - Using fixed dimensions since API values might be too large */}
              <Image
                src={img.url}
                alt={img.alt || 'Search result image'}
                width={300} // Fixed width - adjust as needed
                height={300} // Fixed height - adjust as needed
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                unoptimized // Add this if images are from external sources
              />

              {/* Selected Overlay - Using modern Tailwind v3+ syntax */}
              {isSelected && (
                <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                  <Check className="h-10 w-10 text-white" />
                </div>
              )}

              {/* Hover Overlay (only when NOT selected) */}
              {!isSelected && (
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all flex items-center justify-center">
                  <Checkbox
                    checked={false}
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 border-2 border-white"
                  />
                </div>
              )}

              {/* Always Visible Checkbox in Corner (when selected) */}
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <Checkbox
                    checked={true}
                    className="h-6 w-6 bg-blue-600 border-blue-600 text-white"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}