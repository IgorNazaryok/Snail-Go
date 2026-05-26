import { Component, inject } from '@angular/core';

import { TourismService } from '../../core/services/tourism.service';
import { AccordionComponent, AccordionItem } from '../../shared/ui/accordion/accordion.component';
import { InfoCardComponent } from '../../shared/ui/info-card/info-card.component';
import { SectionHeaderComponent } from '../../shared/ui/section-header/section-header.component';

@Component({
  selector: 'app-tourism-page',
  imports: [SectionHeaderComponent, InfoCardComponent, AccordionComponent],
  templateUrl: './tourism.page.html',
  styleUrl: './tourism.page.scss'
})
export class TourismPage {
  private readonly tourismService = inject(TourismService);

  protected readonly sections = this.tourismService.getSections();
  protected readonly categories = this.tourismService.getCategories();
  protected readonly featuredVisuals = this.sections.slice(0, 2);

  protected readonly accordionItems: AccordionItem[] = this.sections.map((section) => ({
    title: section.title,
    content: section.points.join(', ')
  }));
}
