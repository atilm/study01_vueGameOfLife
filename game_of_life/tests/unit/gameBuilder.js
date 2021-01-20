import GameOfLife from "../../src/components/gameOfLife"

export default class GameBuilder {
    constructor() {
        this.initial_cells = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
    }

    Build() {
        let rowCount = this.initial_cells.length;
        let columnCount = this.initial_cells[0].length;
        let game = new GameOfLife(rowCount, columnCount);

        for (let r = 0; r < rowCount; r++)
            for (let c = 0; c < columnCount; c++) {
                game.SetCell(r, c, this.initial_cells[r][c] != 0);
            }
    
        return game;
    }

    WithInitialCells(cells) {
        this.initial_cells = cells;
        return this;
    }
}