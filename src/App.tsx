import { useEffect, useState } from 'react'
import './App.css'
import Board from './components/Board';
import { BoardModel } from './models/BoardModel'
import { CheckersModel } from './models/CheckersModel'


function App() {
  const [winner, setWinner] = useState("")
  const [mode, setMode] = useState("")

  var checkersBoard = new CheckersModel()
  var board = new BoardModel(checkersBoard.createBoard(), 12, 12)

  function resetGame() {
    setMode("")
    setWinner("")
  }

  function facePlayer(mode: string) {
    setMode(mode)
    board = new BoardModel(checkersBoard.createBoard(), 12, 12)
  }

  useEffect(() => {
  }, [JSON.stringify(board.board)])

  return (
    <div className='checkers-board'>
      {
        winner !== "" ? 
        <div className="winner-popup">
            <h1 className="winner-title">The Winner is <span className='player'>{winner}</span>!</h1>
            <button className='reset-btn' onClick={resetGame}>Reset Game</button>
        </div> : null
      }
      {
        mode === "" ? 
        <div className='game-screen'>
          <h1 className="winner-title game-title">Welcome to Checkers!</h1>
          <div className='game-options'>
            <button className='reset-btn' onClick={() => {facePlayer("Human")}}>Human vs Human</button>
            <button className='reset-btn' onClick={() => {facePlayer("Computer")}}>Computer vs Human</button>
          </div>
        </div>
        : <Board board={board} setWinner={setWinner} mode={mode} /> 
      }
    </div>
  )
}

export default App
