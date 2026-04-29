import { CandidateBlock, CornerNotation, CenterNotation } from "./notations.js"

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

                this.board.sudokuCells[rowIndex][columnIndex].candidateBlock = this.buildCandidateBlock();
                sudokuHtmlCell.appendChild(this.board.sudokuCells[rowIndex][columnIndex].candidateBlock.htmlElement);

                sudokuBoardElements[blockNumber].appendChild(sudokuHtmlCell);
            }
        }
    }

    buildCandidateBlock() {
        let candidateHtmlBlock = document.createElement("div");
        candidateHtmlBlock.setAttribute("class", "candidateBlock");
        // add notation cells
        let notationTopRow = document.createElement("div");
        notationTopRow.setAttribute("class", "TopCornerNotation NotationRow")
        let notationCenterRow = document.createElement("div");
        notationCenterRow.setAttribute("class", "CenterNotation NotationRow")
        let notationBottomRow = document.createElement("div");
        notationBottomRow.setAttribute("class", "BottomCornerNotation NotationRow")

        candidateHtmlBlock.appendChild(notationTopRow);
        candidateHtmlBlock.appendChild(notationCenterRow);
        candidateHtmlBlock.appendChild(notationBottomRow);

        let cornerNotation = new CornerNotation(notationTopRow, notationBottomRow);
        let centerNotation = new CenterNotation(notationCenterRow);

        let candidateBlock = new CandidateBlock(this.board, candidateHtmlBlock, cornerNotation, centerNotation);
        return candidateBlock;
    }

    bindCellEvents() {
        let sudokuBoardElements = document.getElementsByClassName("SudokuBlockClass");

        for (let blockIndex = 0; blockIndex <= 8; blockIndex++) {
            for (const sudokuHtmlCell of sudokuBoardElements[blockIndex].children) {
                this.bindSelectEvent(sudokuHtmlCell);
            }
        }

        document.addEventListener("keydown", (e) => {
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

        for (const button of notationBoxColorCell) {
            button.addEventListener("click", (e) => {
                const color = e.currentTarget.dataset.color; // e.g. "red"

                const capitalized = color.charAt(0).toUpperCase()+color.slice(1);

                this.board.setNotationMode(`colorNotation${capitalized}`);
            });
        }
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
                    sudokuCell.htmlElement.style.backgroundColor = this.DEFAULT_CELL_COLOUR;
                }

            if (sudokuCell.cellColour != "#ffffff") sudokuCell.htmlColourCell.style.backgroundColor = sudokuCell.cellColour;

            this.renderCandidateBlock(sudokuCell.candidateBlock, this.board.notationMode);
        }
    }
  }

  renderCandidateBlock() {
    let candidateBlock = this.board.targetCell.candidateBlock;
    this.renderCornerNotation(candidateBlock);
    this.renderCenterNotation(candidateBlock);
  }

   renderCornerNotation(candidateBlock) {
    this.clearCornerNotation(candidateBlock);

    for (let i = 0; i < candidateBlock.cornerNotation.topCornerCandidates.length; i++) {
        this.addNotationHtmlCell(candidateBlock.cornerNotation.topCornerCandidates[i], "candidateTop", "cornerNotation", candidateBlock);
    }
    for (let i = 0; i < candidateBlock.cornerNotation.bottomCornerCandidates.length; i++) {
        this.addNotationHtmlCell(candidateBlock.cornerNotation.bottomCornerCandidates[i], "candidateBottom", "cornerNotation", candidateBlock);
    }
  }

  renderCenterNotation(candidateBlock) {
    this.clearCenterNotation(candidateBlock);
    for (let i = 0; i < candidateBlock.centerNotation.centerCandidates.length; i++) {
        this.addNotationHtmlCell(candidateBlock.centerNotation.centerCandidates[i], "none", "centerNotation", candidateBlock);
    }
  }

  addNotationHtmlCell(number, cornerNotationType, notationType, candidateBlock) {
    if (notationType == "cornerNotation") {
        if (cornerNotationType == "candidateTop") {
            if (candidateBlock.cornerNotation.topCornerCandidates.length <= 4) {
            const notationCell = this.buildNotationHtmlCell();
            notationCell.textContent = number;
            candidateBlock.cornerNotation.topCornerHTMLElement.appendChild(notationCell);
            }
        }
        if (cornerNotationType == "candidateBottom") {
            if (candidateBlock.cornerNotation.bottomCornerCandidates.length <= 4) {
                const notationCell = this.buildNotationHtmlCell();
                notationCell.textContent = number;
                candidateBlock.cornerNotation.bottomCornerHTMLElement.appendChild(notationCell);
            }
        }
    } else if (notationType == "centerNotation") {
        if (candidateBlock.centerNotation.centerCandidates.length <= 4) {
            const notationCell = this.buildNotationHtmlCell();
            notationCell.textContent = number;
            candidateBlock.centerNotation.htmlElement.appendChild(notationCell);
        }
    }
  }

  buildNotationHtmlCell() {
    let notationCell = document.createElement("div");
    notationCell.setAttribute("class", "NotationNumber");
    return notationCell;
  }

  clearCornerNotation(candidateBlock) {
    candidateBlock.cornerNotation.topCornerHTMLElement.textContent = "";
    candidateBlock.cornerNotation.bottomCornerHTMLElement.textContent = "";
  }

  clearCenterNotation(candidateBlock) {
    candidateBlock.centerNotation.htmlElement.textContent = "";
  }

}