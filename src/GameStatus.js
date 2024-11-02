import React from "react";

function GameStatus({ feedback, attempts }) {
  return (
    <div>
      <p>{feedback}</p>
      <p>Attempts: {attempts}</p>
    </div>
  );
}

export default GameStatus;
