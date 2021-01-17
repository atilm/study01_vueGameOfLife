export function create_cells(game) {
    let cells = [];
    update_cells(game, cells);
    return cells;
}

export function update_cells(game, cells) {
    cells.splice(0, cells.length)
    let count = 0;
    for (let r = 0; r < game.RowCount(); r++) {
        for (let c = 0; c < game.ColumnCount(); c++) {
            cells.push({
                key: count++,
                isAlive: game.IsAlive(r, c),
                row: r + 1,
                column: c + 1
            })
        }
    }
}