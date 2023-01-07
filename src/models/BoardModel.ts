import { Dispatch, SetStateAction } from "react";
import { SquareModel } from "./SquareModel";

export class BoardModel {
    board: SquareModel[][] = [];    

    constructor(board: SquareModel[][]) {
        this.board = board;
    }

    isSquareEmpty(row: number, col: number): boolean {
        if (this.board[row][col].empty) {
            return true
        }
        return false
    }

    isSameSquare(changingX: number, changingY: number, startX: number, startY: number): boolean {
        if (changingX === startX && changingY === startY) {
            return true
        }
        return false
    }

    isInArr(possibleArr: number[], target: number): boolean {
        for(let i = 0; i < possibleArr.length; i++) {
            if (target === possibleArr[i]) {
                return true
            }
        }
        return false
    }

    possibleMove(turns: boolean, setTurn: Dispatch<SetStateAction<boolean>>, changingX: number, changingY: number, startX: number, startY: number): boolean {
        // implement turns

        if (this.isSquareEmpty(changingX, changingY) === false || this.isSameSquare(changingX, changingY, startX, startY)) {
            return false
        } 

        let possibleYArr = this.possibleYCheck(startY)
        let possibleXArr = this.possibleXCheck(startX, startY)

        let possibleX = this.isInArr(possibleXArr, changingX)
        let possibleY = this.isInArr(possibleYArr, changingY)



        if(possibleX && possibleY) {
            let temp = this.board[startX][startY].player
            this.board[changingX][changingY].player = temp
            this.board[changingX][changingY].empty = false
            this.board[startX][startY].empty = true
        }

        return true
    }

    possibleAttack(changingX: number, changingY: number, startX: number, startY: number): number[] {
        
        return []
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