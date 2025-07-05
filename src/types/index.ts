export enum GuessResult {
  Correct = 'correct',
  TooLow = 'tooLow',
  TooHigh = 'tooHigh',
  NotPrime = 'notPrime',
}

export interface Guess {
  value: number;
  result: GuessResult;
}

export interface RoundData {
  guesses: Guess[];
  secretNumber: number;
  attempts: number;
  success: boolean;
}

export interface InitGameSessionResponse {
  sessionId: string;
}

export type SaveGameDataResponse = any  