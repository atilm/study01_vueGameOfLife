import GameOfLife from "../../src/components/gameOfLife"
import GameBuilder from "./gameBuilder"

test('game counts neighbours correctly', () => {
    let testCases = [
        {
            cells: [
                [1, 1, 1],
                [0, 0, 0],
                [0, 0, 0]
            ],
            at: [1, 1],
            expected: 3
        },
        {
            cells: [
                [1, 0, 0],
                [1, 0, 0],
                [1, 0, 0]
            ],
            at: [1, 1],
            expected: 3
        },
        {
            cells: [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ],
            at: [1, 1],
            expected: 8
        },
        {
            cells: [
                [0, 0, 0],
                [0, 1, 0],
                [0, 0, 0]
            ],
            at: [1, 1],
            expected: 0
        },
        {
            cells: [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 0]
            ],
            at: [1, 2],
            expected: 3
        }
    ];

    testCases.forEach(tc => {
        let game = new GameBuilder()
            .WithInitialCells(tc.cells)
            .Build();

        expect(game.count_neighbours(tc.at[0], tc.at[1])).toBe(tc.expected);
    })
})

test('game evolves correctly', () => {
    let testCases = [
        {
            initial: [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 0]
            ],
            evolved: [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 0]
            ]
        },
        {
            initial: [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 0]
            ],
            evolved: [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 0]
            ]
        }
    ];

    testCases.forEach(tc => {
        let game = new GameBuilder()
            .WithInitialCells(tc.initial)
            .Build();
        
        game.Evolve();

        assert_game(tc.evolved, game);
    });
})

function assert_game(expectedCells, game) {
    expectedCells.map((row, r) =>
        row.map((value, c) => 
            expect(game.IsAlive(r, c)).toBe(alive(value))
    ));
}

function alive(expectedValue) {
    return expectedValue != 0;
}