
import { PlusIcon } from './icons/PlusIcon';

const Header = ({ onAddSnippet, searchTerm, onSearchChange, team, onLogout }) => {
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
          <div className="flex items-center space-x-4">
            <button
              onClick={onAddSnippet}
              className="flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              <span>Add Snippet</span>
            </button>
            
            {/* Team Menu */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {team?.teamName?.charAt(0)?.toUpperCase() || 'T'}
                  </span>
                </div>
                <span className="text-gray-300 text-sm">
                  {team?.teamName || 'Team'}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center justify-center text-gray-400 hover:text-red-400 transition duration-200"
                title="Leave Team"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
