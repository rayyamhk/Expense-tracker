export type Falsy = false | 0 | '' | undefined | null;
export type Color = 'red' | 'pink' | 'purple' | 'deep-purple' | 'indigo'
                  | 'lightblue' | 'cyan' | 'teal' | 'green' | 'lightgreen'
                  | 'lime' | 'yellow' | 'amber' | 'orange' | 'deep-orange'
                  | 'brown' | 'bluegray';
export type Language = 'en-US';
export type DateType = 'fulldate' | 'date' | 'datetime' | 'time';
export type DateFormat = 'MMM DD, YYYY' | 'DD MMM, YYYY' | 'MM/DD/YYYY' | 'DD/MM/YYYY';
export type TimeFormat = 'HH:mm' | 'HH:mm A';
export type CalendarCell = {
  current: boolean,
  day: number
};
export type IconType = 'material_icons' | 'jpg' | 'png' | 'svg';
export type SelectedItem = {
  id: string,
  value: string,
  icon?: string,
  iconType?: IconType,
  color?: string,
};
export type Settings = {
  theme: {
    mode: 'light' | 'dark',
    color: Color,
  },
  language: Language,
  budget: number,
  dateTimeFormat: {
    date: DateFormat,
    time: TimeFormat,
  },
  categories: SelectedItem[],
  subcategories: SelectedItem[],
  payments: SelectedItem[],
};