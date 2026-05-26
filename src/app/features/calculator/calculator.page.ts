import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { CalculatorService } from '../../core/services/calculator.service';
import { DEFAULT_CALCULATOR_INPUT } from '../../data/mocks/calculator.mock';
import { StorageService } from '../../core/services/storage.service';
import { RevenueChartComponent } from './components/revenue-chart/revenue-chart.component';
import { ScenarioType } from '../../models/calculator.model';

interface CalculatorStorageState {
  formValue: typeof DEFAULT_CALCULATOR_INPUT;
  scenarioType: ScenarioType;
}

const CALCULATOR_STORAGE_KEY = 'snail-go-calculator';

@Component({
  selector: 'app-calculator-page',
  imports: [ReactiveFormsModule, DecimalPipe, CurrencyPipe, RevenueChartComponent],
  templateUrl: './calculator.page.html',
  styleUrl: './calculator.page.scss'
})
export class CalculatorPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly calculatorService = inject(CalculatorService);
  private readonly storageService = inject(StorageService);

  protected readonly scenarios = this.calculatorService.getScenarios();
  private readonly storedState = this.storageService.getItem<CalculatorStorageState>(
    CALCULATOR_STORAGE_KEY
  );
  protected readonly selectedScenario = signal(
    this.scenarios.find((scenario) => scenario.type === this.storedState?.scenarioType) ??
      this.scenarios[0]
  );

  protected readonly form = this.formBuilder.nonNullable.group({
    areaSotka: [
      this.storedState?.formValue.areaSotka ?? DEFAULT_CALCULATOR_INPUT.areaSotka,
      [Validators.required, Validators.min(1), Validators.max(30)]
    ],
    investment: [
      this.storedState?.formValue.investment ?? DEFAULT_CALCULATOR_INPUT.investment,
      [Validators.required, Validators.min(0)]
    ],
    pricePerKg: [
      this.storedState?.formValue.pricePerKg ?? DEFAULT_CALCULATOR_INPUT.pricePerKg,
      [Validators.required, Validators.min(1)]
    ],
    monthlyExpenses: [
      this.storedState?.formValue.monthlyExpenses ?? DEFAULT_CALCULATOR_INPUT.monthlyExpenses,
      [Validators.required, Validators.min(0)]
    ],
    visitorsPerMonth: [
      this.storedState?.formValue.visitorsPerMonth ?? DEFAULT_CALCULATOR_INPUT.visitorsPerMonth,
      [Validators.required, Validators.min(0)]
    ],
    avgTicket: [
      this.storedState?.formValue.avgTicket ?? DEFAULT_CALCULATOR_INPUT.avgTicket,
      [Validators.required, Validators.min(0)]
    ]
  });

  private readonly formValue = toSignal(
    this.form.valueChanges.pipe(startWith(this.form.getRawValue()), map(() => this.form.getRawValue())),
    { initialValue: this.form.getRawValue() }
  );

  protected readonly result = computed(() =>
    this.calculatorService.calculate(this.formValue(), this.selectedScenario())
  );

  constructor() {
    effect(() => {
      this.storageService.setItem<CalculatorStorageState>(CALCULATOR_STORAGE_KEY, {
        formValue: this.formValue(),
        scenarioType: this.selectedScenario().type
      });
    });
  }

  protected getControl(name: keyof typeof DEFAULT_CALCULATOR_INPUT) {
    return this.form.controls[name];
  }

  protected markAllAsTouched(): void {
    this.form.markAllAsTouched();
  }
}
