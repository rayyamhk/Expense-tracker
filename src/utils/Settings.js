const utils = {
  _arrayToObject,
  _objectToArray,

  getFakeSettings,
};

export default utils;

// parse settings from database and store it to state.
function _arrayToObject(settings = []) {
  return settings.reduce((obj, setting) => {
    const { id, ...rest } = setting;
    if (id) {
      obj[id] = rest;
    }
    return obj;
  }, {});
};

// parse settings from state to select options.
function _objectToArray(settings = {}) {
  return Object.entries(settings).map(([key, val]) => ({
    id: key,
    ...val,
  }));
};

// ==================================

function getFakeSettings() {
  return {
    categories: {
      'food': {
        // icon: <MdOutlineRestaurant />,
        color: '#FBC531',
        value: 'Food',
      },
      'regular': {
        // icon: <MdRepeat />,
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
