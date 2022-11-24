import React from 'react'

type Props = {
    guessedLetters: string[],
    wordToGuess: string,
    reveal: boolean
}

const HangmanWord = ({ guessedLetters, wordToGuess, reveal }: Props) => {
    return (
        <div style={{ display: 'flex', gap: '.25em', fontSize: '6rem', fontWeight: 'bold', textTransform: 'uppercase', fontFamily: 'monospace' }}>
            {wordToGuess.split('').map((letter, index) => (
                <span key={index} style={{ borderBottom: '.1em solid black' }}>
                    <span style={{ visibility: guessedLetters.includes(letter) || reveal ? 'visible' : 'hidden', color: !guessedLetters.includes(letter) && reveal ? 'red' : '' }}>
                        {letter}
                    </span>
                </span>
            ))
            }
        </div >
    )
}

export default HangmanWord