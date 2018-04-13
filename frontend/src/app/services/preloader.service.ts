let waitingFor: number = 0;

export class Preloader {
  constructor() { }

  logWaitingCount() {
    console.log(waitingFor);
  }

  static turnOn() {
    console.log("+")
    waitingFor++;
  }


  static turnOf() {
    console.log("-")
    waitingFor--;
  }

  get status() {
    return waitingFor !== 0;
  }

  async status1() {
    return Promise.resolve(waitingFor !== 0);
  }
}
