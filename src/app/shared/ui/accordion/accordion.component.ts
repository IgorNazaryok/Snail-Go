import { Component, input, signal } from '@angular/core';

export interface AccordionItem {
  title: string;
  content: string;
}

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent {
  readonly items = input.required<AccordionItem[]>();
  protected readonly openIndex = signal(0);
  protected readonly accordionId = `accordion-${Math.random().toString(36).slice(2, 9)}`;

  protected toggle(index: number): void {
    this.openIndex.update((current) => (current === index ? -1 : index));
  }

  protected onTriggerKeydown(event: KeyboardEvent, index: number): void {
    const itemsCount = this.items().length;

    if (!itemsCount) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.focusTrigger((index + 1) % itemsCount);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.focusTrigger((index - 1 + itemsCount) % itemsCount);
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.focusTrigger(0);
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.focusTrigger(itemsCount - 1);
    }
  }

  private focusTrigger(index: number): void {
    const trigger = document.getElementById(`${this.accordionId}-trigger-${index}`);
    trigger?.focus();
  }
}
