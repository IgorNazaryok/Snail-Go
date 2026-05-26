import { RouteStep } from '../../models/route.model';

export const ROUTE_STEPS_MOCK: RouteStep[] = [
  {
    id: 'departure',
    title: 'Виїзд із Дніпра',
    description:
      'Маршрут стартує від м. Дніпро, вул. Панікахи, 19 і веде до ферми в с. Сурсько-Михайлівка.',
    durationMinutes: 45,
    order: 1,
    timeLabel: '09:30-11:00',
    icon: '→'
  },
  {
    id: 'excursion',
    title: 'Знайомство з фермою',
    description:
      'Екскурсія територією, теплицею й плантаціями з поясненням технології вирощування та роботи господарства.',
    durationMinutes: 180,
    order: 2,
    timeLabel: '11:00-14:00',
    icon: '⌂'
  },
  {
    id: 'tasting',
    title: 'Дегустація й напої',
    description:
      'Сет ескарго з двома соусами, ще дві позиції з равликами та крафтовий лимонад як частина спільного гастрономічного досвіду.',
    durationMinutes: 90,
    order: 3,
    timeLabel: '14:00-15:30',
    icon: '✦'
  },
  {
    id: 'wrap-up',
    title: 'Контакт і фоточас',
    description:
      'Спілкування з господарями, контакт із равликами, мінігра «перегони равликів» і фото на локаціях ферми.',
    durationMinutes: 60,
    order: 4,
    timeLabel: '15:00-16:00',
    icon: '○'
  }
];
