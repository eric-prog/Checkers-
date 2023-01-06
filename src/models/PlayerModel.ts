export class PlayerModel {
    color: string;
    width: number;
    height: number;
    isComputer: boolean;
    num_peices: number;
    special: boolean;

    constructor(color: string, width: number, height: number, isComputer: boolean, num_peices: number, special: boolean) {
        this.color = color;
        this.width = width;
        this.height = height;
        this.isComputer = isComputer;
        this.num_peices = num_peices;
        this.special = special
    }
}