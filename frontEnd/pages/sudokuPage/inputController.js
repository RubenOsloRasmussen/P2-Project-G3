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
    console.log(e.key);
    if ((/^[1-9]$/.test(e.key))) {
      if (this.board.not) {
        this.board.insertCellNumber(this.board.targetCell, e.key);
      }
    } else if (e.key == "Backspace") {
      this.board.deleteCellNumber(this.board.targetCell)
    }
    
    this.renderer.renderCells();
  }

}

