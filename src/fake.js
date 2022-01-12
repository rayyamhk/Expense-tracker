import { MdOutlineRestaurant, MdRepeat, MdOutlineCreditCard, MdMoney, MdOutlineFilter8 } from 'react-icons/md';

export const categories = {
  'food': {
    icon: MdOutlineRestaurant,
    color: '#FBC531',
    display: 'Food',
  },
  'regular': {
    icon: MdRepeat,
    color: '#03A9F4',
    display: 'Regular',
  }
}

const payments = {
  'cash': 'Cash',
  'credit_card': 'Credit Card',
  'octopus_card': 'Octopus Card',
};

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

const settings = {
  categories,
  payments,
  time: {
    format: 'HH:mm',
  },
  date: {
    format: 'MMM DD, YYYY'
  },
};

export default settings;
