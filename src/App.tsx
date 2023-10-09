import React, { useState } from 'react'

export function App() {
  const [game, setGame] = useState({
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    id: null,
    winner: null,
  })
  async function handleClickCell(row: number, column: number) {
    if (game.id === null || game.winner || game.board[row][column] !== ' ') {
      return
    }
    const url = `https://sdg-tic-tac-toe-api.herokuapp.com/game/${game.id}`
    const body = { row, column }
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      const newGame = await response.json()
      setGame(newGame)
    }
  }
  async function handleNewGame() {
    const response = await fetch(
      'https://sdg-tic-tac-toe-api.herokuapp.com/game',
      {
        method: 'POST',
        headers: { 'content-type': 'application/jason' },
      }
    )
    if (response.ok) {
      const newGame = await response.json()
      setGame(newGame)
    }
  }
  const header = game.winner ? `${game.winner} is the winner!` : 'Tic Tac Toe'
  return (
    <div>
      <h1>
        {header} - <button onClick={handleNewGame}>New</button>
      </h1>
      <ul>
        {/* <li onClick={() => handleClickCell(0, 0)}>{game.board[0][0]}</li>
        <li onClick={() => handleClickCell(0, 1)}>{game.board[0][1]}</li>
        <li onClick={() => handleClickCell(0, 2)}>{game.board[0][2]}</li>
        <li onClick={() => handleClickCell(1, 0)}>{game.board[1][0]}</li>
        <li onClick={() => handleClickCell(1, 1)}>{game.board[1][1]}</li>
        <li onClick={() => handleClickCell(1, 2)}>{game.board[1][2]}</li>
        <li onClick={() => handleClickCell(2, 0)}>{game.board[2][0]}</li>
        <li onClick={() => handleClickCell(2, 1)}>{game.board[2][1]}</li>
        <li onClick={() => handleClickCell(2, 2)}>{game.board[2][2]}</li> */}
        {game.board.map((boardRow, rowIndex) => {
          return boardRow.map((cell, columnIndex) => {
            return (
              <li
                key={columnIndex}
                className={cell === ' ' ? ' ' : 'taken'}
                onClick={() => handleClickCell(rowIndex, columnIndex)}
              >
                {cell}
              </li>
            )
          })
        })}
      </ul>
    </div>
  )
}
