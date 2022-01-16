const utils = {
  parseQuery,
};

export default utils;

function parseQuery(query = {}) {
  const fields = [
    'from',
    'to',
    'category',
    'subcategory',
  ];
  return fields.reduce((q, field) => {
    if (query[field]) {
      q[field] = query[field];
    }
    return q;
  }, {});
};
