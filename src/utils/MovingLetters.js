export default class MovingLetters {

    constructor() {
        this.letters = [];
    }

    setOnUpdate(update) {
        this.update = update;
    }

    newLetter(key) {
        this.letters.push(new Letter({
            key,
            successHit: this.successHit,
            missHit: this.missHit
        }
        ));
        this.letters[this.letters.length - 1].start();
    }

    successHit = (id) => {
        console.log('hit');
        this.removeLetter(this.letters.findIndex(letter => letter.id === id));

        this.update();
    }

    missHit = (id) => {
        console.log('missed');
        this.removeLetter(this.letters.findIndex(letter => letter.id === id));
        this.update();
    }

    removeLetter(id) {
        this.letters.splice(id, 1);
    }

    getLetters() {
        return this.letters;
    }
}


/* letter = {
    duration : millisecondes;
    key : one of key in keyList.json;
    hit : function call to 
} */
class Letter {
    static nextId = 0;

    constructor({ key, successHit, missHit }) {
        this.id = Letter.nextId++;
        this.key = key;
        this.successHit = successHit;
        this.missHit = missHit;
        this.duration = 1000;
    }

    start(callback) {
        this.interval = setTimeout(() => {
            this.missHit(this.id);
        }, this.duration);
    }

    isHit(key) {
        if (key === this.key) {
            clearInterval(this.interval);
            return true;
        }
        return false
    }
}

