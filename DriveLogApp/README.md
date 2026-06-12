# DriveLog — React Native (Expo)

Премиальное приложение учёта обслуживания **легковых авто и фур** (дальнобой). Тёмная luxury-тема: градиенты, стекломорфизм, золотые акценты. Иконки — `@expo/vector-icons` (без эмодзи).

## Запуск

```bash
cd DriveLogApp
npm install          # или: yarn
npx expo start       # затем нажмите i (iOS), a (Android) или отсканируйте QR в Expo Go
```

> Если версии пакетов конфликтуют с вашей версией Expo — выполните `npx expo install --fix`, он подгонит совместимые версии под установленный SDK.

## Что внутри

Полностью кликабельное приложение с навигацией (нижние табы + стек):

| Экран | Файл | Назначение |
|---|---|---|
| Гараж | `screens/GarageScreen.tsx` | Список ТС: легковой + фура, выбор активного |
| Дашборд | `screens/DashboardScreen.tsx` | Индекс здоровья, статы, напоминания — **адаптируется под тип ТС** |
| История | `screens/HistoryScreen.tsx` | Таймлайн работ, фильтры, сводка расходов |
| Расходы | `screens/StatsScreen.tsx` | Графики по месяцам/категориям, экспорт PDF |
| Шины | `screens/TireScreen.tsx` | Комплекты; для фуры — **по осям** (рулевая/ведущая/прицеп) |
| Напоминания | `screens/RemindersScreen.tsx` | Группировка по срочности |
| Добавить событие | `screens/AddEventScreen.tsx` | Форма; набор типов зависит от ТС |
| Настройки / О приложении | `screens/SettingsScreen.tsx`, `AboutScreen.tsx` | Тема, биометрия, бэкап |

## Режим фуры (truck)

Для `kind: 'truck'` (`src/data.ts`) включается грузовая логика:

- **Моточасы** (engine hours) как отдельный показатель наряду с пробегом;
- **AdBlue** — уровень реагента + предупреждение на дашборде;
- **Шины по осям** — рулевая, ведущая, прицеп; разный износ и пробег;
- **Тягач + полуприцеп** — отдельный госномер прицепа, число осей;
- **Большие интервалы** (масло 60 000 км, ТО по моточасам), грузовые расходники (топливные фильтры ×2, масло редуктора моста, тахограф).

Переключение легковой ↔ фура — на экране «Гараж» (тап по карточке).

## Архитектура

```
src/
  theme.ts                 палитра, градиенты, шрифты, радиусы
  types.ts                 модель Vehicle (car | truck), шины, события
  data.ts                  моковые данные: Toyota Camry + DAF XF (фура+прицеп)
  context/VehicleContext   выбранное ТС, переключение
  components/               Background, GlassCard, HealthGauge (SVG), StatCard,
                            ReminderRow, Fab, Screen, common (кнопки/аватар)
  navigation/              RootNavigator (stack+tabs), кастомный TabBar
  screens/                 экраны (см. таблицу)
```

## Стек

React Native 0.74 · Expo SDK 51 · TypeScript · React Navigation 6 · react-native-svg · expo-linear-gradient · expo-blur · @expo/vector-icons (Material Community Icons) · Manrope + Sora (Google Fonts).

Данные сейчас моковые (`src/data.ts`). Следующий шаг — подключить SQLite (`expo-sqlite`) по схеме из ТЗ и заменить контекст на репозиторий БД.
