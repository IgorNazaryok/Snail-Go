import {
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild
} from '@angular/core';

import { GalleryService } from '../../core/services/gallery.service';
import { Dish } from '../../models/dish.model';
import { SectionHeaderComponent } from '../../shared/ui/section-header/section-header.component';

@Component({
  selector: 'app-gallery-page',
  imports: [SectionHeaderComponent],
  templateUrl: './gallery.page.html',
  styleUrl: './gallery.page.scss'
})
export class GalleryPage {
  private readonly galleryService = inject(GalleryService);
  private readonly closeButtonRef = viewChild<ElementRef<HTMLButtonElement>>('closeButton');
  private previousFocusedElement: HTMLElement | null = null;

  protected readonly dishes = this.galleryService.getDishes();
  protected readonly selectedDish = signal<Dish | null>(null);

  constructor() {
    effect(() => {
      if (this.selectedDish()) {
        queueMicrotask(() => this.closeButtonRef()?.nativeElement.focus());
      } else {
        this.previousFocusedElement?.focus();
        this.previousFocusedElement = null;
      }
    });
  }

  protected openDishFromEvent(dish: Dish, event: Event): void {
    this.openDish(dish, event.currentTarget instanceof HTMLElement ? event.currentTarget : undefined);
  }

  protected openDish(dish: Dish, trigger?: HTMLElement): void {
    this.previousFocusedElement = trigger ?? (document.activeElement as HTMLElement | null);
    this.selectedDish.set(dish);
  }

  protected closeDish(): void {
    this.selectedDish.set(null);
  }

  @HostListener('document:keydown.escape')
  protected handleEscape(): void {
    if (this.selectedDish()) {
      this.closeDish();
    }
  }

  @HostListener('document:keydown.tab', ['$event'])
  protected trapFocus(event: Event): void {
    if (!this.selectedDish()) {
      return;
    }

    if (!(event instanceof KeyboardEvent)) {
      return;
    }

    const dialog = this.closeButtonRef()?.nativeElement.closest<HTMLElement>('.modal-card');

    if (!dialog) {
      return;
    }

    const focusableSelectors = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];
    const focusableElements = Array.from(
      dialog.querySelectorAll<HTMLElement>(focusableSelectors.join(','))
    );

    if (!focusableElements.length) {
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement as HTMLElement | null;

    if (event.shiftKey && activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
