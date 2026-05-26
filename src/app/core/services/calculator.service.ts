import { Injectable } from '@angular/core';

import { BASE_YIELD_PER_SOTKA, CHART_MONTHS, TOURISM_ACTIVE_MONTHS } from '../constants/calculator.constants';
import {
  CalculatorInput,
  CalculatorResult,
  CalculatorScenario,
  ChartPoint
} from '../../models/calculator.model';
import { CALCULATOR_SCENARIOS } from '../../data/mocks/calculator.mock';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  getScenarios(): CalculatorScenario[] {
    return CALCULATOR_SCENARIOS;
  }

  calculate(input: CalculatorInput, scenario: CalculatorScenario): CalculatorResult {
    const annualYieldKg = input.areaSotka * BASE_YIELD_PER_SOTKA * scenario.yieldMultiplier;
    const annualProductRevenue = annualYieldKg * input.pricePerKg * scenario.priceMultiplier;
    const annualTourismRevenue =
      input.visitorsPerMonth * input.avgTicket * TOURISM_ACTIVE_MONTHS * scenario.tourismMultiplier;
    const annualRevenue = annualProductRevenue + annualTourismRevenue;
    const annualExpenses = input.monthlyExpenses * 12 * scenario.expenseMultiplier;
    const annualProfit = annualRevenue - annualExpenses;

    return {
      annualYieldKg,
      annualProductRevenue,
      annualTourismRevenue,
      annualRevenue,
      annualExpenses,
      annualProfit,
      paybackPeriodMonths:
        annualProfit > 0 ? Math.ceil(input.investment / (annualProfit / 12)) : null,
      monthlyCumulativeProfit: this.buildRevenueSeries(input, scenario)
    };
  }

  buildRevenueSeries(input: CalculatorInput, scenario: CalculatorScenario): ChartPoint[] {
    const annualYieldKg = input.areaSotka * BASE_YIELD_PER_SOTKA * scenario.yieldMultiplier;
    const annualProductRevenue = annualYieldKg * input.pricePerKg * scenario.priceMultiplier;
    const annualTourismRevenue =
      input.visitorsPerMonth * input.avgTicket * TOURISM_ACTIVE_MONTHS * scenario.tourismMultiplier;
    const monthlyExpenses = input.monthlyExpenses * scenario.expenseMultiplier;
    const productSeasonWeights = [0, 0, 0.06, 0.1, 0.14, 0.18, 0.2, 0.16, 0.1, 0.06, 0, 0];
    const tourismSeasonWeights = [0, 0, 0.08, 0.1, 0.13, 0.16, 0.18, 0.16, 0.11, 0.08, 0, 0];

    const series: ChartPoint[] = [];
    let cumulative = -input.investment;

    for (let index = 0; index < CHART_MONTHS; index += 1) {
      const monthIndex = index % 12;
      const monthRevenue =
        annualProductRevenue * productSeasonWeights[monthIndex] +
        annualTourismRevenue * tourismSeasonWeights[monthIndex];

      cumulative += monthRevenue - monthlyExpenses;
      series.push({
        label: `${index + 1} мес`,
        value: Math.round(cumulative)
      });
    }

    return series;
  }
}
