import { nanoid } from 'nanoid';
import Settings from './Settings';

const Transaction = {
  default: () => ({
    type: 'expense',
    datetime: Date.now(),
    category: undefined,
    subcategory: undefined,
    amount: undefined,
    payment: undefined,
    brand: undefined,
    details: undefined,
  }),
  parseForDatabase: (transaction) => ({
    ...transaction,
    id: nanoid(8),
    amount: Number(transaction.amount),
    category: transaction.category.value,
    subcategory: transaction.subcategory?.value,
    payment: transaction.payment?.value,
  }),
  parseForDisplay: (transaction, settings) => {
    let { payments, categories, subcategories } = settings;
    const { payment, category, subcategory } = transaction;
    payments = Settings.parsePayments(payments);
    return {
      ...transaction,
      payment: payments[payment],
      category: categories[category].display,
      subcategory: subcategories[category][subcategory],
      iconColor: categories[category].color,
      icon: categories[category].icon,
    };
  },
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
  },
};

export default Transaction;
