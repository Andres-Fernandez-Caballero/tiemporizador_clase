import type { RateStrategy } from "./rate_strategy"

export class RateTwoStudentsPerHour implements RateStrategy {
    calculateValue(durationInMillis: number, ratePerHour: number) {
        const ratePerHourPerStudent = ratePerHour * 1.5

        const MS_IN_MIN = 1000 * 60
        const minutes = durationInMillis / MS_IN_MIN
        const billableMinutes = Math.ceil(minutes / 30) * 30
        const hours = billableMinutes / 60
        return Number((hours * ratePerHourPerStudent).toFixed(2))
    } 

    getDescription() {
        return "Tarifa por cada dos estudiantes, se cobra hora y media por cada hora";
    }
}