export class CandidateBlock {
    constructor(board, htmlElement = null, cornerNotation = null, centerNotation = null) {
        this.htmlElement = htmlElement;
        this.cornerNotation = cornerNotation,
        this.centerNotation = centerNotation,
        this.board = board
    }
    
    /**
     * This function inserts a given number in either corner or center notation, depending on the selected notation mode.
     * @param {*} number The given number to insert.
     */
    insertCandidate(number) {
        if (!(/^[1-9]$/.test(number)) || (this.board.notationMode !=  "cornerNotation" && this.board.notationMode != "centerNotation")) return;
        if (this.board.notationMode == "cornerNotation") {     
            if (this.cornerNotation.topCornerCandidates.includes(number) || this.cornerNotation.bottomCornerCandidates.includes(number)) return;
            
            if (this.cornerNotation.topCornerCandidates.length < 4 ) {
                this.cornerNotation.topCornerCandidates.push(number);
                
            } else if (this.cornerNotation.bottomCornerCandidates.length < 4) {
                this.cornerNotation.bottomCornerCandidates.push(number);
            }

        } else if (this.board.notationMode == "centerNotation") {
            if (this.centerNotation.centerCandidates.includes(number)) return;

            if (this.centerNotation.centerCandidates.length < 4 ) {
                this.centerNotation.centerCandidates.push(number);
            }
        }
    }

    /**
     * This function deletes a given number from either corner or center notation, depending on the selected notation mode.
     * @param {*} number The given number to remove.
     * @returns
     */
    removeCandidate(number) {
        if (!(/^[1-9]$/.test(number)) || (this.board.notationMode != "cornerNotation" && this.board.notationMode != "centerNotation")) return;
        if (this.board.notationMode == "cornerNotation") {
            let indexOfCandidateTop = this.cornerNotation.topCornerCandidates.indexOf(number);
            let indexOfCandidateBottom = this.cornerNotation.bottomCornerCandidates.indexOf(number);
            console.log("test", number, indexOfCandidateTop,indexOfCandidateBottom );
            if (indexOfCandidateTop != -1) {
                // console.log("aaaaaa");
                
                this.cornerNotation.topCornerCandidates.splice(indexOfCandidateTop, 1);
            } else if (indexOfCandidateBottom != -1) {
                // console.log("bbbbbb");
                this.cornerNotation.bottomCornerCandidates.splice(indexOfCandidateBottom, 1);
            }
            this.rearrangeCornerCandidates();
        } else if (this.board.notationMode == "centerNotation") {
            let indexOfCandidateCenter = this.centerNotation.centerCandidates.indexOf(number);
            if (indexOfCandidateCenter != -1) {
                this.centerNotation.centerCandidates.splice(indexOfCandidateCenter, 1);
            }
        }
    }

    /**
     * This function rearranges the corner candidates, making sure that the top row is filled before the putting numbers in the bottom row.
     */
    rearrangeCornerCandidates() {
        let tempArr = this.cornerNotation.topCornerCandidates.concat(this.cornerNotation.bottomCornerCandidates);
        this.cornerNotation.topCornerCandidates = [];
        this.cornerNotation.bottomCornerCandidates = [];

        for (let i = 0; i < tempArr.length; i++) {
            if (i <= 3) {
                this.cornerNotation.topCornerCandidates.push(tempArr[i]);
            } else {
                this.cornerNotation.bottomCornerCandidates.push(tempArr[i]);
            }
        }
    }

    /**
     * This function deletes a given number from the specified notation type.
     * @param {*} number The given number to delete.
     * @param {*} notationMode The given notation mode.
     */
    deleteCandidate(number, notationMode) {
        if (notationMode == "cornerNotation") {
            const topOccurence = this.cornerNotation.topCornerCandidates.indexOf(number);
            const bottomOccurence = this.cornerNotation.bottomCornerCandidates.indexOf(number);
            if (topOccurence != -1) {
                this.cornerNotation.topCornerCandidates.splice(topOccurence, 1);
            } else if (bottomOccurence != -1) {
                this.cornerNotation.bottomCornerCandidates.splice(bottomOccurence, 1);
            }
        } else if (notationMode == "centerNotation") {
            const index = this.centerNotation.centerCandidates.indexOf(number);
            if (index != -1)  {
                this.centerNotation.centerCandidates.splice(index, 1);
            }
        }
    }
    
    /**
     * This function deletes all candidates from the entire board, both corner and center notation.
     */
    deleteCandidates() {
        this.board.cornerNotation.topCornerCandidates = [];
        this.board.cornerNotation.bottomCornerCandidates = [];
        this.board.centerNotation.centerCandidates = [];
    }
}

export class CornerNotation {
    constructor(topCornerHTMLElement, bottomCornerHTMLElement) {
        this.topCornerCandidates = [];
        this.topCornerHTMLElement = topCornerHTMLElement;

        this.bottomCornerCandidates = [];
        this.bottomCornerHTMLElement = bottomCornerHTMLElement;
    }
}

export class CenterNotation {
    constructor(htmlElement) {
        this.centerCandidates = [];
        this.htmlElement = htmlElement;
    }
}