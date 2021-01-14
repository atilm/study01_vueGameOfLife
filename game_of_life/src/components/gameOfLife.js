export default class GameOfLife{
    constructor(rows, columns, aliveProbability) {
        this.rowCount = rows;
        this.columnCount = columns;
        this.aliveProbability = aliveProbability;

        this.cellRows = this.createCells(rows, columns, aliveProbability);
    }

    IsAlive(row, column) {
        return this.cellRows[row][column];
    }

    RowCount() {
        return this.rowCount;
    }

    ColumnCount() {
        return this.columnCount;
    }

    createCells(rowCount, columnCount, aliveProbability) {
        let rows = []
        for (let r = 0; r < rowCount; r++)
            rows.push(this.createRow(columnCount, aliveProbability));
        return rows;
    }

    createRow(columnCount, aliveProbability) {
        let row = []
        for (let c = 0; c < columnCount; c++)
            row.push(this.randomAlive(aliveProbability));
        return row;
    }

    randomAlive(aliveProbability) {
        return Math.random() < aliveProbability;
    }
}