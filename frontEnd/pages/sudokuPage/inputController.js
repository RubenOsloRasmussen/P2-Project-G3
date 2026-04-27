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
        } else if (e.key == "Backspace") {
          this.board.deleteCellNumber(this.board.targetCell)
        }

    } else if (this.board.notationMode == "cornerNotation") {
      const cornerNotation = this.board.targetCell.candidateBlock.cornerNotation;
    } else if (this.board.notationMode == "centerNotation") {

    } else if (this.board.colorNotation == "colorNotation") {

    }
    
    this.renderer.renderCells();
  }

}

