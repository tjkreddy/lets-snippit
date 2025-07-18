import React from 'react';
import { TagIcon } from './icons/TagIcon';

interface TagFilterProps {
  tags: string[];
  activeTags: string[];
  onToggleTag: (tag: string) => void;
  onClearFilters: () => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, activeTags, onToggleTag, onClearFilters }) => {
  if (tags.length === 0) return null;

  return (
    <div className="mb-8 p-4 bg-gray-800/50 rounded-lg">
      <div className="flex items-center mb-3">
        <TagIcon className="w-5 h-5 mr-2 text-cyan-400" />
        <h3 className="text-lg font-semibold">Filter by Tags</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => onToggleTag(tag)}
            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
              activeTags.includes(tag)
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            {tag}
          </button>
        ))}
        {activeTags.length > 0 && (
          <button
            onClick={onClearFilters}
            className="px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 bg-red-600 hover:bg-red-700 text-white"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default TagFilter;
