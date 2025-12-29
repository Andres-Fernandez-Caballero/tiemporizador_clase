// CODIGO ORIGINAL 
export function calculateValue(
    durationInMillis: number,
    ratePerHour: number
) {
    const MS_IN_MIN = 1000 * 60

    const minutes = durationInMillis / MS_IN_MIN
    const billableMinutes =
        minutes <= 30
            ? 30
            : 30 + Math.ceil((minutes - 30) / 15) * 15

    const hours = billableMinutes / 60

    return Number((hours * ratePerHour).toFixed(2))
}