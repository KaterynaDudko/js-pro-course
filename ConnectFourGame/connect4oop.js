"use strict";

// TODO make all variables and methods private
// TODO add player class
// TODO add restart support
// TODO add change collor support

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    // array of rows, each row is array of cells  (board[y][x])
    // (board[5][0] would be the bottom-left spot on the board)
    this.board = this.#makeBoard();
    this.#makeHtmlBoard();

    // active player: 1 or 2
    this.currPlayer = 1;
  }

  // makeBoard: fill in `board` with null values
  #makeBoard() {
    const board = [];
    for (let y = 0; y < this.height; y++) {
      const emptyRow = Array.from({ length: this.width }).fill(null);
      board.push(emptyRow);
    }
    return board;
  }

  /** makeHtmlBoard: make HTML table and row of column tops. */

  #makeHtmlBoard() {
    const htmlBoard = document.getElementById("board");

    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", `top-${x}`);
      headCell.addEventListener("click", this.#handleClick.bind(this));
      top.append(headCell);
    }
    htmlBoard.append(top);

    /*  dynamically creates the main part of html board
     ** uses HEIGHT to create table rows
     ** uses WIDTH to create table cells for each row */

    for (let y = 0; y < this.height; y++) {
      const row = document.createElement("tr");

      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `c-${y}-${x}`);
        row.append(cell);
      }

      htmlBoard.append(row);
    }
  }

  /** handleClick: handle click of column top to play piece */

  #handleClick(evt) {
    // get x from ID of clicked cell
    const x = Number(evt.target.id.slice("top-".length));

    // get next spot in column (if none, ignore click)
    const y = this.#findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.#placeInTable(y, x);

    // check for win
    if (this.#checkForWin()) {
      return this.#endGame(`Player ${this.currPlayer} won!`);
    }

    // check for tie: if top row is filled, board is filled
    if (this.board[0].every((cell) => cell !== null)) {
      return this.#endGame("Tie!");
    }

    // switch players
    this.currPlayer = this.currPlayer === 1 ? 2 : 1;
  }

  /** findSpotForCol: given column x, return y coordinate of furthest-down spot
   *    (return null if filled) */

  #findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (this.board[y][x] === null) {
        return y;
      }
    }
    return null;
  }

  /** placeInTable: update DOM to place piece into HTML table of board */

  #placeInTable(y, x) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.classList.add(`p${this.currPlayer}`);

    const spot = document.getElementById(`c-${y}-${x}`);
    spot.append(piece);
  }

  /** endGame: announce game end */

  #endGame(msg) {
    alert(msg);
  }

  #checkIfWon(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < this.height &&
        x >= 0 &&
        x < this.width &&
        this.board[y][x] === this.currPlayer
    );
  }
  /** checkForWin: check board cell-by-cell for "does a win start here?" */

  #checkForWin() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3],
        ];
        const vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x],
        ];
        const diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3],
        ];
        const diagDL = [
          [y, x],
          [y + 1, x - 1],
          [y + 2, x - 2],
          [y + 3, x - 3],
        ];

        // find winner (only checking each win-possibility as needed)
        if (
          this.#checkIfWon(horiz) ||
          this.#checkIfWon(vert) ||
          this.#checkIfWon(diagDR) ||
          this.#checkIfWon(diagDL)
        ) {
          return true;
        }
      }
    }
    return false;
  }
}

const game = new Game(7, 6);
