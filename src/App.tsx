import { useEffect } from 'react'
import './App.css'
import Board from './components/Board';
import { BoardModel } from './models/BoardModel'
import { CheckersModel } from './models/CheckersModel'


function App() {
  var checkersBoard = new CheckersModel()
  var board = new BoardModel(checkersBoard.createBoard())

  useEffect(() => {
    console.log(board.board)
  }, [JSON.stringify(board.board)])

  return (
    <>
      <Board board={board} />
    </>
  )
}

export default App
