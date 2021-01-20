export default class GameOfLife{
    constructor(rows, columns) {
        let spec = {
            rowCount: rows,
            columnCount: columns,
        };

        this.rowCount = rows;
        this.columnCount = columns;
        this.cellRows = this.createCells(spec);
    }

    Evolve() {
        for (let r = 0; r < this.rowCount; r++)
            for (let c = 0; c < this.columnCount; c++){
                let neighbourCount = this.count_neighbours(r, c);
                this.cellRows[r][c] = this.evolve_cell(this.IsAlive(r,c), neighbourCount);
            }
    }

    IsAlive(row, column) {
        return this.cellRows[row][column];
    }

    SetCell(row, column, isAlive) {
        this.cellRows[row][column] = isAlive;
    }

    RowCount() {
        return this.rowCount;
    }

    ColumnCount() {
        return this.columnCount;
    }

    createCells(spec) {
        let rows = []
        for (let r = 0; r < spec.rowCount; r++)
            rows.push(this.createRow(spec));
        return rows;
    }

    createRow(spec) {
        let row = []
        for (let c = 0; c < spec.columnCount; c++)
            row.push(false);
        return row;
    }

    count_neighbours(row, column) {
        let neighbours = 0;
        for (let r = row - 1; r <= row + 1; r++)
            for (let c = column - 1; c <= column + 1; c++) {
                if (c == column && r == row)
                    continue;

                neighbours += this.count_neighbour(r, c);
            }
        
        return neighbours;
    }

    count_neighbour(row, column) {
        if (row < 0 || row >= this.rowCount)
            return 0;
        
        if (column < 0 || column >= this.columnCount)
            return 0;
        
        return this.IsAlive(row, column) ? 1 : 0;
    }

    evolve_cell(currentState, neighbourCount) {
        switch (neighbourCount) {
            case 3:
                return true;
            case 2:
                return currentState;
            default:
                return false;
        }
    }
}