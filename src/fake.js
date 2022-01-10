import { MdOutlineRestaurant, MdRepeat, MdOutlineCreditCard, MdMoney, MdOutlineFilter8 } from 'react-icons/md';

export const todayExpense = [
  {
    "id": 0,
    "date": "2022-01-04",
    "time": "20:05",
    "type": "expense",
    "amount": "72.5",
    "category": "Food",
    "subcategory": "Dinner",
    "tags": [],
    "brand": "McDonald's",
    "details": "Nostrud ut duis dolor excepteur ipsum labore ut excepteur sunt duis nisi pariatur mollit."
  },
  {
    "id": 1,
    "date": "2022-01-04",
    "time": "11:17",
    "type": "income",
    "amount": "23,000",
    "category": "Regular",
    "subcategory": "Salary",
    "tags": [],
    "brand": null,
    "details": "Elit deserunt nulla aliqua elit."
  },
  {
    "id": 2,
    "date": "2022-01-04",
    "time": "08:31",
    "type": "expense",
    "amount": "37.0",
    "category": "Food",
    "subcategory": "Breakfast",
    "tags": [],
    "brand": null,
    "details": "Cupidatat occaecat veniam et voluptate sunt."
  },
];

export const categories = {
  'Food': {
    icon: MdOutlineRestaurant,
    color: '#FBC531'
  },
  'Regular': {
    icon: MdRepeat,
    color: '#03A9F4'
  }
}

export const categoryOptions = [
  { icon: null, display: 'Entertainment', value: 'entertainment' },
  { icon: <MdOutlineRestaurant />, display: 'Food', value: 'food' },
  { icon: <MdOutlineRestaurant />, display: 'Transport1', value: 'transport1' },
  { icon: <MdOutlineRestaurant />, display: 'Transport2', value: 'transport2' },
  { icon: <MdOutlineRestaurant />, display: 'Transport3', value: 'transport3' },
  { icon: <MdOutlineRestaurant />, display: 'Transport4', value: 'transport4' },
  { icon: <MdOutlineRestaurant />, display: 'Transport5', value: 'transport5' },
  { icon: <MdOutlineRestaurant />, display: 'Transport6', value: 'transport6' },
  { icon: <MdOutlineRestaurant />, display: 'Transport7', value: 'transport7' },
  { icon: <MdOutlineRestaurant />, display: 'Transport8', value: 'transport8' },
];

export const paymentOptions = [
  { icon: <MdMoney />, display: 'Cash', value: 'cash' },
  { icon: <MdOutlineCreditCard />, display: 'Credit Card', value: 'credit_card' },
  { icon: <MdOutlineFilter8 />, display: 'Octopus Card', value: 'octopus_card' },
];
