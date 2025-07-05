import React, { FC } from 'react'
import { MIN_GUESS, MAX_GUESS } from '../constants'

interface GuessInputProps {
  guess: string
  onGuessChange: (value: string) => void
  onSubmit: () => void
  disabled?: boolean
}

const GuessInput: FC<GuessInputProps> = ({ guess, onGuessChange, onSubmit, disabled = false }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        min={MIN_GUESS}
        max={MAX_GUESS}
        value={guess}
        onChange={(e) => onGuessChange(e.target.value)}
        disabled={disabled}
      />
      <button type="submit" disabled={disabled || guess === ''}>
        Guess
      </button>
    </form>
  )
}

export default GuessInput