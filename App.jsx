
import { useState, useMemo, useCallback } from 'react';
import { useSupabaseSnippets } from './hooks/useSupabaseSnippets';
import Header from './components/Header';
import SnippetList from './components/SnippetList';
import SnippetForm from './components/SnippetForm';
import TagFilter from './components/TagFilter';
import Toast from './components/Toast';

const App = () => {
  const { 
    snippets, 
    loading, 
    error, 
    addSnippet, 
    updateSnippet, 
    deleteSnippet 
  } = useSupabaseSnippets();
  
  const [activeTags, setActiveTags] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const showToast = (message) => {
    setToast({ id: Date.now(), message });
  };

  const allTags = useMemo(() => {
    const tags = new Set();
    snippets.forEach(snippet => {
      snippet.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [snippets]);

  const toggleTag = useCallback((tag) => {
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

  const handleEditSnippet = (snippet) => {
    setEditingSnippet(snippet);
    setIsFormOpen(true);
  };

  const handleDeleteSnippet = useCallback(async (id) => {
    try {
      await deleteSnippet(id);
      showToast('Snippet deleted successfully!');
    } catch (error) {
      showToast('Error deleting snippet!');
    }
  }, [deleteSnippet]);

  const handleSaveSnippet = async (snippet) => {
    try {
      if (editingSnippet) {
        // Edit
        await updateSnippet(editingSnippet.id, snippet);
        showToast('Snippet updated successfully!');
      } else {
        // Add
        await addSnippet(snippet);
        showToast('Snippet added successfully!');
      }
      setIsFormOpen(false);
      setEditingSnippet(null);
    } catch (error) {
      showToast('Error saving snippet!');
    }
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
