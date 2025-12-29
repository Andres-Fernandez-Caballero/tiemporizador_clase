import type { RateStrategy } from "./rate_strategy";

export class RateFirstHourFree implements RateStrategy {
  calculateValue(time: number, ratePerHour: number): number {
    const seconds = Math.floor(time / 1000);
    const hours = seconds / 3600;
    if (hours <= 1) {
      return 0;
    }
    return (hours - 1) * ratePerHour;
  }

  getDescription(): string {
    return "Primer hora gratis";
  }
}