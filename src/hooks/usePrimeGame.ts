import { useState, useEffect, useCallback } from 'react'
import { initGameSession, saveGameData } from '../services/apiService'
import { MIN_NUMBER, MAX_NUMBER, MAX_ATTEMPTS } from '../constants'
import { GuessEntry } from '../types'

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function isPrime(n: number): boolean {
  if (n < 2) return false
  const sqrt = Math.sqrt(n)
  for (let i = 2; i <= sqrt; i++) {
    if (n % i === 0) {
      return false
    }
  }
  return true
}

export function usePrimeGame() {
  const [roundNumber, setRoundNumber] = useState<number>(1)
  const [currentNumber, setCurrentNumber] = useState<number>(() =>
    getRandomNumber(MIN_NUMBER, MAX_NUMBER)
  )
  const [guesses, setGuesses] = useState<GuessEntry[]>([])
  const [isGameOver, setIsGameOver] = useState<boolean>(false)

  useEffect(() => {
    async function initializeSession() {
      const session = await initGameSession()
      localStorage.setItem('gameSession', JSON.stringify(session))
    }
    initializeSession()
  }, [])

  const handleGuess = useCallback(
    (guess: boolean) => {
      if (isGameOver) return
      const prime = isPrime(currentNumber)
      const correct = guess === prime
      const entry: GuessEntry = {
        number: currentNumber,
        guess,
        isPrime: prime,
        correct,
      }
      setGuesses(prev => [...prev, entry])
      saveGameData(roundNumber, entry)
      if (roundNumber >= MAX_ATTEMPTS) {
        setIsGameOver(true)
      } else {
        setRoundNumber(prev => prev + 1)
        setCurrentNumber(getRandomNumber(MIN_NUMBER, MAX_NUMBER))
      }
    },
    [currentNumber, roundNumber, isGameOver]
  )

  const resetGame = useCallback(() => {
    setRoundNumber(1)
    setGuesses([])
    setCurrentNumber(getRandomNumber(MIN_NUMBER, MAX_NUMBER))
    setIsGameOver(false)
  }, [])

  return {
    currentNumber,
    roundNumber,
    guesses,
    isGameOver,
   