import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if team is already logged in (from localStorage for demo purposes)
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const savedTeam = localStorage.getItem('team');
        if (savedTeam) {
          const teamData = JSON.parse(savedTeam);
          setTeam(teamData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const joinTeam = (teamData) => {
    // In a real app, you would validate team credentials with your backend
    const team = {
      id: teamData.id || Date.now(),
      teamName: teamData.teamName,
      joinTime: new Date().toISOString()
    };
    
    setTeam(team);
    setIsAuthenticated(true);
    
    // Save to localStorage for demo purposes
    localStorage.setItem('team', JSON.stringify(team));
    
    return Promise.resolve(team);
  };

  const createTeam = (teamData) => {
    // In a real app, you would create the team in your backend
    const team = {
      id: teamData.id || Date.now(),
      teamName: teamData.teamName,
      createdTime: new Date().toISOString()
    };
    
    setTeam(team);
    setIsAuthenticated(true);
    
    // Save to localStorage for demo purposes
    localStorage.setItem('team', JSON.stringify(team));
    
    return Promise.resolve(team);
  };

  const logout = () => {
    setTeam(null);
    setIsAuthenticated(false);
    localStorage.removeItem('team');
  };

  return {
    isAuthenticated,
    team,
    loading,
    joinTeam,
    createTeam,
    logout
  };
}
