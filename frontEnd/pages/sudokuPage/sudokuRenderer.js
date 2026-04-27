export class SudokuRenderer {
  constructor(board) {
    this.board = board;
    this.fontWeight = "400";
    this.DEFAULT_HIGHLIGHT_COLOUR = "#e2edff"
    this.TARGET_COLOUR = "#bbd0f5";
    this.SIMILAR_NUMBER_COLOUR = "#a1bded";
    this.DEFAULT_CELL_COLOUR = "#ffffff";
    this.DEFAULT_FONT_COLOR = "#4168A9";
  }

  setupBoard() {
        let sudokuBoardElements = document.getElementsByClassName("SudokuBlockClass");

        for (let rowIndex = 0; rowIndex <= 8; rowIndex++) {
            for (let columnIndex = 0; columnIndex <= 8; columnIndex++) {
                let blockNumber = this.board.getBlockNumber(rowIndex, columnIndex, sudokuBoardElements);

               // https://www.w3schools.com/Js/js_htmldom_methods.asp
                let sudokuHtmlCell = document.createElement("div");
                this.board.sudokuCells[rowIndex][columnIndex].htmlElement = sudokuHtmlCell;

                let sudokuColourCell = document.createElement("div");
                sudokuColourCell.setAttribute("class", "SudokuColourCell");
                this.board.sudokuCells[rowIndex][columnIndex].htmlColourCell = sudokuColourCell;
                sudokuHtmlCell.appendChild(sudokuColourCell);

                let textElement = document.createElement("div");
                textElement.classList.add("CellText");
                this.board.sudokuCells[rowIndex][columnIndex].htmlTextElement = textElement;
                sudokuHtmlCell.appendChild(textElement);
                
                if (this.board.sudokuCells[rowIndex][columnIndex].number) {
                    textElement.textContent = this.board.sudokuCells[rowIndex][columnIndex].number;
                    sudokuHtmlCell.setAttribute("class", "SudokuCell LockedCell");
                } else {
                    textElement.textContent = "";
                    sudokuHtmlCell.setAttribute("class", "SudokuCell");
                }
                sudokuHtmlCell.sudokuCell = this.board.sudokuCells[rowIndex][columnIndex];
                if (this.board.sudokuCells[rowIndex][columnIndex].locked) {
                    sudokuHtmlCell.style.fontWeight = this.fontWeight;
                } else {
                    sudokuHtmlCell.style.color = this.DEFAULT_FONT_COLOR;
                }
                sudokuHtmlCell.style.fontSize = "30px";
    
                sudokuBoardElements[blockNumber].appendChild(sudokuHtmlCell);
            }
        }
    }

    buildNotationBlock() {
        let notationHtmlBlock = document.createElement("div");
        // add notation cells
        let notationTopRow = document.createElement("div");
        notationTopRow.setAttribute("class", "TopCornerNotation NotationBlock")
        let notationCenterRow = document.createElement("div");
        notationCenterRow.setAttribute("class", "CenterNotation NotationBlock")
        let notationBottomRow = document.createElement("div");
        notationBottomRow.setAttribute("class", "BottomCornerNotation NotationBlock")

        for (let i = 0; i <= 11; i++) {
            let notationCell = document.createElement("div");
            notationCell.setAttribute("class", "NotationNumber");
            notationCell.textContent = 1;

            if (i <= 3) {
                notationTopRow.appendChild(notationCell);
            } else if (i <= 7) {
                notationCenterRow.appendChild(notationCell);
            } else {
                notationBottomRow.appendChild(notationCell);
            }
        }

        notationHtmlBlock.appendChild(notationTopRow);
        notationHtmlBlock.appendChild(notationCenterRow);
        notationHtmlBlock.appendChild(notationBottomRow);

        e.currentTarget.appendChild(notationHtmlBlock);

        let cornerNotation = new CornerNotation(notationTopRow, notationBottomRow);
        let centerNotation = new CenterNotation(notationCenterRow);

        let notationBlock = new NotationBlock(cornerNotation, centerNotation);
        return notationBlock;
    }

    bindCellEvents() {
        let sudokuBoardElements = document.getElementsByClassName("SudokuBlockClass");

        for (let blockIndex = 0; blockIndex <= 8; blockIndex++) {
            for (const sudokuHtmlCell of sudokuBoardElements[blockIndex].children) {
                this.bindSelectEvent(sudokuHtmlCell);
            }
        }

        document.addEventListener("keydown", (e) => {
            console.log("jjj")
            this.board.inputController.keydown(e);
        });
    }

    bindSelectEvent(sudokuHtmlCell) {
        sudokuHtmlCell.addEventListener("click", (e) => {
            this.board.inputController.clickCell(e);
        });
    }

    bindNotationEvents() {
        let notationBoxNotation = document.getElementsByClassName("NotationBoxNotation");
        let notationBoxCornerNotation = document.getElementsByClassName("NotationBoxCornerNotation");
        let notationBoxCenterNotation = document.getElementsByClassName("NotationBoxCenterNotation");
        let notationBoxColorCell = document.getElementsByClassName("NotationBoxColorCell");

        notationBoxNotation[0].addEventListener("click", () => {
            this.board.setNotationMode("defaultNotation");
        })

        notationBoxCornerNotation[0].addEventListener("click", () => {
            this.board.setNotationMode("cornerNotation");
        })

        notationBoxCenterNotation[0].addEventListener("click", () => {
            this.board.setNotationMode("centerNotation");
        })

        notationBoxColorCell[0].addEventListener("click", () => {
            this.board.setNotationMode("colorNotation");
        })
    }

  renderCells() {
    for (let r = 0; r <= 8; r++) {
        for (let c = 0; c <= 8; c++) {
            let sudokuCell = this.board.sudokuCells[r][c];
            
            sudokuCell.htmlTextElement.textContent = sudokuCell.number ? sudokuCell.number : "";
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

            if (sudokuCell.cellColour != "#ffffff") sudokuCell.htmlColourCell.style.backgroundColor = sudokuCell.cellColour;
        }
    }
  }
}