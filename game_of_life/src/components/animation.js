export default class Animation {
    constructor(stepCallback, delay) {
        this.step = stepCallback;
        this.delay = delay;
        this.running = false;
    }

    run() {
        this.running = true;
        this.animate(this.step);
    }

    pause() {
        this.running = false;
    }

    animate(stepCallback) {
        stepCallback();
        if (this.running === true)
            setTimeout(() => requestAnimationFrame(() => this.animate(stepCallback)), this.delay);
    }
}