import { nanoid } from 'nanoid';

const Transaction = {
  default: () => ({
    type: 'expense',
    datetime: Date.now(),
    category: null,
    subCategory: null,
    amount: '',
    details: '',
    brand: '',
    payment: null,
  }),
  parseForDatabase: (transaction) => ({
    ...transaction,
    id: nanoid(8),
    amount: Number(transaction.amount),
    category: transaction.category.value,
    subCategory: transaction.subCategory?.value,
    payment: transaction.payment?.value,
  }),
  parseForDisplay: (transaction, categories) => ({
    ...transaction,
    time: new Date(transaction.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false}),
    category: categories[transaction.category].display,
    iconColor: categories[transaction.category].color,
    icon: categories[transaction.category].icon,
  }),
  parseMoney: (value) => {
    const strValue = value.toString();
    const [int, dec] = strValue.split('.');
    let str = int.split('').reverse().reduce((moneyStr, digit, idx) => {
      moneyStr += digit;
      if (idx % 3 === 2) {
        moneyStr += ',';
      }
      return moneyStr;
    }, '');
    str = str.split('').reverse().join('');
    if (str.charAt(0) === ',') {
      return `$${str.slice(1)}${dec ? `.${dec}` : ''}`;
    }
    return `$${str}${dec ? `.${dec}` : ''}`;
  }
};

export default Transaction;
