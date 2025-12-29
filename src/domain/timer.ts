export class Timer {
    private startTime = 0
    private elapsed = 0
    private running = false

    start() {
        if(this.running) return // do nothing
        this.running = true
        this.startTime = Date.now() - this.elapsed
    }

    pause() {
        if(!this.running) return
        this.elapsed += Date.now() - this.startTime
        this.running = false
    }

    reset() {
        this.startTime = 0
        this.elapsed = 0
        this.running = false
    }

    getTime() {
        if (!this.running) return this.elapsed
        return Date.now() - this.startTime
    }

    isRunning() {
        return this.isRunning
    }
}