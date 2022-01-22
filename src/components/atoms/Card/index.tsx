import PropTypes from 'prop-types';
import css from '../../../utils/css';

export type CardProps = {
  children?: React.ReactNode,
  className?: string,
  component?: React.ElementType,
  elevation?: number,
  squared?: boolean,
} & React.AllHTMLAttributes<HTMLElement>;

const elevations = {
  0: 'shadow-none',
  1: 'shadow-md',
  2: 'shadow-lg',
  3: 'shadow-xl',
};

export default function Card(props: CardProps) {
  const {
    children,
    className,
    component: Tag = 'div',
    elevation = 0,
    squared = false,
    ...rest
  } = props;

  const classes = css(
    'p-4',
    elevations[elevation],
    !squared && 'rounded-md',
    className,
  );

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.string,
  elevation: PropTypes.oneOf([0, 1, 2, 3]),
  squared: PropTypes.bool,
};
