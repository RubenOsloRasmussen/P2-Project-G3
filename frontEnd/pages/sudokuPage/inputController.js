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
      //this.board.targetCell.candidateBlock.rearrangeCornerCandidates();
    } else if (this.board.notationMode == "centerNotation") {
      if (!(/^[1-9]$/.test(e.key)) || this.board.targetCell.number) return;
      console.log(this.board.targetCell.candidateBlock)
      const centerNotation = this.board.targetCell.candidateBlock.centerNotation;
      if (centerNotation.centerCandidates.includes(e.key)) {
        this.board.targetCell.candidateBlock.removeCandidate(e.key);
      } else {
        this.board.targetCell.candidateBlock.insertCandidate(e.key);
      }
    } else if (this.board.colorNotation == "colorNotation") {

    }
    
    this.renderer.renderCells();
  }

}

