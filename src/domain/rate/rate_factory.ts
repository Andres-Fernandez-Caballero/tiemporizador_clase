import { RateHalfHourPerQuarter } from "./rate_half_hour_per_quarter";
import { RateTwoStudentsPerHour } from "./rate_two_students_per_hour";

export function rateFactorty(rateType: string) {
    switch (rateType) {
        case "half_hour_per_quarter":
            
            return new RateHalfHourPerQuarter();
        case "two_students_per_hour":
            return new RateTwoStudentsPerHour();

        default:
            throw new Error("Tipo de tarifa no soportado");
    }
}