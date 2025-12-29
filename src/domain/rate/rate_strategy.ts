export interface RateStrategy {
    calculateValue: (durationInMillis: number, ratePerHour:number) => number
    getDescription:() => string
}