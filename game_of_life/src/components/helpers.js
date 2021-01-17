export function create_cells(cells, rowCount, columnCount, aliveProbability) {
    cells.splice(0, cells.length)
    let count = 0;
    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < columnCount; c++) {
            cells.push({
                key: count++,
                isAlive: randomAlive(aliveProbability),
                row: r + 1,
                column: c + 1
            })
        }
    }

    return cells;
}

export function map_cells_to_game(cells, game) {
    cells.forEach(cell => {
        game.SetCell(cell.row - 1, cell.column - 1, cell.isAlive);
    });
}

export function map_game_to_cells(game, cells) {
    cells.forEach(cell => {
        cell.isAlive = game.IsAlive(cell.row - 1, cell.column - 1);
    });
}

function randomAlive(aliveProbability) {
    return Math.random() < aliveProbability;
}
