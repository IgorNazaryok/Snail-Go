import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  protected readonly isMenuOpen = signal(false);

  protected readonly navItems: NavItem[] = [
    { label: 'Головна', path: '/' },
    { label: 'Гастротуризм', path: '/tourism' },
    { label: 'Ферми', path: '/farms' },
    { label: 'Маршрут', path: '/route' },
    { label: 'Галерея', path: '/gallery' },
    { label: 'Калькулятор', path: '/calculator' }
  ];

  protected toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
