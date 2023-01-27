import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Popup from "./components/Popup";
import Notification from "./components/Notification";
import { showNotification as show } from "./helpers/helpers";
import { generateWordSet } from "./HangmanWords";
import "./App.css";

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [wordSet, setWordset] = useState(new Set());
  const [CorrectWord, setCorrectWord] = useState("");
  const [playAgain, setPlayAgain] = useState(false);

  useEffect(() => {
    if (playable === true) {
      generateWordSet().then((words) => {
        setWordset(words.wordSet);
        setCorrectWord(words.todaysWord.toLowerCase());
      });
      setPlayAgain(false);
    }
  }, [playAgain, playable]);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (CorrectWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable, CorrectWord]);

  function handlePlayAgain() {
    setPlayable(true);
    setPlayAgain(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word CorrectWord={CorrectWord} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        CorrectWord={CorrectWord}
        setPlayable={setPlayable}
        playAgain={handlePlayAgain}
      />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
