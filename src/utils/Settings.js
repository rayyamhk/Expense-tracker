import { MdOutlineRestaurant, MdRepeat, MdOutlineCreditCard, MdMoney, MdOutlineFilter8 } from 'react-icons/md';

const utils = {
  getFakeSettings,
  parseCategoryOptions,
  parseSubcategoryOptions,
  parsePayments,
  parsePaymentOptions,
};

export default utils;

function getFakeSettings() {
  return {
    categories: {
      'food': {
        icon: <MdOutlineRestaurant />,
        color: '#FBC531',
        display: 'Food',
      },
      'regular': {
        icon: <MdRepeat />,
        color: '#03A9F4',
        display: 'Regular',
      },
    },
    subcategories: {
      'food': {
        'breakfast': 'Breakfast',
        'lunch': 'Lunch',
        'afternoon_tea': 'Afternoon Tea',
        'dinner': 'Dinner',
        'late_night_snack': 'Late-Night Snack',
        'refreshments': 'Refreshments',
        'drinks': 'Drinks',
      },
      'regular': {
        'rental_fee': 'Rental Fee',
        'utilities': 'Utilities',
        'subscriptions': 'Subscriptions',
        'salary': 'Salary',
      },
    },
    payments: {
      'cash': {
        display: 'Cash',
        icon: <MdMoney />,
        color: '#FBC531',
      },
      'credit_card': {
        display: 'Credit Card',
        icon: <MdOutlineCreditCard />,
        color: '#FBC531',
      },
      'octopus_card': {
        display: 'Octopus Card',
        icon: <MdOutlineFilter8 />,
        color: '#FBC531',
      },
    },
    time: {
      format: 'HH:mm',
    },
    date: {
      format: 'MMM DD, YYYY'
    },
    day: {
      format: 'ddd',
    },
  };
};

function parseCategoryOptions(categories) {
  return Object.entries(categories).map(([value, options]) => ({
    value,
    ...options,
  }));
};

function parseSubcategoryOptions(subcategories) {
  if (!subcategories) {
    return [];
  }
  return Object.entries(subcategories).map(([value, display]) => ({ value, display }));
};

function parsePayments(payments) {
  const obj = {};
  Object.entries(payments).forEach(([val, options]) => {
    obj[val] = options.display;
  });
  return obj;
};

function parsePaymentOptions(payments) {
  return Object.entries(payments).map(([val, opt]) => ({
    value: val,
    ...opt,
  }));
};