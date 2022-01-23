import { Falsy } from '../types';

type className = string | Falsy;
type classNames = Array<className | Array<className>>

export default function css(...classNames: classNames): string {
  const classes: string[] = [];
  classNames.forEach((className) => {
    if (typeof className === 'string') {
      classes.push(className);
    } else if (Array.isArray(className)) {
      classes.push(css(...className));
    }
  });
  return classes.join(' ').trim();
};

export function prefix(prefix: string, classNames: string): string {
  prefix = prefix.trim();
  classNames = classNames.trim();
  return classNames.split(' ').filter((str) => !!str).map((str) => prefix + str).join(' ');
};
