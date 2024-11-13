import React, { useState, useRef } from 'react';
import { Link, Upload } from 'lucide-react';
import { translations } from '../i18n/translations';

interface ImageInputProps {
  onImageSelect: (imageUrl: string) => void;
}

export function ImageInput({ onImageSelect }: ImageInputProps) {
  const [isUrlMode, setIsUrlMode] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onImageSelect(imageUrl);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      onImageSelect(imageUrl);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsUrlMode(!isUrlMode)}
        className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
        title={translations.imageInput.switch}
      >
        {isUrlMode ? <Upload size={16} /> : <Link size={16} />}
      </button>

      {isUrlMode ? (
        <input
          type="text"
          placeholder={translations.imageInput.placeholder}
          className="w-full px-3 py-2 border rounded-md"
          onChange={(e) => onImageSelect(e.target.value)}
        />
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="w-full h-48 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors"
        >
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">{translations.imageInput.upload}</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}