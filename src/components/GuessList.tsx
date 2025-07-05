import React from 'react'
import { Guess } from '../types'
import GuessItem from './GuessItem'

interface GuessListProps {
  guesses: Guess[]
}

const GuessList: React.FC<GuessListProps> = ({ guesses }) => {
  if (guesses.length === 0) {
    return <p>No guesses yet. Try guessing a number!</p>
  }
  return (
    <ul>
      {guesses.map((guess, index) => (
        <GuessItem key={index} guess={guess} />
      ))}
    </ul>
  )
}

export default GuessList
