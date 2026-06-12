import { Vehicle } from './types';

export const vehicles: Vehicle[] = [
  // ============ LEGACY CAR ============
  {
    id: 'car-1',
    kind: 'car',
    make: 'Toyota',
    model: 'Camry',
    year: 2018,
    plate: 'А 123 ВС · 777',
    engine: '2.5 бензин',
    color: 'серебристый',
    mileage: 87500,
    health: 86,
    healthLabel: 'Хорошее состояние',
    badge: { text: '86% · норма', urgency: 'ok' },
    glyphIcon: 'car-side',
    stats: [
      { key: 'oil', label: 'Масло двигателя', icon: 'oil', value: '5 800', unit: '/ 8000 км', progress: 0.72, fill: 'green' },
      { key: 'to', label: 'Ближайшее ТО', icon: 'cog', value: '1 200', unit: 'км', progress: 0.85, fill: 'amber' },
      { key: 'km', label: 'Пробег', icon: 'speedometer', value: '87 500', unit: 'км', progress: 0.6, fill: 'gold' },
      { key: 'tire', label: 'Шины · зима', icon: 'snowflake', value: '12 400', unit: 'км', progress: 0.45, fill: 'violet', target: 'Tire' },
    ],
    reminders: [
      { id: 'r1', title: 'Воздушный фильтр', subtitle: 'просрочено на 500 км', icon: 'air-filter', urgency: 'danger', value: '−500', unit: 'км', group: 'overdue' },
      { id: 'r2', title: 'Смена на летние шины', subtitle: '+12 °C за окном', icon: 'sun-thermometer-outline', urgency: 'warn', value: '3', unit: 'дня', group: 'week' },
      { id: 'r3', title: 'Плановое ТО-3', subtitle: '15 июля 2026', icon: 'cog', urgency: 'warn', value: '33', unit: 'дня', group: 'month' },
      { id: 'r4', title: 'Масло двигателя', subtitle: 'при 95 500 км', icon: 'oil', urgency: 'ok', value: '8 000', unit: 'км', group: 'later' },
      { id: 'r5', title: 'Масло КПП', subtitle: 'при 120 000 км', icon: 'car-shift-pattern', urgency: 'ok', value: '32 500', unit: 'км', group: 'later' },
    ],
    history: [
      { id: 'h1', type: 'engine_oil', name: 'Масло двигателя · Mobil 1', icon: 'oil', date: '12 июн', mileage: '87 500 км', place: 'У Михалыча', cost: 6800 },
      { id: 'h2', type: 'tires', name: 'Смена на зимние · Nokian', icon: 'snowflake', date: '15 окт', mileage: '75 100 км', place: 'Шиномонтаж №7', cost: 3200 },
      { id: 'h3', type: 'cabin_filter', name: 'Салонный фильтр', icon: 'air-filter', date: '3 сен', mileage: '72 800 км', place: 'сам', cost: 1400 },
      { id: 'h4', type: 'maintenance', name: 'ТО-2 плановое', icon: 'cog', date: '20 июл', mileage: '70 000 км', place: 'Тойота Центр', cost: 14500 },
      { id: 'h5', type: 'engine_oil', name: 'Масло двигателя · Mobil 1', icon: 'oil', date: '18 фев', mileage: '67 500 км', place: 'У Михалыча', cost: 6600 },
    ],
    tires: [
      {
        id: 't1', season: 'winter', studType: 'studded', manufacturer: 'Nokian', model: 'Hakkapeliitta 10',
        size: '205/55 R16', treadMm: 8.5, treadMax: 10, distanceKm: 12400, distanceLabel: 'км на сезон', active: true,
      },
      {
        id: 't2', season: 'summer', studType: 'friction', manufacturer: 'Michelin', model: 'Primacy 4',
        size: '205/55 R16', treadMm: 4.2, treadMax: 10, distanceKm: 34800, distanceLabel: 'км всего', active: false,
      },
    ],
  },

  // ============ TRUCK / ФУРА ============
  {
    id: 'truck-1',
    kind: 'truck',
    make: 'DAF',
    model: 'XF 480 FT',
    year: 2021,
    plate: 'Х 815 ТТ · 116',
    engine: '12.9 дизель · 480 л.с.',
    color: 'белый',
    mileage: 642300,
    health: 71,
    healthLabel: 'Требует внимания',
    badge: { text: '71% · скоро ТО', urgency: 'warn' },
    glyphIcon: 'truck-trailer',
    engineHours: 9840,
    adBlueLevel: 0.28,
    axles: 3,
    hasTrailer: true,
    trailerPlate: 'ВН 4471 · 16',
    stats: [
      { key: 'oil', label: 'Масло двигателя', icon: 'oil', value: '38 200', unit: '/ 60000 км', progress: 0.64, fill: 'green' },
      { key: 'hours', label: 'Моточасы', icon: 'timer-sand', value: '9 840', unit: 'ч', progress: 0.7, fill: 'gold' },
      { key: 'adblue', label: 'AdBlue', icon: 'water-percent', value: '28', unit: '%', progress: 0.28, fill: 'amber', target: 'Dashboard' },
      { key: 'km', label: 'Пробег', icon: 'speedometer', value: '642 300', unit: 'км', progress: 0.64, fill: 'violet' },
    ],
    reminders: [
      { id: 'tr1', title: 'AdBlue заканчивается', subtitle: 'осталось 28% · ~520 км', icon: 'water-percent', urgency: 'danger', value: '520', unit: 'км', group: 'overdue' },
      { id: 'tr2', title: 'Топливный фильтр (грубый)', subtitle: 'просрочено на 1 200 км', icon: 'filter-variant', urgency: 'danger', value: '−1200', unit: 'км', group: 'overdue' },
      { id: 'tr3', title: 'ТО по моточасам', subtitle: 'при 10 000 ч', icon: 'cog', urgency: 'warn', value: '160', unit: 'ч', group: 'week' },
      { id: 'tr4', title: 'Масло двигателя', subtitle: 'при 660 000 км', icon: 'oil', urgency: 'warn', value: '17 800', unit: 'км', group: 'month' },
      { id: 'tr5', title: 'Масло редуктора (мост)', subtitle: 'при 700 000 км', icon: 'cog-transfer-outline', urgency: 'ok', value: '57 700', unit: 'км', group: 'later' },
      { id: 'tr6', title: 'Тахограф · калибровка', subtitle: '12 марта 2027', icon: 'card-account-details-outline', urgency: 'ok', value: '273', unit: 'дня', group: 'later' },
    ],
    history: [
      { id: 'th1', type: 'adblue', name: 'Долив AdBlue · 40 л', icon: 'water-percent', date: '8 июн', mileage: '640 100 км', place: 'АЗС Лукойл М7', cost: 2400 },
      { id: 'th2', type: 'fuel_filter', name: 'Фильтры топливные (2 шт)', icon: 'filter-variant', date: '14 май', mileage: '628 000 км', place: 'DAF Сервис Казань', cost: 9800 },
      { id: 'th3', type: 'tires', name: 'Замена резины · ведущая ось', icon: 'truck', date: '2 апр', mileage: '615 400 км', place: 'ШинТракСервис', cost: 86000 },
      { id: 'th4', type: 'maintenance', name: 'ТО-M3 (по моточасам)', icon: 'cog', date: '10 фев', mileage: '600 200 км', place: 'DAF Сервис Казань', cost: 64500 },
      { id: 'th5', type: 'engine_oil', name: 'Масло двигателя · Shell Rimula', icon: 'oil', date: '10 фев', mileage: '600 200 км', place: 'DAF Сервис Казань', cost: 28400 },
    ],
    // Truck tires organized by axle position
    tires: [
      {
        id: 'tt1', season: 'summer', manufacturer: 'Michelin', model: 'X Line Energy Z',
        size: '315/70 R22.5', treadMm: 11.2, treadMax: 16, distanceKm: 142000, distanceLabel: 'км · рулевая ось', active: true, axle: 'Рулевая ось (1)',
      },
      {
        id: 'tt2', season: 'summer', manufacturer: 'Michelin', model: 'X Line Energy D',
        size: '315/70 R22.5', treadMm: 9.0, treadMax: 22, distanceKm: 27000, distanceLabel: 'км · ведущая ось', active: true, axle: 'Ведущая ось (2)',
      },
      {
        id: 'tt3', season: 'summer', manufacturer: 'Hankook', model: 'TH31',
        size: '385/65 R22.5', treadMm: 6.5, treadMax: 16, distanceKm: 198000, distanceLabel: 'км · прицеп', active: true, axle: 'Прицеп (3 оси)',
      },
      {
        id: 'tt4', season: 'winter', studType: 'friction', manufacturer: 'Nokian', model: 'Hakka Truck',
        size: '315/70 R22.5', treadMm: 14.0, treadMax: 16, distanceKm: 38000, distanceLabel: 'км · зимний комплект', active: false, axle: 'Зимний комплект (склад)',
      },
    ],
  },
];

export const fmtMoney = (n: number) => n.toLocaleString('ru-RU') + ' ₽';
