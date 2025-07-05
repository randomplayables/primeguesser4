import React from 'react';
import usePrimeGame from './hooks/usePrimeGame';
import GuessInput from './components/GuessInput';
import GuessList from './components/GuessList';

const App: React.FC = () => {
  const { guesses, handleGuess, isGameOver, isWin, remainingAttempts, resetGame } = usePrimeGame();

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '1rem' }}>
      <h1>Prime Number Guessing Game</h1>
      <p>Remaining Attempts: {remainingAttempts}</p>
      {!isGameOver ? (
        <GuessInput onGuess={handleGuess} disabled={isGameOver} />
      ) : (
        <button onClick={resetGame}>Start New Game</button>
      )}
      <GuessList guesses={guesses} />
      {isGameOver && (
        <div style={{ marginTop: '1rem'