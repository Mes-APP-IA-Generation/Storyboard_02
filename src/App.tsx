import React, { useState } from 'react';
import { Plus, Film, Download } from 'lucide-react';
import { Frame } from './components/Frame';
import { EmptyState } from './components/EmptyState';
import { translations } from './i18n/translations';
import type { Frame as FrameType } from './types';

function App() {
  const [frames, setFrames] = useState<FrameType[]>([]);

  const addFrame = () => {
    const newFrame: FrameType = {
      id: crypto.randomUUID(),
      title: `${translations.defaultFrameTitle} ${frames.length + 1}`,
      shotType: 'wide',
      description: '',
      duration: '',
      cameraMovement: '',
      notes: '',
    };
    setFrames([...frames, newFrame]);
  };

  const deleteFrame = (id: string) => {
    setFrames(frames.filter(frame => frame.id !== id));
  };

  const updateFrame = (id: string, updates: Partial<FrameType>) => {
    setFrames(frames.map(frame => 
      frame.id === id ? { ...frame, ...updates } : frame
    ));
  };

  const exportStoryboard = () => {
    const data = JSON.stringify(frames, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'storyboard.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Film className="w-6 h-6 text-indigo-600" />
              <h1 className="text-xl font-semibold text-gray-900">{translations.title}</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportStoryboard}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Download className="w-4 h-4 mr-2" />
                {translations.export}
              </button>
              <button
                onClick={addFrame}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                {translations.addFrame}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {frames.length === 0 ? (
          <EmptyState onAddFrame={addFrame} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frames.map(frame => (
              <Frame
                key={frame.id}
                frame={frame}
                onDelete={deleteFrame}
                onUpdate={updateFrame}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;