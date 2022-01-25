import PropTypes from 'prop-types';
import css from '../../../utils/css';

export type TypographyProps = {
  align?: 'left' | 'center' | 'right',
  children: React.ReactNode,
  className?: string,
  as?: React.ElementType,
  italic?: boolean,
  nowrap?: boolean,
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'caption2',
} & React.HTMLProps<HTMLElement>; // htmlFor

const variants = {
  'h1': 'text-2xl font-bold',
  'h2': 'text-xl font-bold',
  'h3': 'text-lg font-bold',
  'h4': 'text-base font-bold',
  'h5': 'text-base font-medium',
  'h6': 'text-base font-normal',
  'body': 'text-sm font-normal',
  'caption': 'text-xs font-light',
};

const alignments = {
  'left': 'text-left',
  'center': 'text-center',
  'right': 'text-right',
};

export default function Typography(props: TypographyProps) {
  const {
    align = 'left',
    children,
    className,
    as: Tag = 'p',
    italic = false,
    nowrap = false,
    variant = 'body',
    ...rest
  } = props;

  const classes = css(
    'base-text',
    alignments[align],
    variants[variant],
    italic && 'italic',
    nowrap && 'no-wrap',
    className,
  );

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
};

Typography.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.node,
  className: PropTypes.string,
  as: PropTypes.string,
  italic: PropTypes.bool,
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'body',
    'caption',
  ]),
};
