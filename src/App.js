import React, { useState, useRef } from "react";
import GuessInput from "./GuessInput";
import GameStatus from "./GameStatus";
import "./App.css";
import "./firework.js"; // Import the firework.js

function App() {
  const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [history, setHistory] = useState([]);

  const canvasRef = useRef(null);
  const fireworkRef = useRef(null);

  const handleGuess = (newGuess) => {
    if (gameOver) return;

    const guessNum = parseInt(newGuess, 10);
    setGuess(newGuess);
    setAttempts(attempts + 1);

    if (guessNum === targetNumber) {
      setFeedback(`Correct, ${playerName}! You guessed the number!`);
      setGameOver(true);
      recordHistory();

      // Speak out the congratulatory message
      const utterance = new SpeechSynthesisUtterance("Congratulations! You guessed right!");
      window.speechSynthesis.speak(utterance);

      // Start fireworks
      startFireworks();

    } else if (guessNum > targetNumber) {
      setFeedback("Too high! Try again.");
    } else {
      setFeedback("Too low! Try again.");
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      setIsPlaying(true);
    }
  };

  const resetGame = () => {
    setGuess("");
    setFeedback("");
    setAttempts(0);
    setGameOver(false);
    setIsPlaying(false);
    setPlayerName("");
    setTargetNumber(generateRandomNumber());
    stopFireworks();
  };

  const recordHistory = () => {
    const playTime = new Date().toLocaleString();
    const newRecord = {
      name: playerName,
      attempts: attempts,
      time: playTime
    };
    setHistory([...history, newRecord]);
  };

  const deleteRecord = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
  };

  const deleteAllRecords = () => {
    setHistory([]);
  };

  // Fireworks functions
  const startFireworks = () => {
    if (canvasRef.current) {
      fireworkRef.current = new window.Firework(canvasRef.current);
      fireworkRef.current.start();
    }
  };

  const stopFireworks = () => {
    if (fireworkRef.current) {
      fireworkRef.current.stop();
      fireworkRef.current = null;
    }
  };

  return (
    <div className="App" style={{ position: "relative" }}>
      <h1>Guess the Number Game</h1>
      {!isPlaying ? (
        <form onSubmit={handleNameSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button type="submit">Start Game</button>
        </form>
      ) : (
        <>
          <h2>Player: {playerName}</h2>
          <GameStatus feedback={feedback} attempts={attempts} />
          <GuessInput
            guess={guess}
            onGuess={handleGuess}
            disabled={gameOver}
            buttonClass="guess-button"
          />
          {gameOver && <button onClick={resetGame}>Play Again</button>}
        </>
      )}
      
      {/* Display Game History */}
      {history.length > 0 && (
        <div className="history">
          <h2>Game History</h2>
          <button onClick={deleteAllRecords} className="delete-button">
            Clear All History
          </button>
          <ul>
            {history.map((record, index) => (
              <li key={index}>
                {record.name} played at {record.time} - Attempts: {record.attempts}{" "}
                <button onClick={() => deleteRecord(index)} className="delete-button">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Fireworks canvas */}
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      ></canvas>
    </div>
  );
}

export default App;
