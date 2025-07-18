import React from 'react';
import { Snippet } from '../types';
import SnippetItem from './SnippetItem';

interface SnippetListProps {
  snippets: Snippet[];
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: string) => void;
  showToast: (message: string) => void;
}

const SnippetList: React.FC<SnippetListProps> = ({ snippets, onEdit, onDelete, showToast }) => {
  if (snippets.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-500">No Snippets Found</h2>
        <p className="text-gray-600 mt-2">Try adjusting your filters or adding a new snippet!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {snippets.map(snippet => (
        <SnippetItem
          key={snippet.id}
          snippet={snippet}
          onEdit={onEdit}
          onDelete={onDelete}
          showToast={showToast}
        />
      ))}
    </div>
  );
};

export default SnippetList;
