import { Component, inject } from '@angular/core';

import { FarmsService } from '../../core/services/farms.service';
import { InfoCardComponent } from '../../shared/ui/info-card/info-card.component';
import { SectionHeaderComponent } from '../../shared/ui/section-header/section-header.component';

@Component({
  selector: 'app-farms-page',
  imports: [SectionHeaderComponent, InfoCardComponent],
  templateUrl: './farms.page.html',
  styleUrl: './farms.page.scss'
})
export class FarmsPage {
  private readonly farmsService = inject(FarmsService);

  protected readonly farms = this.farmsService.getFarms();
}
