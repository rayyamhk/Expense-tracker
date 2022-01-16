import PropTypes from 'prop-types';
import NextLink from 'next/link';
import useStyles from '../../../hooks/useStyles';
import styles from './Link.module.css';

export default function Link({ href, children, className, ...props}) {
  const css = useStyles(styles);
  return (
    <NextLink href={href}>
      <a className={css('link', className)} {...props}>
        {children}
      </a>
    </NextLink>
  );
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};
