// Моки прототипа «Обновление ключевых атрибутов»

export const TASK = {
  number: '48271',
  createdAt: '19.11.2026 09:42',
  createdDate: '19.11.2026',
  type: 'Обновление ключевых атрибутов',
  description:
    'Актуализация ключевых атрибутов предметов залога по результатам ежегодного мониторинга обеспечения',
  initiator: 'Смирнов Дмитрий Александрович',
  department: 'Департамент залогового обеспечения',
  deadline: '28.11.2026',
}

export const CURRENT_RESPONSIBLE = 'Ковалёва Анна Сергеевна'

export const PEOPLE = [
  'Белов Игорь Николаевич',
  'Васильева Мария Петровна',
  'Громов Алексей Викторович',
  'Дроздова Елена Юрьевна',
  'Захаров Павел Сергеевич',
  'Исаева Ольга Андреевна',
  'Кузнецов Андрей Олегович',
  'Лебедева Наталья Игоревна',
  'Морозов Сергей Валентинович',
  'Новикова Татьяна Алексеевна',
]

export interface PledgeItem {
  id: string
  type: string
  description: string
  pledgor: string
}

const fmt = (n: number) => n.toLocaleString('ru-RU')
const pick = <T,>(arr: T[], i: number) => arr[i % arr.length]

const STREETS = ['Ленина', 'Садовая', 'Мира', 'Гагарина', 'Промышленная', 'Заводская', 'Новослободская', 'Первомайская']
const CITIES = ['Москва', 'Санкт-Петербург', 'Екатеринбург', 'Казань', 'Новосибирск', 'Самара', 'Краснодар']
const CARS = [
  'Toyota Land Cruiser 300',
  'Volkswagen Tiguan',
  'КАМАЗ-65115 самосвал',
  'Hyundai Solaris',
  'Scania R440 седельный тягач',
  'ГАЗ Next Фургон',
]
const MACHINES = [
  'Токарно-фрезерный обрабатывающий центр DMG MORI',
  'Линия розлива и упаковки Krones',
  'Экструзионная линия для производства полимерных труб',
  'Компрессорная станция Atlas Copco GA 90',
  'Погрузчик вилочный Toyota 8FD25',
]
const GOODS = [
  'Строительные материалы (сухие смеси, кровельные материалы)',
  'Зерно пшеницы 3 класса',
  'Продукция лёгкой промышленности (трикотаж)',
  'Металлопрокат (лист, арматура)',
  'Фармацевтическая продукция (безрецептурный отпуск)',
]

// Каждый тип: описание по индексу; updated=true — описание после обновления данных
const TYPES: { name: string; gen: (i: number, updated: boolean) => string }[] = [
  {
    name: 'Жилая недвижимость',
    gen: (i, u) =>
      `Квартира, общая площадь ${u ? 63.4 + (i % 5) : 61.8 + (i % 5)} кв.м, ${pick(CITIES, i)}, ул. ${pick(STREETS, i + 2)}, д. ${10 + i}, кв. ${20 + i * 3}, кадастровый номер 77:0${i % 9}:000${1000 + i}:${200 + i}`,
  },
  {
    name: 'Коммерческая недвижимость',
    gen: (i, u) =>
      `Нежилое помещение (офис), площадь ${u ? 214.5 : 212.0} кв.м, ${pick(CITIES, i + 1)}, пр-т ${pick(STREETS, i)}, д. ${5 + i}, этаж 3, кадастровый номер 78:1${i % 9}:000${2000 + i}:${300 + i}`,
  },
  {
    name: 'Земельный участок',
    gen: (i, u) =>
      `Земельный участок, площадь ${u ? 18.5 : 18.0} сот., категория: земли населённых пунктов, ВРИ: ${pick(['под индивидуальное жилищное строительство', 'для размещения производственной базы', 'склады'], i)}, кадастровый номер 50:2${i % 9}:000${3000 + i}:${i}`,
  },
  {
    name: 'Транспортное средство',
    gen: (i, u) =>
      `${pick(CARS, i)}, VIN XTA${210000 + i * 137}, ${2015 + (i % 9)} г.в., пробег ${fmt((u ? 92400 : 84100) + i * 1300)} км`,
  },
  {
    name: 'Оборудование',
    gen: (i, u) =>
      `${pick(MACHINES, i)}, инв. № ${40000 + i * 11}, остаточная балансовая стоимость ${fmt((u ? 7_850_000 : 8_420_000) + i * 10_000)} руб.`,
  },
  {
    name: 'Товары в обороте',
    gen: (i, u) =>
      `${pick(GOODS, i)}, место хранения: склад ${pick(CITIES, i)}, остаток ${fmt((u ? 1180 : 1240) + i * 5)} ед.`,
  },
  {
    name: 'Права требования',
    gen: (i, u) =>
      `Права требования по договору поставки № ${100 + i}-П/2025 от 1${i % 9}.0${1 + (i % 9)}.2025, размер требования ${fmt((u ? 12_300_000 : 14_500_000) + i * 50_000)} руб.`,
  },
]

const PLEDGORS = [
  'ООО «Северная логистика»',
  'АО «Промтехкомплект»',
  'Иванов Пётр Сергеевич',
  'ООО «Агро-Холдинг Юг»',
  'ИП Соколова Ирина Викторовна',
  'АО «Уральский металлургический комбинат имени академика Белова»',
  'Фёдорова Алла Николаевна',
  'ООО «СтройИнвест»',
  'ПАО «Заводоуправление»',
  'Орлов Максим Андреевич',
  'ООО «Торговый дом „Восток“»',
  'АО «Фармалайн»',
  'Тимофеев Роман Игоревич',
  'ООО «Техносервис»',
]

const TYPE_WEIGHTS = [0, 0, 0, 1, 1, 2, 3, 3, 3, 3, 4, 5, 6, 6, 0, 4]
const COUNT = 64

// Не обновляются: часть предметов в любом файле остаётся без изменений — это нормально
const isUpdated = (i: number) => !(i % 7 === 3 || i % 11 === 5)

const meta = Array.from({ length: COUNT }, (_, i) => {
  const type = TYPES[TYPE_WEIGHTS[i % TYPE_WEIGHTS.length]]
  return { i, type, updated: isUpdated(i) }
})

export const ITEMS_BEFORE: PledgeItem[] = meta.map(({ i, type }) => ({
  id: `ПЗ-${String(104200 + i * 13).padStart(7, '0')}`,
  type: type.name,
  description: type.gen(i, false),
  pledgor: pick(PLEDGORS, i * 5 + 2),
}))

export const ITEMS_AFTER: PledgeItem[] = meta.map(({ i, type, updated }, k) => ({
  ...ITEMS_BEFORE[k],
  description: updated ? type.gen(i, true) : ITEMS_BEFORE[k].description,
}))

export const TYPE_NAMES = TYPES.map((t) => t.name)
export const PLEDGOR_NAMES = Array.from(new Set(ITEMS_BEFORE.map((x) => x.pledgor))).sort((a, b) =>
  a.localeCompare(b, 'ru'),
)

export interface SummaryRow {
  type: string
  total: number
  updated: number
  notUpdated: number
}

export function buildSummary(): SummaryRow[] {
  return TYPE_NAMES.map((type) => {
    const idx = meta.filter((m) => m.type.name === type)
    const updated = idx.filter((m) => m.updated).length
    return { type, total: idx.length, updated, notUpdated: idx.length - updated }
  }).filter((r) => r.total > 0)
}

export interface FileError {
  key: number
  row: number
  column: string
  message: string
}

export const CHECK_ERRORS: FileError[] = [
  { key: 1, row: 12, column: 'Описание', message: 'Поле не может быть пустым' },
  { key: 2, row: 27, column: 'Залогодатель', message: 'Значение не найдено в справочнике контрагентов' },
  { key: 3, row: 41, column: 'ID предмета залога', message: 'Предмет залога не относится к этой задаче' },
  { key: 4, row: 58, column: 'Описание', message: 'Превышена максимальная длина (1000 символов)' },
]

export const UPDATE_ERRORS: FileError[] = [
  { key: 1, row: 9, column: 'Описание', message: 'Предмет залога заблокирован другой операцией' },
  { key: 2, row: 33, column: 'Залогодатель', message: 'Сервис справочника контрагентов недоступен' },
]
