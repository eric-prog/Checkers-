import { Dispatch, SetStateAction } from "react";
import { PlayerModel } from "./PlayerModel";
import { SquareModel } from "./SquareModel";

export class BoardModel {
    board: SquareModel[][] = []; 
    numHumanPlayers: number;
    numComputerPlayers: number;   

    constructor(board: SquareModel[][], numHumanPlayers: number, numComputerPlayers: number) {
        this.board = board;
        this.numHumanPlayers = numHumanPlayers;
        this.numComputerPlayers = numComputerPlayers;
    }

    // makeComputerMove(turns: boolean, setTurn: Dispatch<SetStateAction<boolean>>) {
    //     for (let i = 0; i < this.board.length; i++) {
    //         for (let j = 0; j < this.board.length; j++) {
    //             let currSquare = this.board[i][j]
    //             let player = this.board[i][j].player
    //             if (player.color === "#E1000E" && currSquare.empty === false) {
    //                 if (this.possibleMove(false, i + 2, i + 2, i, j)) {
    //                     return true
    //                 } else if (this.possibleMove(false, i - 2, i + 2, i, j)) {
    //                     return true
    //                 } else if (this.possibleMove(false, i + 2, i - 2, i, j)) {
    //                     return true
    //                 } else if (this.possibleMove(false, i - 2, i - 2, i, j)) {
    //                     return true
    //                 } else if (this.possibleMove(false, i + 1, i + 1, i, j)) {
    //                     return true
    //                 } else if (this.possibleMove(false, i - 1, i + 1, i, j)) {
    //                     return true
    //                 } else if (this.possibleMove(false, i + 1, i - 1, i, j)) {
    //                     return true
    //                 } else if (this.possibleMove(false, i - 1, i - 1, i, j)) {
    //                     return true
    //                 }              
    //             }
    //         }
    //     }
    // }

    isGameOver(): string {
        if (this.numHumanPlayers === 0) {
            return "Human"
        } else if (this.numComputerPlayers === 0) {
            return "Computer"
        } else {
            return ""
        }
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

    isSameTeam(changingX: number, changingY: number, startX: number, startY: number): boolean {
        if (this.board[changingX][changingY].player.color === this.board[startX][startY].player.color) {
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

    turn(mode: string, drop: boolean, setDrop: Dispatch<SetStateAction<boolean>>, turns: boolean, setTurn: Dispatch<SetStateAction<boolean>>, changingX: number, changingY: number, startX: number, startY: number): boolean {
        if (mode === "Computer" && turns === false) {
            console.log("MAde computer move")
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    let currSquare = this.board[i][j]
                    let player = this.board[i][j].player
                    if (player.color === "#E1000E" && currSquare.empty === false) {
                        if (this.possibleMove(setDrop, true, false, i + 2, j + 2, i, j)) {
                            console.log("1")
                            setTurn(!turns)
                            setDrop(false)
                            return true
                        } else if (this.possibleMove(setDrop, true, false, i - 2, j + 2, i, j)) {
                            console.log("2")
                            setTurn(!turns)
                            setDrop(false)
                            return true
                        } else if (this.possibleMove(setDrop, true, false, i + 2, j - 2, i, j)) {
                            console.log("3")
                            setTurn(!turns)
                            setDrop(false)
                            return true
                        } else if (this.possibleMove(setDrop, true, false, i - 2, j - 2, i, j)) {
                            console.log("4")
                            setTurn(!turns)
                            setDrop(false)
                            return true
                        } else {
                            console.log("No!")
                        }
                    }
                }
            }
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    let currSquare = this.board[i][j]
                    let player = this.board[i][j].player
                    if (player.color === "#E1000E" && currSquare.empty === false) {
                        if (this.possibleMove(setDrop, true, false, i + 1, j + 1, i, j)) {
                            console.log(i+1, j+1)
                            setTurn(!turns)
                            setDrop(false)
                            return true
                        } else if (this.possibleMove(setDrop, true, false, i - 1, j + 1, i, j)) {
                            console.log("5")
                            setTurn(!turns)
                            setDrop(false)
                            return true
                        } else if (this.possibleMove(setDrop, true, false, i + 1, j - 1, i, j)) {
                            console.log("6")
                            setTurn(!turns)
                            setDrop(false)
                            return true
                        } else if (this.possibleMove(setDrop, true, false, i - 1, j - 1, i, j)) {
                            console.log("7")
                            setTurn(!turns)
                            setDrop(false)
                            return true
                        } else {
                            console.log("No!")
                        }
                    }
                }
            }
            return true
        } else if(this.possibleMove(setDrop, false, turns, changingX, changingY, startX, startY)) {
            setTurn(!turns)
            setDrop(false)
            return true
        } 
        return false
    }

    isSpecial(player: PlayerModel, changingX: number): boolean {
        if(player.color === "#E1000E" && changingX === 7) {
            return true
        } else if (player.color === "black" && changingX === 0) {
            return true
        }
        return false
    }

    changePos(setDrop: Dispatch<SetStateAction<boolean>>, isComputer: boolean, startX: number, startY: number, changingX: number, changingY: number)  {
        if (isComputer) {
            setDrop(false)
        }
        let temp = this.board[startX][startY].player
        let future_player = this.board[changingX][changingY].player

        this.board[startX][startY].player = future_player
        this.board[startX][startY].empty = true
        this.board[startX][startY].player.special = false

        this.board[changingX][changingY].player = temp
        this.board[changingX][changingY].empty = false
        if(this.isSpecial(this.board[changingX][changingY].player, changingX)) {
            this.board[changingX][changingY].player.special = true
        }

    }

    outOfBoard(changingX: number, changingY: number): boolean {
        if (changingX > 7 || changingX < 0 || changingY > 7 || changingY < 0) {
            return true
        }   
        return false
    }

    // black player goes behind
    possibleMove(setDrop: Dispatch<SetStateAction<boolean>>, isComputer: boolean, turns: boolean, changingX: number, changingY: number, startX: number, startY: number): boolean {
        let computerPlayer = this.board[startX][startY].player.isComputer
        if (turns && computerPlayer) {
            console.log("1")
            return false
        } 
        if (turns === false && !computerPlayer) {
            console.log("2")
            return false
        } 
        if (this.outOfBoard(changingX, changingY)) {
            console.log("3")
            return false
        }
        if (this.isSquareEmpty(changingX, changingY) === false || this.isSameSquare(changingX, changingY, startX, startY)) {
            console.log("4")
            return false
        } 

        let possibleYArr = this.possibleYCheck(startY)
        let possibleXArr = this.possibleXCheck(startX, startY)
        let possibleAttack = this.possibleAttack(changingX, changingY, startX, startY)

        let possibleX = this.isInArr(possibleXArr, changingX)
        let possibleY = this.isInArr(possibleYArr, changingY)

        console.log("here:", possibleX, possibleY)
        if(possibleX && possibleY) {
            this.changePos(setDrop, isComputer, startX, startY, changingX, changingY)
            console.log("deep")
            return true
        } else if (possibleAttack) {
            this.changePos(setDrop, isComputer, startX, startY, changingX, changingY)

            let removeX = (startX + changingX)/2
            let removeY = (startY + changingY)/2

            if (this.board[removeX][removeY].player.color === "black") {
                this.numHumanPlayers -= 1
            } else {
                this.numComputerPlayers -= 1
            }
            this.board[removeX][removeY].player.special = false
            this.board[removeX][removeY].empty = true
            return true
        } else {
            return false
        }
    }

    isDiagonalEnemy(startX: number, startY: number, targetX: number, targetY: number): boolean {
        if (targetX < 0 || targetX > 7 || targetY < 0 || targetY > 7) {
            return false
        }
        if (this.board[targetX][targetY].empty === false && (this.board[startX][startY].player.color !== this.board[targetX][targetY].player.color)) {
            return true
        } 
        return false  
    }

    isThirdEmpty(targetX: number, targetY: number) {
        if (targetX < 0 || targetX > 7 || targetY < 0 || targetY > 7) {
            return false
        }
        if (this.board[targetX][targetY].empty) {
            return true
        } 
        return false  
    }

    possibleAttack(changingX: number, changingY: number, startX: number, startY: number): boolean {
        
        const currentSquare = this.board[startX][startY]

        let checkXPlus = startX + 1
        let checkXMinus = startX - 1
        let checkYPlus = startY + 1
        let checkYMinus = startY - 1

        if (currentSquare.player.color === "#E1000E") {
            if(currentSquare.player.special) {
                if(this.isDiagonalEnemy(startX, startY, checkXMinus, checkYMinus) && this.isThirdEmpty(checkXMinus-1, checkYMinus-1)) {
                    if (this.isSameSquare(changingX, changingY, checkXMinus-1, checkYMinus-1)) {
                        return true
                    }
                } 
                if(this.isDiagonalEnemy(startX, startY, checkXMinus, checkYPlus) && this.isThirdEmpty(checkXMinus-1, checkYPlus+1)) {
                    if (this.isSameSquare(changingX, changingY, checkXMinus-1, checkYPlus+1)) {
                        return true
                    }
                } 
            }
            if(this.isDiagonalEnemy(startX, startY, checkXPlus, checkYMinus) && this.isThirdEmpty(checkXPlus+1, checkYMinus-1)) {
                if (this.isSameSquare(changingX, changingY, checkXPlus+1, checkYMinus-1)) {
                    return true
                }
            } 
            if(this.isDiagonalEnemy(startX, startY, checkXPlus, checkYPlus) && this.isThirdEmpty(checkXPlus+1, checkYPlus+1)) {
                if (this.isSameSquare(changingX, changingY, checkXPlus+1, checkYPlus+1)) {
                    return true
                }
            } 
        } else { // BLACK PEICES NOW
            if(currentSquare.player.special) {
                if(this.isDiagonalEnemy(startX, startY, checkXPlus, checkYMinus) && this.isThirdEmpty(checkXPlus+1, checkYMinus-1)) {
                    if (this.isSameSquare(changingX, changingY, checkXPlus+1, checkYMinus-1)) {
                        return true
                    }
                } 
                if(this.isDiagonalEnemy(startX, startY, checkXPlus, checkYPlus) && this.isThirdEmpty(checkXPlus+1, checkYPlus+1)) {
                    if (this.isSameSquare(changingX, changingY, checkXPlus+1, checkYPlus+1)) {
                        return true
                    }
                } 
            }
            if(this.isDiagonalEnemy(startX, startY, checkXMinus, checkYMinus) && this.isThirdEmpty(checkXMinus-1, checkYMinus-1)) {
                if (this.isSameSquare(changingX, changingY, checkXMinus-1, checkYMinus-1)) {
                    return true
                }
            } 
            if(this.isDiagonalEnemy(startX, startY, checkXMinus, checkYPlus) && this.isThirdEmpty(checkXMinus-1, checkYPlus+1)) {
                if (this.isSameSquare(changingX, changingY, checkXMinus-1, checkYPlus+1)) {
                    return true
                }
            }
        }

        return false
    }

    possibleYCheck(startY: number): number[] { // col
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

    possibleXCheck(startX: number, startY: number): number[] {
        let possibleX: number[] = []
        if (startX === 0 || startX === 7) {
            if (startX === 0) {
                possibleX.push(startX + 1)
            } else {
                possibleX.push(startX - 1)
            }  
        } else {
            if (this.board[startX][startY].player.special) {
                possibleX.push(startX + 1)
                possibleX.push(startX - 1)
            } else {
                if (this.board[startX][startY].player.color === "#E1000E") {
                    possibleX.push(startX + 1)
                } else {
                    possibleX.push(startX - 1)
                }
            }
        }

        return possibleX
    }
}