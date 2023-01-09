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

    /**
     * Returns which player/user won
     *
     * @param {}
     * @return {string} Human or Computer or None
     */
    isGameOver(): string {
        if (this.numHumanPlayers === 0) {
            return "Human"
        } else if (this.numComputerPlayers === 0) {
            return "Computer"
        } else {
            return ""
        }
    }

    /**
     * Checks if the square is empty
     *
     * @param {number} row row of the multidimensional array (x) - (x,y)
     * @param {number} col column of the multidimensional array (y) - (x,y)
     * @return {boolean} true if square is empty
     */
    isSquareEmpty(row: number, col: number): boolean {
        if (this.board[row][col].empty) {
            return true
        }
        return false
    }

    /**
     * Checks if the square that the player is moving to is the same square
     *
     * @param {number} changingX the desired row/x position that the player wants to move to
     * @param {number} changingY the desired column/y position that the player wants to move to
     * @param {number} startX the original row/x position that the player 
     * @param {number} startY the original col/y position that the player 
     * @return {boolean} true if the position is equal
     */
    isSameSquare(changingX: number, changingY: number, startX: number, startY: number): boolean {
        if (changingX === startX && changingY === startY) {
            return true
        }
        return false
    }

    /**
     * Checks if the player in the square that the player wants to move to is the same colour/team
     *
     * @param {number} changingX the desired row/x position that the player wants to move to
     * @param {number} changingY the desired column/y position that the player wants to move to
     * @param {number} startX the original row/x position that the player 
     * @param {number} startY the original col/y position that the player 
     * @return {boolean} true if the color of the player is the same
     */
    isSameTeam(changingX: number, changingY: number, startX: number, startY: number): boolean {
        if (this.board[changingX][changingY].player.color === this.board[startX][startY].player.color) {
            return true
        }
        return false
    }

    /**
     * Checks if the coordinate number the player wants to move to is in an array of possible moves
     *
     * @param {number[]} possibleArr an array containing coordinate numbers which the player can move to
     * @param {number} target the desired column/y OR row/x position that the player wants to move to
     * @return {boolean} true if the target number of the player is in the array of possible moves
     */
    isInArr(possibleArr: number[], target: number): boolean {
        for(let i = 0; i < possibleArr.length; i++) {
            if (target === possibleArr[i]) {
                return true
            }
        }
        return false
    }


    /**
     * Human and Computer turn handler. Handles turns 
     *
     * @param {string} mode string indicator of the game mode - human vs human or human vs computer
     * @param {boolean} drop did the player drop the checker peices/make a move?
     * @param {Dispatch<SetStateAction<boolean>>} setDrop sets whether or not the user dropped a piece
     * @param {boolean} turns true or false. True is human, false is computer move
     * @param {Dispatch<SetStateAction<boolean>>} setTurn sets whose turn it is
     * @param {number} changingX the desired row/x position that the player wants to move to
     * @param {number} changingY the desired column/y position that the player wants to move to
     * @param {number} startX the original row/x position that the player 
     * @param {number} startY the original col/y position that the player 
     * @return {boolean} if the turn was complete/is valid
     */
    turn(mode: string, drop: boolean, setDrop: Dispatch<SetStateAction<boolean>>, turns: boolean, setTurn: Dispatch<SetStateAction<boolean>>, changingX: number, changingY: number, startX: number, startY: number): boolean {
        if (mode === "Computer" && turns === false) {
            
            for (let i = 0; i < 8; i++) { // computer checks if it can attack
                for (let j = 0; j < 8; j++) {
                    let currSquare = this.board[i][j]
                    let player = this.board[i][j].player
                    if (player.color === "#E1000E" && currSquare.empty === false) {
                        if (this.possibleMove(false, i + 2, j + 2, i, j)) {
                            setTurn(!turns)
                            setDrop(false)
                            return true
                        } else if (this.possibleMove(false, i - 2, j + 2, i, j)) {
                            setTurn(!turns)
                            setDrop(false)
                            return true
                        } else if (this.possibleMove(false, i + 2, j - 2, i, j)) {
                            setTurn(!turns)
                            setDrop(false)
                            return true
                        } else if (this.possibleMove(false, i - 2, j - 2, i, j)) {
                            setTurn(!turns)
                            setDrop(false)
                            return true
                        }
                    }
                }
            }

            for (let i = 0; i < 8; i++) { // second loop checks if it can just move diagonally
                for (let j = 0; j < 8; j++) {
                    let currSquare = this.board[i][j]
                    let player = this.board[i][j].player
                    if (player.color === "#E1000E" && currSquare.empty === false) {
                        if (this.possibleMove(false, i + 1, j + 1, i, j)) {
                            setTurn(!turns)
                            setDrop(false)
                            return true
                        } else if (this.possibleMove(false, i - 1, j + 1, i, j)) {
                            setTurn(!turns)
                            setDrop(false)
                            return true
                        } else if (this.possibleMove(false, i + 1, j - 1, i, j)) {
                            setTurn(!turns)
                            setDrop(false)
                            return true
                        } else if (this.possibleMove(false, i - 1, j - 1, i, j)) {
                            setTurn(!turns)
                            setDrop(false)
                            return true
                        }
                    }
                }
            }
            
            return true
        } else if(this.possibleMove(turns, changingX, changingY, startX, startY)) {
            setTurn(!turns)
            setDrop(false)
            return true
        } 
        return false
    }

    /**
     * Checks if the player is special (is a king)
     *
     * @param {PlayerModel} player the player obj
     * @param {number} changingX the desired row/x position that the player wants to move to
     * @param {number} changingY the desired column/y position that the player wants to move to
     * @return {boolean} true if the color of the player is special
     */
    isSpecial(player: PlayerModel, changingX: number): boolean {
        if(player.color === "#E1000E" && changingX === 7) {
            return true
        } else if (player.color === "black" && changingX === 0) {
            return true
        }
        return false
    }

    /**
     * Updates the positions of the board is a valid move is made 
     *
     * @param {number} startX the original row/x position that the player 
     * @param {number} startY the original col/y position that the player 
     * @param {number} changingX the desired row/x position that the player wants to move to
     * @param {number} changingY the desired column/y position that the player wants to move to
     * @return {} void function
     */
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


    /**
     * Checks if the position is out of the checker board
     *
     * @param {number} changingX the desired row/x position that the player wants to move to
     * @param {number} changingY the desired column/y position that the player wants to move to
     * @return {boolean} true if coordinate is out of bounds
     */
    outOfBoard(changingX: number, changingY: number): boolean {
        if (changingX > 7 || changingX < 0 || changingY > 7 || changingY < 0) {
            return true
        }   
        return false
    }

    /**
     * Checks all possible moves and returns true if the move is valid
     *
     * @param {boolean} turns the desired row/x position that the player wants to move to
     * @param {number} changingX the desired row/x position that the player wants to move to
     * @param {number} changingY the desired column/y position that the player wants to move to
     * @param {number} startX the original row/x position that the player 
     * @param {number} startY the original col/y position that the player 
     * @return {boolean} true if the move is valid
     */
    possibleMove(turns: boolean, changingX: number, changingY: number, startX: number, startY: number): boolean {
        let computerPlayer = this.board[startX][startY].player.isComputer
        if (turns && computerPlayer) {
            return false
        } 
        if (turns === false && !computerPlayer) {
            return false
        } 
        if (this.outOfBoard(changingX, changingY)) {
            return false
        }
        if (this.isSquareEmpty(changingX, changingY) === false || this.isSameSquare(changingX, changingY, startX, startY)) {
            return false
        } 

        let possibleYArr = this.possibleYCheck(startY)
        let possibleXArr = this.possibleXCheck(startX, startY)
        let possibleAttack = this.possibleAttack(changingX, changingY, startX, startY)

        let possibleX = this.isInArr(possibleXArr, changingX)
        let possibleY = this.isInArr(possibleYArr, changingY)

        if(possibleX && possibleY) {
            this.changePos(startX, startY, changingX, changingY)
            return true
        } else if (possibleAttack) {
            this.changePos(startX, startY, changingX, changingY)

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

    /**
     * Checks if the diagonal of the current square is an enemy player
     *
     * @param {number} startX the original row/x position that the player 
     * @param {number} startY the original col/y position that the player 
     * @param {number} targetX the diagonal row position
     * @param {number} targetY the diagonal column position
     * @return {boolean} true if the diagonal of the current square is an enemy player
     */
    isDiagonalEnemy(startX: number, startY: number, targetX: number, targetY: number): boolean {
        if (targetX < 0 || targetX > 7 || targetY < 0 || targetY > 7) {
            return false
        }
        if (this.isSquareEmpty(targetX, targetY) === false && (this.board[startX][startY].player.color !== this.board[targetX][targetY].player.color)) {
            return true
        } 
        return false  
    }

    /**
     * Checks if the square two squares away is empty
     *
     * @param {number} targetX the diagonal row position
     * @param {number} targetY the diagonal column position
     * @return {boolean} true if the square two positions away is empty
     */
    isThirdEmpty(targetX: number, targetY: number): boolean {
        if (targetX < 0 || targetX > 7 || targetY < 0 || targetY > 7) {
            return false
        }
        if (this.isSquareEmpty(targetX, targetY)) {
            return true
        } 
        return false  
    }

    /**
     * Checks if an attack is possible
     *
     * @param {number} changingX the desired row/x position that the player wants to move to
     * @param {number} changingY the desired column/y position that the player wants to move to
     * @param {number} startX the original row/x position that the player 
     * @param {number} startY the original col/y position that the player 
     * @return {boolean} true if the current checkers piece can attack
     */
    possibleAttack(changingX: number, changingY: number, startX: number, startY: number): boolean {
        
        const currentSquare = this.board[startX][startY]

        let checkXPlus = startX + 1
        let checkXMinus = startX - 1
        let checkYPlus = startY + 1
        let checkYMinus = startY - 1

        if (currentSquare.player.color === "#E1000E") { // RED PIECES
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
        } else { // BLACK PIECES 
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


    /**
     * Returns an array of numerical values of column positions that are possible
     *
     * @param {number} startY the original column/y position that the player 
     * @return {number[]} returns an array of numerical values of column positions that are possible
     */
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

    /**
     * Returns an array of numerical values of row positions that are possible
     *
     * @param {number} startX the original row/x position that the player 
     * @param {number} startY the original column/y position that the player 
     * @return {number[]} returns an array of numerical values of row positions that are possible
     */
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