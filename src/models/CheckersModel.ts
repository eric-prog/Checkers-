import { PlayerModel } from "./PlayerModel";
import { SquareModel } from "./SquareModel";

export class CheckersModel {
    
    /**
     * Returns a multidimensional array of Square objects
     *
     * @param {}
     * @return {SquareModel[][]} returns a multidimensional array of Square objects
     */
    createBoard(): SquareModel[][] {
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
                           ["b", "s", "b", "s", "b", "s", "b", "s"]];

        for(let i = 0; i < 8; i++) {
            let squareArray: SquareModel[] = []
            for(let j = 0; j < 8; j++) {
                let singleSquare;
                if (player_board[i][j] === "r") {
                    singleSquare = new SquareModel(i, j, 120, 120, false, "", new PlayerModel("#E1000E", 100, 100, true, false))
                } else if (player_board[i][j] === "b") {
                    singleSquare = new SquareModel(i, j, 120, 120, false, "", new PlayerModel("black", 100, 100, false, false))
                } else {
                    singleSquare = new SquareModel(i, j, 120, 120, true, "", new PlayerModel("#773005", 100, 100, false, false))
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
}