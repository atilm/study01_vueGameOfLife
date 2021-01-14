export default class GameOfLife{
    constructor(rows, columns, aliveProbability) {
        let spec = {
            rowCount: rows,
            columnCount: columns,
            aliveProbability: aliveProbability
        };

        this.cellRows = this.createCells(spec);
    }

    IsAlive(row, column) {
        return this.cellRows[row][column];
    }

    RowCount() {
        return this.cellRows.length;
    }

    ColumnCount() {
        return this.cellRows[0].length;
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
            row.push(this.randomAlive(spec.aliveProbability));
        return row;
    }

    randomAlive(aliveProbability) {
        return Math.random() < aliveProbability;
    }
}