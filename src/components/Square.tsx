import { Dispatch, DragEvent, SetStateAction } from 'react'
import { SquareModel } from '../models/SquareModel'
import Player from './Player'
import { BoardModel } from '../models/BoardModel';


interface SquareProps {
  square: SquareModel, 
  board: BoardModel,
  setChangingX: Dispatch<SetStateAction<number>>,
  setChangingY: Dispatch<SetStateAction<number>>,
  setStartX: Dispatch<SetStateAction<number>>,
  setStartY: Dispatch<SetStateAction<number>>,
  setDrop: Dispatch<SetStateAction<boolean>>,
}


function Square(squareProps: SquareProps) {
  function handleDragStart(square: SquareModel) {
    squareProps.setStartX(square.row)
    squareProps.setStartY(square.col)

    squareProps.setChangingX(square.row)
    squareProps.setChangingY(square.col)
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>, square: SquareModel) {
    e.preventDefault()
    squareProps.setChangingX(square.row)
    squareProps.setChangingY(square.col)
  }

  function handleDragEnd(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    squareProps.setDrop(true)
  }

  return (
    <>
        <div 
        draggable={true}
        onDragStart={() => {handleDragStart(squareProps.square)}} 
        onDragOver={(e) => {handleDragOver(e, squareProps.square)}}
        onDragEnd={(e) => {handleDragEnd(e)}} 
        style={{height: squareProps.square.height + 'px', 
          width: squareProps.square.width + 'px', 
          backgroundColor: squareProps.square.square_color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"}}>
          {squareProps.square.empty === true ? 
            <Player player={squareProps.square.player} color={squareProps.square.square_color} /> 
            : 
            <Player color={squareProps.square.player.color} player={squareProps.square.player} /> 
          } 
        </div>
    </>
  )
}


export default Square
