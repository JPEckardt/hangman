import React from "react";

const Word = ({ CorrectWord, correctLetters }) => {
  return (
    <div className="word">
      {CorrectWord.split("").map((letter, i) => {
        return (
          <span className="letter" key={i}>
            {correctLetters.includes(letter) ? letter : ""}
          </span>
        );
      })}
    </div>
  );
};

export default Word;
