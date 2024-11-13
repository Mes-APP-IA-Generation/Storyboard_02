import React, { useState } from 'react';
import { Trash2, Move, Clock, Camera, Pencil, Check } from 'lucide-react';
import type { Frame as FrameType } from '../types';
import { translations } from '../i18n/translations';
import { ImageInput } from './ImageInput';

interface FrameProps {
  frame: FrameType;
  onDelete: (id: string) => void;
  onUpdate: (id: string, frame: Partial<FrameType>) => void;
}

export function Frame({ frame, onDelete, onUpdate }: FrameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [titleDraft, setTitleDraft] = useState(frame.title);

  const handleTitleSubmit = () => {
    onUpdate(frame.id, { title: titleDraft });
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSubmit();
    } else if (e.key === 'Escape') {
      setTitleDraft(frame.title);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-4 frame-card">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 flex-1">
          <Move className="w-5 h-5 text-gray-400 cursor-move" />
          {isEditing ? (
            <div className="flex items-center gap-2 flex-1">
              <input
                type="text"
                value={titleDraft}
                onChange={(e) => setTitleDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-2 py-1 border rounded-md text-sm"
                autoFocus
              />
              <button
                onClick={handleTitleSubmit}
                className="text-green-500 hover:text-green-700 transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-1">
              <span className="text-sm font-medium text-gray-700 flex-1">
                {frame.title}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title={translations.rename}
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        <button
          onClick={() => onDelete(frame.id)}
          className="text-red-500 hover:text-red-700 transition-colors ml-2"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {frame.imageUrl ? (
        <div className="relative group">
          <img
            src={frame.imageUrl}
            alt="Storyboard frame"
            className="w-full h-48 object-cover rounded-md"
          />
          <button
            onClick={() => onUpdate(frame.id, { imageUrl: '' })}
            className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="w-full">
          <ImageInput
            onImageSelect={(imageUrl) => onUpdate(frame.id, { imageUrl })}
          />
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-gray-500" />
          <select
            value={frame.shotType}
            onChange={(e) => onUpdate(frame.id, { shotType: e.target.value })}
            className="flex-1 px-2 py-1 border rounded-md text-sm"
          >
            <option value="wide">{translations.shotType.wide}</option>
            <option value="medium">{translations.shotType.medium}</option>
            <option value="closeUp">{translations.shotType.closeUp}</option>
            <option value="pov">{translations.shotType.pov}</option>
            <option value="aerial">{translations.shotType.aerial}</option>
            <option value="custom">{translations.shotType.custom}</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={frame.duration}
            onChange={(e) => onUpdate(frame.id, { duration: e.target.value })}
            placeholder={translations.duration}
            className="flex-1 px-2 py-1 border rounded-md text-sm"
          />
        </div>

        <textarea
          value={frame.description}
          onChange={(e) => onUpdate(frame.id, { description: e.target.value })}
          placeholder={translations.description}
          className="w-full px-3 py-2 border rounded-md text-sm"
          rows={2}
        />

        <textarea
          value={frame.notes}
          onChange={(e) => onUpdate(frame.id, { notes: e.target.value })}
          placeholder={translations.notes}
          className="w-full px-3 py-2 border rounded-md text-sm bg-gray-50"
          rows={2}
        />
      </div>
    </div>
  );
}