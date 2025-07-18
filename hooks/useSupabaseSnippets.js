import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Dummy snippets for fallback
const DUMMY_SNIPPETS = [
  {
    id: '1',
    title: 'Hello World JavaScript',
    description: 'Basic JavaScript hello world',
    code: 'console.log("Hello, World!");',
    tags: ['javascript', 'basic'],
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Python List Comprehension',
    description: 'Create a list with even numbers',
    code: 'even_numbers = [x for x in range(10) if x % 2 == 0]',
    tags: ['python', 'list-comprehension'],
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'CSS Flexbox Center',
    description: 'Center an element with flexbox',
    code: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}',
    tags: ['css', 'flexbox'],
    created_at: new Date().toISOString()
  }
];

export function useSupabaseSnippets() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useLocalStorage, setUseLocalStorage] = useState(false);

  // Check if Supabase is properly configured
  const isSupabaseConfigured = () => {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    return url && key && !url.includes('placeholder') && !key.includes('placeholder');
  };

  // Local storage functions
  const getLocalStorageSnippets = () => {
    try {
      const stored = localStorage.getItem('code-snippets');
      return stored ? JSON.parse(stored) : DUMMY_SNIPPETS;
    } catch {
      return DUMMY_SNIPPETS;
    }
  };

  const setLocalStorageSnippets = (newSnippets) => {
    try {
      localStorage.setItem('code-snippets', JSON.stringify(newSnippets));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // Fetch all snippets
  const fetchSnippets = async () => {
    try {
      setLoading(true);
      
      if (!isSupabaseConfigured() || useLocalStorage) {
        // Use localStorage fallback
        const localSnippets = getLocalStorageSnippets();
        setSnippets(localSnippets);
        if (!isSupabaseConfigured()) {
          setError('Configure Supabase for cloud sync');
        }
      } else {
        // Use Supabase
        const { data, error } = await supabase
          .from('snippets')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setSnippets(data || []);
      }
    } catch (error) {
      console.error('Error fetching snippets:', error);
      // Fallback to localStorage if Supabase fails
      setUseLocalStorage(true);
      const localSnippets = getLocalStorageSnippets();
      setSnippets(localSnippets);
      setError('Using offline mode - Connect to Supabase for cloud sync');
    } finally {
      setLoading(false);
    }
  };

  // Add a new snippet
  const addSnippet = async (snippet) => {
    try {
      const newSnippet = {
        title: snippet.title,
        description: snippet.description,
        code: snippet.code,
        tags: snippet.tags,
        created_at: new Date().toISOString()
      };

      if (!isSupabaseConfigured() || useLocalStorage) {
        // Use localStorage
        const fullSnippet = { ...newSnippet, id: `snippet-${Date.now()}` };
        const updatedSnippets = [fullSnippet, ...snippets];
        setSnippets(updatedSnippets);
        setLocalStorageSnippets(updatedSnippets);
        return fullSnippet;
      } else {
        // Use Supabase
        const { data, error } = await supabase
          .from('snippets')
          .insert([newSnippet])
          .select()
          .single();

        if (error) throw error;
        setSnippets(prev => [data, ...prev]);
        return data;
      }
    } catch (error) {
      console.error('Error adding snippet:', error);
      throw error;
    }
  };

  // Update an existing snippet
  const updateSnippet = async (id, snippet) => {
    try {
      if (!isSupabaseConfigured() || useLocalStorage) {
        // Use localStorage
        const updatedSnippets = snippets.map(s =>
          s.id === id 
            ? { ...s, ...snippet, updated_at: new Date().toISOString() }
            : s
        );
        setSnippets(updatedSnippets);
        setLocalStorageSnippets(updatedSnippets);
      } else {
        // Use Supabase
        const { data, error } = await supabase
          .from('snippets')
          .update({
            title: snippet.title,
            description: snippet.description,
            code: snippet.code,
            tags: snippet.tags,
            updated_at: new Date().toISOString()
          })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        setSnippets(prev => prev.map(s => s.id === id ? data : s));
      }
    } catch (error) {
      console.error('Error updating snippet:', error);
      throw error;
    }
  };

  // Delete a snippet
  const deleteSnippet = async (id) => {
    try {
      if (!isSupabaseConfigured() || useLocalStorage) {
        // Use localStorage
        const updatedSnippets = snippets.filter(s => s.id !== id);
        setSnippets(updatedSnippets);
        setLocalStorageSnippets(updatedSnippets);
      } else {
        // Use Supabase
        const { error } = await supabase
          .from('snippets')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setSnippets(prev => prev.filter(s => s.id !== id));
      }
    } catch (error) {
      console.error('Error deleting snippet:', error);
      throw error;
    }
  };

  // Initialize
  useEffect(() => {
    fetchSnippets();
  }, []);

  return {
    snippets,
    loading,
    error,
    addSnippet,
    updateSnippet,
    deleteSnippet,
    refetch: fetchSnippets
  };
}
