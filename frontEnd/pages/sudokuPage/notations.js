export class CandidateBlock {
    constructor(htmlElement = null, cornerNotation = null, centerNotation = null) {
        this.htmlElement = htmlElement;
        this.cornerNotation = cornerNotation,
        this.centerNotation = centerNotation
    }

    insertCandidate(number, notationMode) {
        if (!(/^[1-9]$/.test(number)) || (notationMode != "cornerNotation" || notationMode != "centerNotation")) return;
        if (notationMode == "cornerNotation") {
            if (this.cornerNotation.topCornerCandidates.includes(number) || this.cornerNotation.bottomCornerCandidates.includes(number)) return;

            if (this.cornerNotation.topCornerCandidates.length < 4 ) {
                this.cornerNotation.topCornerCandidates.push(number);
            } else if (this.cornerNotation.bottomCornerCandidates.length < 4) {
                this.cornerNotation.bottomCornerCandidates.push(number);
            }

        } else if (notationMode == "centerNotation") {
            if (this.centerNotation.centerCandidates.includes(number)) return;

            if (this.centerNotation.centerCandidates.length < 4 ) {
                this.centerNotation.centerCandidates.push(number);
            }
        }
    }

    removeCandidate(number) {
        if (!(/^[1-9]$/.test(number)) || (notationMode != "cornerNotation" || notationMode != "centerNotation")) return;
        if (notationMode == "cornerNotation") {
            let indexOfCandidateTop = this.cornerNotation.topCornerCandidates.indexOf(`${number}`);
            let indexOfCandidateBottom = this.cornerNotation.topCornerCandidates.indexOf(`${number}`);
            if (indexOfCandidateTop != -1) {
                this.cornerNotation.topCornerCandidates.splice(indexOfCandidateTop, 1);
            } else if (indexOfCandidateBottom != -1) {
                this.cornerNotation.bottomCornerCandidates.splice(indexOfCandidateBottom, 1);
            }
        } else if (notationMode == "centerNotation") {
            let indexOfCandidateCenter = this.centerNotation.centerCandidates.indexOf(`${number}`);
            if (indexOfCandidateCenter != -1) {
                this.centerNotation.centerCandidates.splice(indexOfCandidateCenter, 1);
            }
        }
    }

    rearrangeCornerCandidates() {
        let e = 0;
        for (let i = this.cornerNotation.topCornerCandidates.length; i < 4; i++) {
            e++;
            this.cornerNotation.topCornerCandidates.push(this.cornerNotation.bottomCornerCandidates[e])
            this.cornerNotation.bottomCornerCandidates.splice(e, 1);
        }
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