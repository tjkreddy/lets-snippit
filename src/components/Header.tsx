import React from 'react';
import { PlusIcon } from './icons/PlusIcon';

interface HeaderProps {
  onAddSnippet: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddSnippet, searchTerm, onSearchChange }) => {
  return (
    <header className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-md shadow-lg shadow-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-cyan-400 tracking-wider">
              Code<span className="text-white">Snippets</span>
            </h1>
          </div>
          <div className="flex-1 max-w-xl mx-4">
             <input
              type="text"
              placeholder="Search snippets..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition duration-200"
            />
          </div>
          <div className="flex items-center">
            <button
              onClick={onAddSnippet}
              className="flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              <span>Add Snippet</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
