

import { useState } from 'react';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { CopyIcon } from './icons/CopyIcon';
import { ClipboardCheckIcon } from './icons/ClipboardCheckIcon';

const SnippetItem = ({ snippet, onEdit, onDelete, showToast }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setIsCopied(true);
    showToast('Code copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:transform hover:-translate-y-1">
      <div className="p-5 flex-grow">
        <h3 className="text-xl font-bold text-cyan-400 mb-2">{snippet.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{snippet.description}</p>
        <div className="relative group">
          <pre className="bg-gray-900 text-sm text-gray-300 p-4 rounded-md overflow-x-auto max-h-60">
            <code>{snippet.code}</code>
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 bg-gray-700/50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-600"
          >
            {isCopied ? <ClipboardCheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <div className="p-5 bg-gray-800/50 border-t border-gray-700/50 flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {snippet.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-700 text-cyan-300 text-xs font-semibold rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onEdit(snippet)} className="p-2 text-gray-400 hover:text-white transition-colors"><EditIcon className="w-5 h-5"/></button>
          <button onClick={() => onDelete(snippet._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><TrashIcon className="w-5 h-5"/></button>
        </div>
      </div>
    </div>
  );
};

export default SnippetItem;
