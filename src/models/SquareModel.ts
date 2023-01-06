import { PlayerModel } from "./PlayerModel";

export class SquareModel {
    row: number;
    col: number;
    width: number;
    height: number;
    empty: boolean;
    square_color: string;
    player: PlayerModel;

    constructor(row: number, col: number, width: number, height: number, empty: boolean, square_color: string, player: PlayerModel) {
        this.row = row;
        this.col = col;
        this.width = width;
        this.height = height;
        this.empty = empty;
        this.square_color = square_color;
        this.player = player;
    }
}