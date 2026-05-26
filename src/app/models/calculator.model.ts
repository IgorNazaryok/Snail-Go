export type ScenarioType = 'base' | 'optimistic' | 'crisis';

export interface CalculatorInput {
  areaSotka: number;
  investment: number;
  pricePerKg: number;
  monthlyExpenses: number;
  visitorsPerMonth: number;
  avgTicket: number;
}

export interface CalculatorScenario {
  type: ScenarioType;
  label: string;
  description: string;
  yieldMultiplier: number;
  priceMultiplier: number;
  expenseMultiplier: number;
  tourismMultiplier: number;
}

export interface ChartPoint {
  label: string;
  value: number;
}

export interface CalculatorResult {
  annualYieldKg: number;
  annualProductRevenue: number;
  annualTourismRevenue: number;
  annualRevenue: number;
  annualExpenses: number;
  annualProfit: number;
  paybackPeriodMonths: number | null;
  monthlyCumulativeProfit: ChartPoint[];
}
