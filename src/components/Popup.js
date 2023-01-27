import React, { useEffect } from "react";
import { checkWin } from "../helpers/helpers";

const Popup = ({
  correctLetters,
  wrongLetters,
  CorrectWord,
  setPlayable,
  playAgain,
}) => {
  let finalMessage = "";
  let finalMessageRevealWord = "";
  let playable = true;

  if (checkWin(correctLetters, wrongLetters, CorrectWord) === "win") {
    finalMessage = "Herzlichen Glückwunsch! Du hast Gewonnen!!! 😃";
    playable = false;
  } else if (checkWin(correctLetters, wrongLetters, CorrectWord) === "lose") {
    finalMessage = "Schade, du hast verloren 😕";
    finalMessageRevealWord = `...das Word war: ${CorrectWord}`;
    playable = false;
  }

  useEffect(() => {
    setPlayable(playable);
  });

  return (
    <div
      className="popup-container"
      style={finalMessage !== "" ? { display: "flex" } : {}}
    >
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Nochmal?</button>
      </div>
    </div>
  );
};

export default Popup;
