export class PlayerModel {
    color: string;
    width: number;
    height: number;
    isComputer: boolean;
    special: boolean;

    constructor(color: string, width: number, height: number, isComputer: boolean, special: boolean) {
        this.color = color;
        this.width = width;
        this.height = height;
        this.isComputer = isComputer;
        this.special = special
    }
}