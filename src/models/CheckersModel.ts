import { PlayerModel } from "./PlayerModel";
import { SquareModel } from "./SquareModel";

export class CheckersModel {
    createBoard() {
        var checkersBoard: SquareModel[][] = []
        let player_board = [["-", "r", "-", "r", "-", "r", "-", "r"],
                            ["r", "-", "r", "-", "r", "-", "r", "-"],
                            ["-", "r", "-", "r", "-", "r", "-", "r"],
                            ["-", "-", "-", "-", "-", "-", "-", "-"],
                            ["-", "-", "-", "-", "-", "-", "-", "-"],
                            ["b", "-", "b", "-", "b", "-", "b", "-"],
                            ["-", "b", "-", "b", "-", "b", "-", "b"],
                            ["b", "-", "b", "-", "b", "-", "b", "-"]];
        let color_board = [["s", "b", "s", "b", "s", "b", "s", "b"],
                           ["b", "s", "b", "s", "b", "s", "b", "s"],
                           ["s", "b", "s", "b", "s", "b", "s", "b"],
                           ["b", "s", "b", "s", "b", "s", "b", "s"],
                           ["s", "b", "s", "b", "s", "b", "s", "b"],
                           ["b", "s", "b", "s", "b", "s", "b", "s"],
                           ["s", "b", "s", "b", "s", "b", "s", "b"],
                           ["b", "s", "b", "s", "b", "s", "b", "s"],];

        for(let i = 0; i < 8; i++) {
            let squareArray: SquareModel[] = []
            for(let j = 0; j < 8; j++) {
                let singleSquare;
                if (player_board[i][j] === "r") {
                    singleSquare = new SquareModel(i, j, 120, 120, false, "", new PlayerModel("#E1000E", 100, 100, true, 12, false))
                } else if (player_board[i][j] === "b") {
                    singleSquare = new SquareModel(i, j, 120, 120, false, "", new PlayerModel("black", 100, 100, false, 12, false))
                } else {
                    singleSquare = new SquareModel(i, j, 120, 120, true, "", new PlayerModel("#773005", 100, 100, false, 12, false))
                }

                if (color_board[i][j] === "s") {
                    singleSquare.square_color = "#e0ac69"
                } else {
                    singleSquare.square_color = "#773005"
                }
                squareArray.push(singleSquare)
            }
            checkersBoard.push(squareArray)
        }
        return checkersBoard
    }

    possibleMove(changingX: number, changingY: number, startX: number, startY: number) {
        
    }

    // possibleMove(changingX: number, changingY: number, startX: number, startY: number): boolean {
    //     // if (square.empty) {
    //     //     return false
    //     // }

    //     // let possibleX = this.possibleXCheck(square)
    //     // let possibleY = this.possibleYCheck(square)
    //     // let possibleAttack = this.possibleAttack(square)

    //     // for loops

    //     // if (finalX === -1 || finalY === -1 || board.board[finalX][finalY].empty === false) {
    //     //     return false
    //     // }
    //     return true
    // }

    // possibleAttack(square: SquareModel) {
    //     let possibleAttack: number[][] = []
    //     return possibleAttack
    // }

    // possibleXCheck(square: SquareModel) { // Col 
    //     let possibleX: number[] = []
    //     if (square.col === 0 || square.col === 7) {
    //         if (square.col === 0) { 
    //             possibleX.push(square.col + 1)
    //         } else {              
    //             possibleX.push(square.col - 1)
    //         }
    //     } else {
    //         possibleX.push(square.col + 1)
    //         possibleX.push(square.col - 1)
    //     }

    //     return possibleX
    // }          

    // possibleYCheck(square: SquareModel) { // Row
    //     let possibleY: number[] = []
    //     if (square.row === 0 || square.row === 7) {
    //         if (square.row === 0) {
    //             possibleY.push(square.row + 1)
    //         } else {
    //             possibleY.push(square.row - 1)
    //         }  
    //     } else {
    //         if (square.player.special) {
    //             possibleY.push(square.row + 1)
    //             possibleY.push(square.row - 1)
    //         } else {
    //             if (square.player.color === "#E1000E") {
    //                 possibleY.push(square.row + 1)
    //             } else {
    //                 possibleY.push(square.row - 1)
    //             }
    //         }
    //     }

    //     return possibleY
    // }
}