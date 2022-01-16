import { MdOutlineMoney } from 'react-icons/md';
import { FaCcApplePay, FaRegCreditCard, FaGooglePay } from 'react-icons/fa';
import { SiSamsungpay } from 'react-icons/si';
import { BiTransfer } from 'react-icons/bi';
import { BsBank } from 'react-icons/bs';

const mappings = {
  'ApplePay': FaCcApplePay,
  'Bank': BsBank,
  'CreditCard': FaRegCreditCard,
  'GooglePay': FaGooglePay,
  'Money': MdOutlineMoney,
  'SamsungPay': SiSamsungpay,
  'Transfer': BiTransfer,
  'PayMe': renderSVG({
    tag:'svg',
    attr:{ height: '1.5em', width: '2.25em', viewBox:'-21.70245 -48.07 188.0879 288.42' },
    children:[
      { tag:'path', attr:{ d:"M71.848 35.761c-21.079-.03-38.25 17.047-38.28 38.07-.015 10.33.11 35.835.11 36.092a2.175 2.175 0 002.16 2.174h.011c.267 0 26.57-.106 35.895-.093 21.08.03 38.253-17.048 38.282-38.069.028-21.02-17.099-38.146-38.178-38.174m-.099 71.876c-7.756-.01-27.237.06-33.755.084-.03-6.426-.113-25.349-.102-33.886.026-18.61 15.257-33.733 33.951-33.707 18.694.027 33.882 15.19 33.856 33.802-.025 18.612-15.254 33.733-33.95 33.707"} },
      { tag:'path', attr:{ d:"M71.87 18.574c-30.33-.043-55.04 24.768-55.084 55.304-.018 11.828.088 37.093.136 48.091-.006.06-.018.117-.018.176l-.07 50.733c0 1.224.97 2.213 2.168 2.215 1.198 0 2.17-.988 2.17-2.209l.06-43.418c8.257-.032 38.67-.144 50.49-.128 30.334.041 55.047-24.767 55.088-55.307.04-30.537-24.604-55.416-54.938-55.457m-.145 106.341c-11.79-.017-42.084.095-50.452.127-.04-8.335-.17-38.037-.15-51.157.036-28.097 22.801-50.928 50.742-50.889 27.942.04 50.642 22.932 50.605 51.03-.038 28.098-22.802 50.926-50.745 50.89"} },
      { tag:'path', attr:{ d:"M72.44 0C32.551-.053.058 32.374.002 72.29c-.027 20.162.211 69.961.213 70.447l-.039 29.95c-.006 5.073 3.36 19.572 18.404 19.593 16.103.022 19.746-13.9 19.752-18.78.005-3.552.262-22.394.35-28.668 11.188-.04 22.375-.058 33.563-.056 39.888.056 72.383-32.373 72.438-72.287C144.737 32.574 112.33.056 72.44 0m-.19 140.343c-6.767-.01-18.62.01-35.237.06-.206 0-.409.03-.606.09l-.502.147a2.21 2.21 0 00-1.572 2.095c-.015 1.08-.37 26.475-.378 30.757 0 .145-.678 14.373-15.37 14.353-13.453-.02-14.036-15.004-14.036-15.156l.042-29.96c-.003-.502-.24-50.288-.213-70.437.05-37.47 30.58-67.91 68.054-67.86 37.478.055 67.924 30.58 67.874 68.05-.05 37.468-30.582 67.913-68.056 67.861"} },
      { tag:'path', attr:{ d:"M72.37 52.95c-11.31-.017-20.527 9.376-20.54 20.94-.008 5.606.055 19.373.055 19.373.006.924.73 1.672 1.624 1.672h.008s13.854-.055 18.796-.048c11.311.014 20.526-9.38 20.542-20.94.015-11.563-9.174-20.982-20.485-20.998zm-.05 37.497c-3.668-.005-12.563.026-16.137.04-.017-3.604-.053-12.46-.048-16.59.013-9.115 7.293-16.519 16.228-16.507 8.937.013 16.197 7.436 16.184 16.552-.01 9.112-7.292 16.518-16.227 16.505z"} }
    ]
  })
};

export default mappings;

function renderSVG({ tag, attr, children = [] }) {
  const Tag = tag;
  return function SVG(props) {
    return (
      <Tag stroke="currentColor" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...attr} {...props}>
        {children.map((child) => parse(child))}
      </Tag>
    );
  };
}

function parse({ tag, attr, children = [] }) {
  const Tag = tag;
  return (
    <Tag {...attr}>
      {children.map((child) => parse(child))}
    </Tag>
  );
}
