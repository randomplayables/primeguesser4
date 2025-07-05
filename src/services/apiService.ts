const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '[https://randomplayables.com/api](https://randomplayables.com/api)'
  : '/api';

const GAME_ID = import.meta.env.VITE_GAME_ID;

export async function initGameSession() {
  try {
    const response = await fetch(`${API_BASE_URL}/game-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId: GAME_ID }),
    });
    if (!response.ok) {
      throw new Error('Failed to initialize game session');
    }
    return response.json();
  } catch (error) {
    console.error('Error initializing game session:', error);
    return { sessionId: 'local-session' };
  }
}

export async function saveGameData(roundNumber: number, roundData: any) {
  try {
    const sessionData = JSON.parse(localStorage.getItem('gameSession') || '{}');
    const sessionId = sessionData.sessionId;

    if (!sessionId) {
      console.error('No session ID found for saving game data');
      return;
    }

    const response = await fetch(`${API_BASE_URL}/game-data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, roundNumber, roundData }),
    });
    if (!response.ok) {
      throw new Error('Failed to save game data');
    }
    return response.json();
  } catch (error) {
    console.error('Error saving game data:', error);
    return null;
  }
}