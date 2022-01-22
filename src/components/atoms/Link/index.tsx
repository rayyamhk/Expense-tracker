import PropTypes from 'prop-types';
import NextLink from 'next/link';

export type LinkProps = {
  children?: React.ReactNode,
  className?: string,
  href?: string,
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Link(props: LinkProps) {
  const {
    children,
    className,
    href,
    ...rest
  } = props;

  return (
    <NextLink href={href}>
      <a className={className} {...rest}>
        {children}
      </a>
    </NextLink>
  );
}

Link.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
};
