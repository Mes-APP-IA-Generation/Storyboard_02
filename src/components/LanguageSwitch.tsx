import React from 'react';
import { Languages } from 'lucide-react';

interface LanguageSwitchProps {
  currentLang: string;
  onSwitch: (lang: string) => void;
}

export function LanguageSwitch({ currentLang, onSwitch }: LanguageSwitchProps) {
  return (
    <button
      onClick={() => onSwitch(currentLang === 'en' ? 'fr' : 'en')}
      className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Languages className="w-4 h-4 mr-2" />
      {currentLang.toUpperCase()}
    </button>
  );
}