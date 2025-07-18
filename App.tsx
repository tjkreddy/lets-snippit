
import React, { useState, useMemo, useCallback } from 'react';
import { Snippet, ToastMessage } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import SnippetList from './components/SnippetList';
import SnippetForm from './components/SnippetForm';
import TagFilter from './components/TagFilter';
import Toast from './components/Toast';
import { DUMMY_SNIPPETS } from './constants';

const App: React.FC = () => {
  const [snippets, setSnippets] = useLocalStorage<Snippet[]>('code-snippets', DUMMY_SNIPPETS);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);
  const [toast, setToast] = useState<ToastMessage>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const showToast = (message: string) => {
    setToast({ id: Date.now(), message });
  };

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    snippets.forEach(snippet => {
      snippet.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [snippets]);

  const toggleTag = useCallback((tag: string) => {
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }, []);

  const filteredSnippets = useMemo(() => {
    return snippets
      .filter(snippet => {
        const searchMatch =
          searchTerm === '' ||
          snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          snippet.code.toLowerCase().includes(searchTerm.toLowerCase());
        
        const tagsMatch =
          activeTags.length === 0 ||
          activeTags.every(tag => snippet.tags.includes(tag));
          
        return searchMatch && tagsMatch;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [snippets, activeTags, searchTerm]);

  const handleAddSnippet = () => {
    setEditingSnippet(null);
    setIsFormOpen(true);
  };

  const handleEditSnippet = (snippet: Snippet) => {
    setEditingSnippet(snippet);
    setIsFormOpen(true);
  };

  const handleDeleteSnippet = useCallback((id: string) => {
    setSnippets(prev => prev.filter(s => s.id !== id));
    showToast('Snippet deleted successfully!');
  }, [setSnippets]);

  const handleSaveSnippet = (snippet: Omit<Snippet, 'id' | 'createdAt'>) => {
    if (editingSnippet) {
      // Edit
      setSnippets(prev =>
        prev.map(s =>
          s.id === editingSnippet.id ? { ...editingSnippet, ...snippet } : s
        )
      );
      showToast('Snippet updated successfully!');
    } else {
      // Add
      const newSnippet: Snippet = {
        ...snippet,
        id: `snippet-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setSnippets(prev => [newSnippet, ...prev]);
      showToast('Snippet added successfully!');
    }
    setIsFormOpen(false);
    setEditingSnippet(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-200">
      <Header onAddSnippet={handleAddSnippet} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <main className="container mx-auto px-4 py-8">
        <TagFilter
          tags={allTags}
          activeTags={activeTags}
          onToggleTag={toggleTag}
          onClearFilters={() => setActiveTags([])}
        />
        <SnippetList
          snippets={filteredSnippets}
          onEdit={handleEditSnippet}
          onDelete={handleDeleteSnippet}
          showToast={showToast}
        />
      </main>

      {isFormOpen && (
        <SnippetForm
          snippet={editingSnippet}
          onSave={handleSaveSnippet}
          onClose={() => setIsFormOpen(false)}
        />
      )}
      
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
};

export default App;
