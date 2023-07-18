// Game state
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = 'X';
let gameOver = false;

// Function to make a move
function makeMove(row, col) {
    if (!gameOver && board[row][col] === '') {
        board[row][col] = currentPlayer;
        document.getElementById('board').children[row].children[col].innerText = currentPlayer;
        checkWin();
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    }
}

// Function to check for a win
function checkWin() {
    const winningCombinations = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (let combination of winningCombinations) {
        const [[r1, c1], [r2, c2], [r3, c3]] = combination;

        if (
            board[r1][c1] !== '' &&
            board[r1][c1] === board[r2][c2] &&
            board[r2][c2] === board[r3][c3]
        ) {
            gameOver = true;
            highlightWin(combination);
            announceWinner(board[r1][c1]);
            break;
        }
    }

    if (!gameOver && isBoardFull()) {
        gameOver = true;
        announceDraw();
    }
}

// Function to highlight the winning combination
function highlightWin(combination) {
    for (let [row, col] of combination) {
        document.getElementById('board').children[row].children[col].classList.add('win');
    }
}

// Function to announce the winner
function announceWinner(winner) {
    document.getElementById('board').classList.add('game-over');
    document.getElementById('message').innerText = `Player ${winner} wins!`;
}

// Function to announce a draw
function announceDraw() {
    document.getElementById('board').classList.add('game-over');
    document.getElementById('message').innerText = "It's a draw!";
}

// Function to reset the game
function resetGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
    gameOver = false;

    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        cell.innerText = '';
        cell.classList.remove('win');
    }

    document.getElementById('board').classList.remove('game-over');
    document.getElementById('message').innerText = '';
}

// Function to check if the board is full
function isBoardFull() {
    for (let row of board) {
        if (row.includes('')) {
            return false;
        }
    }
    return true;
}
