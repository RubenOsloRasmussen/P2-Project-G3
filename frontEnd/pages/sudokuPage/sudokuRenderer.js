export class SudokuRenderer {
  constructor(board) {
    this.board = board;
    this.fontWeight = "900";
    this.DEFAULT_HIGHLIGHT_COLOUR = "#e2edff"
    this.TARGET_COLOUR = "#bbd0f5";
    this.SIMILAR_NUMBER_COLOUR = "#a1bded";
    this.DEFAULT_CELL_COLOUR = "#ffffff";
  }

  setupBoard() {
        let sudokuBoardElements = document.getElementsByClassName("SudokuBlockClass");

        for (let rowIndex = 0; rowIndex <= 8; rowIndex++) {
            for (let columnIndex = 0; columnIndex <= 8; columnIndex++) {
                let blockNumber = this.board.getBlockNumber(rowIndex, columnIndex, sudokuBoardElements);

               // https://www.w3schools.com/Js/js_htmldom_methods.asp
                let sudokuHtmlCell = document.createElement("div");
                this.board.sudokuCells[rowIndex][columnIndex].htmlElement = sudokuHtmlCell;

                if (this.board.sudokuCells[rowIndex][columnIndex].number) {
                    sudokuHtmlCell.textContent = this.board.sudokuCells[rowIndex][columnIndex].number;
                    sudokuHtmlCell.setAttribute("class", "SudokuCell LockedCell");
                } else {
                    sudokuHtmlCell.textContent = "";
                    sudokuHtmlCell.setAttribute("class", "SudokuCell");
                }
                sudokuHtmlCell.sudokuCell = this.board.sudokuCells[rowIndex][columnIndex];
                if (this.board.sudokuCells[rowIndex][columnIndex].locked) sudokuHtmlCell.style.fontWeight = this.fontWeight;
                sudokuBoardElements[blockNumber].appendChild(sudokuHtmlCell);
            }
        }
    }

    bindEvents() {
        this.bindCellSelectEvent();
    }

    bindCellSelectEvent() {
        let sudokuBoardElements = document.getElementsByClassName("SudokuBlockClass");

        for (let blockIndex = 0; blockIndex <= 8; blockIndex++) {
            for (const sudokuHtmlCell of sudokuBoardElements[blockIndex].children) {
                sudokuHtmlCell.addEventListener("click", (e) => {
                    this.board.inputController.clickCell(e);
                });
            }
        }
    }

  renderCells() {
    for (let r = 0; r <= 8; r++) {
        for (let c = 0; c <= 8; c++) {
            let sudokuCell = this.board.sudokuCells[r][c];

            sudokuCell.htmlElement.textContent = sudokuCell.number ? sudokuCell.number : "";

            if (sudokuCell.isHighlighted) {
                if (sudokuCell.isTargetCell) {
                    sudokuCell.htmlElement.style.backgroundColor = this.TARGET_COLOUR;
                } else if (sudokuCell.isSimilarNumber) {
                    sudokuCell.htmlElement.style.backgroundColor = this.SIMILAR_NUMBER_COLOUR;
                } else {
                    sudokuCell.htmlElement.style.backgroundColor = this.DEFAULT_HIGHLIGHT_COLOUR;
                }
            } else {
                sudokuCell.htmlElement.style.backgroundColor = this.DEFAULT_CELL_COLOUR;
            }
        }
    }
  }
}