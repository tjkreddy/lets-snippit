
import { Snippet } from './types';

export const DUMMY_SNIPPETS: Snippet[] = [
  {
    id: '1',
    title: 'React Custom Hook: useToggle',
    description: 'A simple custom hook to manage a boolean state, useful for toggling UI elements.',
    code: `import { useState, useCallback } from 'react';

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState(s => !s), []);
  return [state, toggle];
};

export default useToggle;`,
    tags: ['react', 'hook', 'typescript'],
    createdAt: new Date('2023-10-26T10:00:00Z').toISOString(),
  },
  {
    id: '2',
    title: 'Tailwind CSS Dark Mode Setup',
    description: 'Basic configuration in tailwind.config.js to enable manual dark mode toggling.',
    code: `// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media'
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
    tags: ['tailwind', 'css', 'config'],
    createdAt: new Date('2023-10-25T14:30:00Z').toISOString(),
  },
  {
    id: '3',
    title: 'Async/Await Fetch API Call',
    description: 'A standard way to fetch data from an API using async/await syntax in JavaScript.',
    code: `const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};`,
    tags: ['javascript', 'api', 'es6'],
    createdAt: new Date('2023-10-24T09:00:00Z').toISOString(),
  },
];
