import { Dispatch, SetStateAction, useEffect, useState, useCallback } from "react";
import { BoardModel } from "../models/BoardModel";
import Square from "./Square";
import "../styles/Board.css";


function Board({ board, setWinner, mode }: { board: BoardModel, setWinner: Dispatch<SetStateAction<string>>, mode: string}) {
  const [turns, setTurn] = useState(true); // by default black pieces start first

  const [changingX, setChangingX] = useState(0);
  const [changingY, setChangingY] = useState(0);

  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const [drop, setDrop] = useState(false); // user drag and drop

  function endGame(possibleWinner: string) {
    if (possibleWinner !== "") {
      setTurn(true)
      setChangingX(0)
      setChangingY(0)
      setStartX(0)
      setStartY(0)
      setWinner(possibleWinner)
    }
  }

  const makeTurn = useCallback(() => {
    return board.turn(mode, setDrop, turns, setTurn, changingX, changingY, startX, startY)
  }, [drop, turns])

  useEffect(() => {
    if (drop) {
      if(makeTurn()) {
        let possibleWinner = board.isGameOver()
        endGame(possibleWinner)
      } else {
        setDrop(true)
        setDrop(false)
      }
    }
  }, [drop]);

  return (
    <div className="entire-board">
      <div className="left-board">
        {board.board.map((row, i) => {
          return (
            <div key={i} className="checkers-row">
              {row.map((square, j) => (
                <Square
                  key={j}
                  square={square}
                  board={board}
                  setChangingX={setChangingX}
                  setChangingY={setChangingY}
                  setStartX={setStartX}
                  setStartY={setStartY}
                  setDrop={setDrop}
                />
              ))}
            </div>
          );
        })}
      </div>
      <div className="right-turn">
        {
          turns ? 
          <div className="turn-b human-t"></div>
          : 
          <div className="turn-b computer-t"></div>
        }
      </div>
    </div>
  );
}


export default Board;