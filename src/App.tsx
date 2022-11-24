import { useState, useEffect, useCallback } from 'react'
import HangmanDrawing from './components/HangmanDrawing'
import HangmanWord from './components/HangmanWord'
import Keyboard from './components/Keyboard'
import words from './wordList.json'
import grid from './assets/grid-background.png'

const getWord = () => {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))
  console.log(wordToGuess, 'wordToGuess')

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess.split('').every(letter => guessedLetters.includes(letter))

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()

      addGuessedLetter(key)
    }
    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [guessedLetters])

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return

    setGuessedLetters(prev => [...prev, letter])
  }, [guessedLetters, isWinner, isLoser])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (key !== 'Enter') return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())

    }
    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [])


  return (
    <div>
      <img src={grid} style={{ width: '100%', height: '100%', position: 'absolute', zIndex: '-1', objectFit: 'cover' }} />
      <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem', margin: '0 auto', alignItems: 'center', position: 'relative', padding: '1rem' }}>
        <div style={{ fontSize: '2rem', textAlign: 'center' }}>
          {isWinner && 'Winner! - Refresh to try again'}
          {isLoser && 'Loser! - Refresh to try again'}
        </div>
        <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
        <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
        <div style={{ alignSelf: 'stretch' }}>
          <Keyboard disabled={isWinner || isLoser} activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))} inactiveLetters={incorrectLetters} addGuessedLetter={addGuessedLetter} />
        </div>
      </div>
    </div>
  )
}

export default App
