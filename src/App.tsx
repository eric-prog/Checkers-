import { useEffect, useState } from 'react'
import './App.css'
import Board from './components/Board';
import { BoardModel } from './models/BoardModel'
import { CheckersModel } from './models/CheckersModel'


function App() {
  const [winner, setWinner] = useState("");

  var checkersBoard = new CheckersModel()
  var board = new BoardModel(checkersBoard.createBoard(), 12, 0)

  function resetGame() {
    checkersBoard = new CheckersModel()
    board = new BoardModel(checkersBoard.createBoard(), 12, 0)
    setWinner("")
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
      <Board board={board} setWinner={setWinner} />
    </div>
  )
}

export default App
