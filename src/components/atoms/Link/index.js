import PropTypes from 'prop-types';
import NextLink from 'next/link';

export default function Link({ href, children, ...props}) {
  return (
    <NextLink href={href}>
      <a {...props}>
        {children}
      </a>
    </NextLink>
  );
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node,
};
