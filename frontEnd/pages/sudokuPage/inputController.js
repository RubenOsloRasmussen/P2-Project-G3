export class InputController {
  constructor(board, renderer) {
    this.board = board;
    this.renderer = renderer;
  }

  clickCell(e) {
    let targetCell = e.currentTarget.sudokuCell;
    this.board.selectCell(targetCell.rowIndex, targetCell.columnIndex);
    this.renderer.renderCells();
  }

  keydown(e) {
    if (this.board.notationMode == "defaultNotation") {
      if ((/^[1-9]$/.test(e.key))) {
        this.board.insertCellNumber(this.board.targetCell, e.key);
        this.board.clearCandidates(this.board.targetCell);

        this.checkWin();

      } else if (e.key == "Backspace") {
        this.board.deleteCellNumber(this.board.targetCell)
      }

    } else if (this.board.notationMode == "cornerNotation") {
      if (!(/^[1-9]$/.test(e.key)) || this.board.targetCell.number) return;

      const cornerNotation = this.board.targetCell.candidateBlock.cornerNotation;

      if (cornerNotation.topCornerCandidates.includes(e.key) || cornerNotation.bottomCornerCandidates.includes(e.key)) {
        this.board.targetCell.candidateBlock.removeCandidate(e.key);
      } else {
        this.board.targetCell.candidateBlock.insertCandidate(e.key);
      }
    } else if (this.board.notationMode == "centerNotation") {

      if (!(/^[1-9]$/.test(e.key)) || this.board.targetCell.number) return;

      console.log(this.board.targetCell.candidateBlock)
      const centerNotation = this.board.targetCell.candidateBlock.centerNotation;

      if (centerNotation.centerCandidates.includes(e.key)) {
        this.board.targetCell.candidateBlock.removeCandidate(e.key);
      } else {
        this.board.targetCell.candidateBlock.insertCandidate(e.key);
      }
    }

    this.renderer.renderCells();
  }

    /**
   * This function checks whether the Sudoku board is complete and triggers the win state.
   * It displays the win popup and applies win styling if the board is full.
   * @returns 
   */
  checkWin() {
    console.log("Running win check function");
    const winPopUp = document.getElementById("win-pop-up");

    if (!winPopUp.classList.contains("Hidden")) return;

    if (this.board.isBoardFull()) {
      console.log("Board is full, checking if correct...");
      const sudokuBoardElement = document.getElementById("sudoku-board-container-id");

      sudokuBoardElement.classList.add("BoardWon");
      winPopUp.classList.remove("Hidden");
    }
    else {
      console.log("Board is not full, cannot win yet.");
    }
  }
}