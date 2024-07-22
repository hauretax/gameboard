/* eslint-disable no-undef */



export default class Letter {

  static nextId = 0;

  constructor(key, dispatch) {
    this.key = key;
    this.dispatch = dispatch;

    this.id = Letter.nextId++;
    this.duration = 1000;
    this.isHit = false;
    this.startTime = Date.now();
    this.interval = setTimeout(() => {
      console.log('missed');

    }, this.duration);
  }

  deleteLetter() {
    this.dispatch(removeLetter(this.id));
  }

  isHit(key) {
    if (key === this.key) {
      this.hitTime = Date.now();
      this.isHit = true;
      clearInterval(this.interval);
      return true;
    }
    return false;
  }

  toPlainObject() {
    return {
      id: this.id,
      key: this.key,
      duration: this.duration,
      isHit: this.isHit,
    };
  }

  static fromPlainObject(obj) {
    const letter = new Letter(obj.key);
    letter.id = obj.id;
    letter.duration = obj.duration;
    letter.isHit = obj.isHit;
    return letter;
  }
}
