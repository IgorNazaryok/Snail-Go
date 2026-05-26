import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-info-card',
  imports: [RouterLink],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss'
})
export class InfoCardComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly eyebrow = input<string>('');
  readonly link = input<string | null>(null);
  readonly linkLabel = input<string>('Докладніше');
  readonly image = input<string | null>(null);
  readonly imageAlt = input<string>('');
  readonly icon = input<string>('');
}
