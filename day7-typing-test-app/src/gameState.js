export class ScoreBoard {
  constructor(time = 60) {
    this.initTime = time;
    this.time = time;
    this.totalCount = 0;
    this.totalError = 0;
    this.count = 0;
    this.error = 0;
    this.accuracy = 0;
    this.cpm = 0;
    this.wpm = 0;
  }

  startTimer = (timerText, endfunc) => {
    const timer = setInterval(() => {
      if (this.time <= 0) {
        clearInterval(timer);
        endfunc();
        return;
      }
      this.time--;
      timerText.innerText = this.time;
    }, 1000);
  };

  calculateCPM = () => {
    const count = this.totalCount + this.count;
    this.cpm = (count * 60) / (this.initTime - this.time);

    return this.cpm;
  };

  calculateWPM = () => {
    this.wpm = this.cpm / 5;
    return this.wpm;
  };

  calculateAccuracy = () => {
    const count = this.totalCount + this.count;
    const error = this.totalError + this.error;
    this.accuracy = ((count - error) / count) * 100;

    return isNaN(this.accuracy) ? 0 : this.accuracy;
  };
}

export class Text {
  constructor(data) {
    this.data = data;
    this.idx = 0;
  }

  getNextText = () => {
    if (this.idx === this.data.length) this.idx = 0;

    return this.data[this.idx++].sentence;
  };
}
