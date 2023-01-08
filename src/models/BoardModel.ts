import { Dispatch, SetStateAction } from "react";
import { PlayerModel } from "./PlayerModel";
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

    endGame(loserX: number, loserY: number) {
        if (this.board[loserX][loserY].player.isComputer) {
            console.log("Computer won")
        } else {
            console.log("Player won")
        }
    }

    turn(turns: boolean, setTurn: Dispatch<SetStateAction<boolean>>, changingX: number, changingY: number, startX: number, startY: number) {
        if(this.possibleMove(turns, changingX, changingY, startX, startY)) {
            setTurn(!turns)
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

    changePos(startX: number, startY: number, changingX: number, changingY: number)  {
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

    possibleMove(turns: boolean, changingX: number, changingY: number, startX: number, startY: number): boolean {
        if (turns && this.board[startX][startY].player.isComputer) {
            return false
        } 
        if (turns === false && !this.board[startX][startY].player.isComputer) {
            return false
        } 
        if (this.isSquareEmpty(changingX, changingY) === false || this.isSameSquare(changingX, changingY, startX, startY) || this.isSameTeam(changingX, changingY, startX, startY)) {
            return false
        } 
        
        let possibleYArr = this.possibleYCheck(startY)
        let possibleXArr = this.possibleXCheck(startX, startY)
        let possibleAttack = this.possibleAttack(changingX, changingY, startX, startY)

        let possibleX = this.isInArr(possibleXArr, changingX)
        let possibleY = this.isInArr(possibleYArr, changingY)
        

        if(possibleX && possibleY) {
            this.changePos(startX, startY, changingX, changingY)
        } else if (possibleAttack) {
            this.changePos(startX, startY, changingX, changingY)

            let removeX = (startX + changingX)/2
            let removeY = (startY + changingY)/2

            this.board[removeX][removeY].player.num_peices -= 1

            if (this.board[removeX][removeY].player.num_peices === 0) {
                this.endGame(removeX, removeY);
            }

            this.board[removeX][removeY].player.special = false
            this.board[removeX][removeY].empty = true
        }

        return true
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