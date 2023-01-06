import { Dispatch, SetStateAction } from "react";
import { SquareModel } from "./SquareModel";

export class BoardModel {
    board: SquareModel[][] = [];    

    constructor(board: SquareModel[][]) {
        this.board = board;
    }

    possibleMove(turns: boolean, setTurn: Dispatch<SetStateAction<boolean>>, changingX: number, changingY: number, startX: number, startY: number): boolean {
        // if (turns) {
        //     // only red can go
        // } else {
        //     // computer turn 
        // }
        if (this.board[changingY][changingX].empty || this.board[startX][startY].empty || (changingX === startX && changingY === startY)) {
            console.log("No")
            return false
        } 

        let possibleY = this.possibleYCheck(startY)
        let possibleX = this.possibleXCheck(startX, startY)
        let finalX = -1
        let finalY = -1

        console.log("Possible: ", possibleX, possibleY) 
        console.log("This is the start: ", startX, startY)
        console.log("This is the changed: ", changingX, changingY) 

        console.log("Yes")
        for(let i = 0; i < possibleX.length; i++) {
            if (changingX === possibleX[i]) {
                finalX = changingX
            }
        }
        for(let j = 0; j < possibleY.length; j++) {
            if (changingY === possibleY[j]) {
                finalY = changingY
            }
        }

        if(finalX !== -1 && finalY !== -1) {
            this.board[changingX][changingY].player.color = this.board[startX][startY].player.color
            this.board[startX][startY].empty = true
            this.board[changingX][changingY].empty = false
            return true
        } else {
            console.log("Nope")
            return false
        }
    }

    possibleYCheck(startY: number): number[] { 
        let possibleY: number[] = []
        if (startY === 0 || startY === 7) {
            if (startY === 0) { 
                possibleY.push(startY + 1)
            } else {              
                possibleY.push(startY - 1)
            }
        } else {
            possibleY.push(startY + 1)
            possibleY.push(startY - 1)
        }

        return possibleY
    }          

    possibleXCheck(startY: number, startX: number): number[] {
        let possibleX: number[] = []
        if (startY === 0 || startY === 7) {
            if (startY === 0) {
                possibleX.push(startY + 1)
            } else {
                possibleX.push(startY - 1)
            }  
        } else {
            if (this.board[startX][startY].player.special) {
                possibleX.push(startY + 1)
                possibleX.push(startY - 1)
            } else {
                if (this.board[startY][startX].player.color === "#E1000E") {
                    possibleX.push(startY + 1)
                } else {
                    possibleX.push(startY - 1)
                }
            }
        }

        return possibleX
    }
}