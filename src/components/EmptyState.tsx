import React from 'react';
import { Film, Plus } from 'lucide-react';
import { translations } from '../i18n/translations';

interface EmptyStateProps {
  onAddFrame: () => void;
}

export function EmptyState({ onAddFrame }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <Film className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">{translations.noFrames}</h3>
      <p className="mt-1 text-sm text-gray-500">{translations.getStarted}</p>
      <div className="mt-6">
        <button
          onClick={onAddFrame}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          {translations.addFrame}
        </button>
      </div>
    </div>
  );
}