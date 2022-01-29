const utils = {
  arrayToObject,
  objectToArray,
};

export default utils;

// parse settings from database and store it to state.
function arrayToObject(settings = []): object {
  return settings.reduce((obj, setting) => {
    const { id, ...rest } = setting;
    if (id) {
      obj[id] = rest;
    }
    return obj;
  }, {});
};

// parse settings from state to select options.
function objectToArray(settings = {}) {
  return Object.entries(settings).map(([key, val]) => ({
    id: key,
    ...val,
  }));
};