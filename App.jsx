
import { useState, useMemo, useCallback } from 'react';
import { useConvexSnippets } from './hooks/useConvexSnippets';
import { useAuth } from './hooks/useAuth';
import Header from './components/Header';
import SnippetList from './components/SnippetList';
import SnippetForm from './components/SnippetForm';
import TagFilter from './components/TagFilter';
import Toast from './components/Toast';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  const { isAuthenticated, team, loading: authLoading, joinTeam, createTeam, logout } = useAuth();
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  
  const { 
    snippets, 
    loading, 
    error, 
    addSnippet, 
    updateSnippet, 
    deleteSnippet 
  } = useConvexSnippets(team?.id); // Pass team ID to filter snippets by team
  
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
        await updateSnippet(editingSnippet._id, snippet);
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

  const handleLoginSuccess = async () => {
    // The Login component handles the team join internally
    // We just need to show a success message
    showToast('Welcome to your team!');
  };

  const handleSignupSuccess = async () => {
    // The Signup component handles the team creation internally
    // We just need to show a success message
    showToast('Team created successfully!');
  };

  const handleLogout = () => {
    logout();
    showToast('Left team successfully!');
  };

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <svg className="animate-spin h-8 w-8 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show authentication screens if not logged in
  if (!isAuthenticated) {
    if (authMode === 'login') {
      return (
        <>
          <Login 
            onLoginSuccess={handleLoginSuccess}
            onSwitchToSignup={() => setAuthMode('signup')}
          />
          <Toast toast={toast} onDismiss={() => setToast(null)} />
        </>
      );
    } else {
      return (
        <>
          <Signup 
            onSignupSuccess={handleSignupSuccess}
            onSwitchToLogin={() => setAuthMode('login')}
          />
          <Toast toast={toast} onDismiss={() => setToast(null)} />
        </>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-200">
      <Header 
        onAddSnippet={handleAddSnippet} 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm}
        team={team}
        onLogout={handleLogout}
      />
      
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
