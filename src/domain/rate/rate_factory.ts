import { RateFirstHourFree } from "./rate_first_hour_free";
import { RateHalfHourPerQuarter } from "./rate_half_hour_per_quarter";
import { RateHourly } from "./rate_hourly";
import { RateTwoStudentsPerHour } from "./rate_two_students_per_hour";

export function rateFactorty(rateType: string) {
    switch (rateType) {
        case "half_hour_per_quarter":
            return new RateHalfHourPerQuarter();
        case "two_students_per_hour":
            return new RateTwoStudentsPerHour();
        case "hourly":
            return new RateHourly();
        case "first_hour_free":
            return new RateFirstHourFree();

        default:
            throw new Error("Tipo de tarifa no soportado");
    }
}