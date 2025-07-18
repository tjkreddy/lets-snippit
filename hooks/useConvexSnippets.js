import { useState } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

// Dummy snippets for fallback
const DUMMY_SNIPPETS = [
  {
    _id: '1',
    title: 'Hello World JavaScript',
    description: 'Basic JavaScript hello world',
    code: 'console.log("Hello, World!");',
    tags: ['javascript', 'basic'],
    createdAt: Date.now()
  },
  {
    _id: '2',
    title: 'Python List Comprehension',
    description: 'Create a list with even numbers',
    code: 'even_numbers = [x for x in range(10) if x % 2 == 0]',
    tags: ['python', 'list-comprehension'],
    createdAt: Date.now() - 1000
  },
  {
    _id: '3',
    title: 'CSS Flexbox Center',
    description: 'Center an element with flexbox',
    code: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}',
    tags: ['css', 'flexbox'],
    createdAt: Date.now() - 2000
  }
];

export function useConvexSnippets() {
  const [error, setError] = useState(null);
  
  // Convex queries and mutations
  const snippets = useQuery(api.snippets.getSnippets) ?? DUMMY_SNIPPETS;
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
