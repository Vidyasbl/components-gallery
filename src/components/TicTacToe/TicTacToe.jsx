import React, { useState, useCallback } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
  const [gameState, setGameState] = useState({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    gameOver: false
  });

  const checkWinner = useCallback((board) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return board.every(cell => cell !== null) ? 'draw' : null;
  }, []);

  const handleCellClick = (index) => {
    if (gameState.board[index] || gameState.gameOver) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;
    
    const winner = checkWinner(newBoard);
    const nextPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';

    setGameState({
      board: newBoard,
      currentPlayer: winner ? gameState.currentPlayer : nextPlayer,
      winner,
      gameOver: winner !== null
    });
  };

  const resetGame = () => {
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      gameOver: false
    });
  };

  const getStatusMessage = () => {
    if (gameState.winner === 'draw') return "It's a draw!";
    if (gameState.winner) return `Player ${gameState.winner} wins! 🎉`;
    return `Current player: ${gameState.currentPlayer}`;
  };

  return (
    <div className="tic-tac-toe">
      <div className="game-header">
        <h2>Tic Tac Toe</h2>
        <div className="status">{getStatusMessage()}</div>
      </div>
      
      <div className="game-board">
        {gameState.board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${cell ? 'filled' : ''} ${cell === 'X' ? 'x' : cell === 'O' ? 'o' : ''}`}
            onClick={() => handleCellClick(index)}
            disabled={gameState.gameOver || cell !== null}
          >
            {cell && <span className="cell-content">{cell}</span>}
          </button>
        ))}
      </div>

      <button className="reset-btn" onClick={resetGame}>
        New Game
      </button>
    </div>
  );
};

export default TicTacToe;