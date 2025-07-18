import { useState } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export function useConvexSnippets() {
  const [error, setError] = useState(null);
  
  // Convex queries and mutations
  const snippets = useQuery(api.snippets.getSnippets);
  const addSnippetMutation = useMutation(api.snippets.addSnippet);
  const updateSnippetMutation = useMutation(api.snippets.updateSnippet);
  const deleteSnippetMutation = useMutation(api.snippets.deleteSnippet);

  const loading = snippets === undefined;

  const addSnippet = async (snippet) => {
    try {
      const id = await addSnippetMutation({
        title: snippet.title,
        description: snippet.description || "",
        code: snippet.code,
        tags: snippet.tags,
      });
      return { _id: id, ...snippet, createdAt: Date.now() };
    } catch (error) {
      console.error('Error adding snippet:', error);
      setError('Failed to add snippet');
      throw error;
    }
  };

  const updateSnippet = async (id, snippet) => {
    try {
      await updateSnippetMutation({
        id,
        title: snippet.title,
        description: snippet.description || "",
        code: snippet.code,
        tags: snippet.tags,
      });
    } catch (error) {
      console.error('Error updating snippet:', error);
      setError('Failed to update snippet');
      throw error;
    }
  };

  const deleteSnippet = async (id) => {
    try {
      await deleteSnippetMutation({ id });
    } catch (error) {
      console.error('Error deleting snippet:', error);
      setError('Failed to delete snippet');
      throw error;
    }
  };

  return {
    snippets: snippets || [],
    loading,
    error,
    addSnippet,
    updateSnippet,
    deleteSnippet,
    refetch: () => {}, // Convex automatically refetches
  };
}
