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
}

