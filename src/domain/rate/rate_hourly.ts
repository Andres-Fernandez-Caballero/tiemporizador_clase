import type { RateStrategy } from "./rate_strategy";

export class RateHourly implements RateStrategy {
  calculateValue(time: number, ratePerHour: number): number {
    const seconds = Math.floor(time / 1000);
    const hours = seconds / 3600;
    return hours * ratePerHour;
  }

  getDescription(): string {
    return "Tarifa por hora exacta";
  } 
}