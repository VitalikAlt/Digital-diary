const MIN_ANIMATION_TIME = 1150; // миллисекунды
let waitingFor: number = 0;
let startAnimationTime: Date = new Date();

export class Preloader {
  constructor() { }

  logWaitingCount() {
    console.log(waitingFor);
  }

  static turnOn() {
    if (waitingFor === 0)
      startAnimationTime = new Date();

    waitingFor++;
  }


  static turnOf() {
    const animationTime = +(new Date()) - +startAnimationTime;
    if (waitingFor === 1 && animationTime < MIN_ANIMATION_TIME)
      return setTimeout(() => waitingFor--, MIN_ANIMATION_TIME - animationTime);

    waitingFor--;
  }

  get status() {
    return waitingFor !== 0;
  }
}
