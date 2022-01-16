import { MdOutlineRestaurant, MdRepeat, MdOutlineCreditCard, MdMoney, MdOutlineFilter8 } from 'react-icons/md';

const utils = {
  _parsePayments,
  _parsePaymentOptions,

  getFakeSettings,
  parseCategoryOptions,
  parseSubcategoryOptions,
};

export default utils;

/**
 * Input:
 * [
 *    { id, value, icon, color },
 *    ...
 * ]
 * Output:
 * {
 *    id: { value, icon, color },
 *    ...
 * }
 */
function _parsePayments(payments = []) {
  return payments.reduce((obj, payment = {}) => {
    const { id, ...rest } = payment;
    obj[id] = rest;
    return obj;
  }, {});
};

/**
 * Input:
 * {
 *    id: { value, icon, color },
 *    ...
 * }
 * Output:
 * [
 *    { id, value, icon, color },
 *    ...
 * ]
 */
function _parsePaymentOptions(payments = {}) {
  return Object.entries(payments).map(([key, val]) => ({
    id: key,
    ...val,
  }));
};

// ==================================

function getFakeSettings() {
  return {
    categories: {
      'food': {
        icon: <MdOutlineRestaurant />,
        color: '#FBC531',
        value: 'Food',
      },
      'regular': {
        icon: <MdRepeat />,
        color: '#03A9F4',
        value: 'Regular',
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
    id: value,
    ...options,
  }));
};

function parseSubcategoryOptions(subcategories) {
  if (!subcategories) {
    return [];
  }
  return Object.entries(subcategories).map(([key, value]) => ({ id: key, value }));
};
