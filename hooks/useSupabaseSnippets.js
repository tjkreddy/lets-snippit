import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useSupabaseSnippets() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all snippets
  const fetchSnippets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('snippets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSnippets(data || []);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching snippets:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new snippet
  const addSnippet = async (snippet) => {
    try {
      const { data, error } = await supabase
        .from('snippets')
        .insert([{
          title: snippet.title,
          description: snippet.description,
          code: snippet.code,
          tags: snippet.tags,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      setSnippets(prev => [data, ...prev]);
      return data;
    } catch (error) {
      setError(error.message);
      console.error('Error adding snippet:', error);
      throw error;
    }
  };

  // Update an existing snippet
  const updateSnippet = async (id, snippet) => {
    try {
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
      return data;
    } catch (error) {
      setError(error.message);
      console.error('Error updating snippet:', error);
      throw error;
    }
  };

  // Delete a snippet
  const deleteSnippet = async (id) => {
    try {
      const { error } = await supabase
        .from('snippets')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSnippets(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      setError(error.message);
      console.error('Error deleting snippet:', error);
      throw error;
    }
  };

  // Subscribe to real-time changes
  useEffect(() => {
    fetchSnippets();

    const subscription = supabase
      .channel('snippets_channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'snippets' },
        (payload) => {
          console.log('Real-time change:', payload);
          // Refetch data on any change
          fetchSnippets();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
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
