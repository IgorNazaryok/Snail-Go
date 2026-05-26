import { CalculatorInput, CalculatorScenario } from '../../models/calculator.model';

export const DEFAULT_CALCULATOR_INPUT: CalculatorInput = {
  areaSotka: 10,
  investment: 350000,
  pricePerKg: 420,
  monthlyExpenses: 18000,
  visitorsPerMonth: 60,
  avgTicket: 650
};

export const CALCULATOR_SCENARIOS: CalculatorScenario[] = [
  {
    type: 'base',
    label: 'Базовий',
    description:
      'Модель на основі бізнес-проєкту: середній урожай, стабільні витрати й помірний туристичний потік.',
    yieldMultiplier: 1,
    priceMultiplier: 1,
    expenseMultiplier: 1,
    tourismMultiplier: 1
  },
  {
    type: 'optimistic',
    label: 'Оптимістичний',
    description:
      'Активний сезон: вищий урожай і відвідуваність, кращий середній чек та швидше повернення вкладень.',
    yieldMultiplier: 1.12,
    priceMultiplier: 1.06,
    expenseMultiplier: 0.95,
    tourismMultiplier: 1.18
  },
  {
    type: 'crisis',
    label: 'Кризовий',
    description:
      'Складний сезон: менший урожай, вищі операційні витрати й помітне просідання туристичного напряму.',
    yieldMultiplier: 0.84,
    priceMultiplier: 0.93,
    expenseMultiplier: 1.12,
    tourismMultiplier: 0.72
  }
];