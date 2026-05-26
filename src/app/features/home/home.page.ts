import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { InfoCardComponent } from '../../shared/ui/info-card/info-card.component';
import { SectionHeaderComponent } from '../../shared/ui/section-header/section-header.component';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, SectionHeaderComponent, InfoCardComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {
  protected readonly highlights = [
    {
      eyebrow: 'Теорія',
      title: 'Гастротуризм',
      description:
        'Пояснюємо, як працює ніша гастрономічних подорожей і чому равликові ферми цікаві для туриста.',
      image: 'assets/illustrations/tourism-definition.svg',
      imageAlt: 'Ілюстрований вступ до теми гастротуризму',
      icon: '◔'
    },
    {
      eyebrow: 'Практика',
      title: 'Маршрут і ферми',
      description:
        'Показуємо формат візиту, активності на фермі та логіку дегустаційного досвіду.',
      image: 'assets/illustrations/route-board.svg',
      imageAlt: 'Візуальна схема маршруту',
      icon: '→'
    },
    {
      eyebrow: 'Економіка',
      title: 'Бізнес-калькулятор',
      description: 'Даємо базову модель розрахунку врожаю, прибутку та строку окупності.',
      image: 'assets/illustrations/farm-project.svg',
      imageAlt: 'Ілюстрація бізнес-проєкту ферми',
      icon: '✦'
    }
  ];

  protected readonly quickFacts = [
    { value: '2021', label: 'рік заснування Ravlyk Park', icon: '⌂' },
    { value: '10 соток', label: 'площа вирощування у бізнес-проєкті', icon: '◌' },
    { value: '2000-2500 кг', label: 'прогноз врожаю за сезон', icon: '◔' },
    { value: '2-3 роки', label: 'розрахункова окупність проєкту', icon: '✳' }
  ];
}
