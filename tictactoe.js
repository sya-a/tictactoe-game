// importing user input library
const prompt = require("prompt-sync")({ sigint: true });

function initializeBoard() {
  return {
    1: " ",
    2: " ",
    3: " ",
    4: " ",
    5: " ",
    6: " ",
    7: " ",
    8: " ",
    9: " ",
  };
}

function printBoard(board) {
  console.log(`
    ${board[1]} | ${board[2]} | ${board[3]}
    ---------
    ${board[4]} | ${board[5]} | ${board[6]}
    ---------
    ${board[7]} | ${board[8]} | ${board[9]}`);
}

// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position, board) {
  position = Number(position);
  if (
    isNaN(position) ||
    position < 1 ||
    position > 9 ||
    board[position] !== " "
  ) {
    return false;
  }
  return true;
}

// TODO: implement a logic to check if the previous winner just won
// This method should return true or false
function checkWin(player, board) {
  const winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  for (const combination of winCombinations) {
    const [a, b, c] = combination;
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }
  return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, a tie basically means the whole board is already occupied
// This function should return true if the board is full
function checkFull(board) {
  for (let position = 1; position <= 9; position++) {
    if (board[position] === " ") {
      return false;
    }
  }
  return true;
}

// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or a tie, etc
function playTurn(player, board) {
  console.log(`Player ${player}'s turn.`);
  let validMove = false;

  while (!validMove) {
    const position = prompt("Enter your move (1-9): ");
    if (validateMove(position, board)) {
      board[position] = player;
      validMove = true;
    } else {
      console.log("Invalid move. Please try again.");
    }
  }

  printBoard(board);

  if (checkWin(player, board)) {
    console.log(`Player ${player} wins!`);
    return player;
  } else if (checkFull(board)) {
    console.log("It's a tie!");
    return "tie";
  } else {
    return null;
  }
}

// entry point of the whole program
let restart = true;

while (restart) {
  console.log("Tic-Tac-Toe Game");
  let board = initializeBoard();
  printBoard(board);

  let winnerIdentified = false;
  let currentTurnPlayer = "X";

  while (!winnerIdentified) {
    currentTurnPlayer = currentTurnPlayer === "X" ? "O" : "X"; // Switch player here
    winnerIdentified = playTurn(currentTurnPlayer, board);

    if (
      winnerIdentified === "X" ||
      winnerIdentified === "O" ||
      winnerIdentified === "tie"
    ) {
      break;
    }
  }

  const playAgain = prompt("Play again? (yes/no): ");
  if (playAgain.toLowerCase() !== "yes") {
    restart = false;
    console.log("Thanks for playing! Goodbye.");
  }
}
