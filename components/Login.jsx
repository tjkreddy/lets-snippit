import { useState } from 'react';
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { EyeIcon } from './icons/EyeIcon';
import { EyeSlashIcon } from './icons/EyeSlashIcon';

const Login = ({ onLoginSuccess, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    teamName: '',
    passcode: ''
  });
  const [showPasscode, setShowPasscode] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const joinTeamMutation = useMutation(api.auth.joinTeam);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    }
    
    if (!formData.passcode) {
      newErrors.passcode = 'Team passcode is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call Convex auth function to join team
      const team = await joinTeamMutation({
        teamName: formData.teamName.trim(),
        passcode: formData.passcode
      });
      
      // Save team data to localStorage for demo auth state
      const teamData = {
        id: team.id,
        teamName: team.teamName,
        joinTime: new Date().toISOString()
      };
      
      localStorage.setItem('team', JSON.stringify(teamData));
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      
      // Force a page reload to trigger auth state update
      window.location.reload();
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: error.message || 'Failed to join team. Please check your team name and passcode.' });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasscodeVisibility = () => {
    setShowPasscode(!showPasscode);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-cyan-400 tracking-wider mb-2">
            Code<span className="text-white">Snippets</span>
          </h1>
          <h2 className="text-2xl font-bold text-white mb-2">Join Your Team</h2>
          <p className="text-gray-400">Enter your team name and passcode to access shared snippets</p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-900/50 border border-red-600 text-red-400 px-4 py-3 rounded-md text-sm">
                {errors.general}
              </div>
            )}

            {/* Team Name Field */}
            <div>
              <label htmlFor="teamName" className="block text-sm font-medium text-gray-300 mb-2">
                Team Name
              </label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                value={formData.teamName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 bg-gray-700 rounded-md border ${
                  errors.teamName ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-cyan-500'
                } focus:border-transparent transition duration-200 text-white placeholder-gray-400`}
                placeholder="Enter your team name"
                required
              />
              {errors.teamName && (
                <p className="mt-1 text-sm text-red-400">{errors.teamName}</p>
              )}
            </div>

            {/* Passcode Field */}
            <div>
              <label htmlFor="passcode" className="block text-sm font-medium text-gray-300 mb-2">
                Team Passcode
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? 'text' : 'password'}
                  id="passcode"
                  name="passcode"
                  value={formData.passcode}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 pr-10 bg-gray-700 rounded-md border ${
                    errors.passcode ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-cyan-500'
                  } focus:border-transparent transition duration-200 text-white placeholder-gray-400`}
                  placeholder="Enter your team passcode"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasscodeVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300 transition duration-200"
                >
                  {showPasscode ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.passcode && (
                <p className="mt-1 text-sm text-red-400">{errors.passcode}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-md font-bold text-white transition duration-300 ease-in-out transform ${
                isLoading 
                  ? 'bg-cyan-600 cursor-not-allowed' 
                  : 'bg-cyan-500 hover:bg-cyan-600 hover:scale-105 focus:ring-2 focus:ring-cyan-500 focus:outline-none'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Joining team...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                  </svg>
                  Join Team
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">Don't have a team?</span>
              </div>
            </div>
          </div>

          {/* Create Team Button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="w-full flex items-center justify-center py-3 px-4 rounded-md font-bold text-cyan-400 border border-cyan-400 hover:bg-cyan-400 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
              Create New Team
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            By signing in, you agree to our{' '}
            <button className="text-cyan-400 hover:text-cyan-300 transition duration-200">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="text-cyan-400 hover:text-cyan-300 transition duration-200">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
