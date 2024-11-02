import React, { useState } from "react";

function GuessInput({ guess, onGuess, disabled, buttonClass }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleGuessSubmit = () => {
    onGuess(inputValue);
    setInputValue("");
  };

  return (
    <div>
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your guess"
        disabled={disabled}
      />
      <button onClick={handleGuessSubmit} disabled={disabled} className={buttonClass}>
        Guess
      </button>
    </div>
  );
}

export default GuessInput;
