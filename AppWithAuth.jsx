import { useState } from 'react';
import Login from './components/Login';
import App from './App';

const AppWithAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSwitchToSignup = () => {
    console.log('Switch to signup page - not implemented yet');
    alert('Signup functionality not implemented yet');
  };

  // If user is not logged in, show login page
  if (!isLoggedIn) {
    return (
      <Login 
        onLoginSuccess={handleLoginSuccess}
        onSwitchToSignup={handleSwitchToSignup}
      />
    );
  }

  // If user is logged in, show the main app with logout button
  return (
    <div className="relative">
      {/* Logout button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 shadow-lg"
        >
          Logout
        </button>
      </div>
      <App />
    </div>
  );
};

export default AppWithAuth;
