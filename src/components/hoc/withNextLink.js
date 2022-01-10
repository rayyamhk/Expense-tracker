import Link from 'next/link';

export default function withNextLink(Component) {
  return function NextLink({ href, ...props }) {
    return (
      <Link
        href={href}
        passHref
      >
        <Component {...props} />
      </Link>
    );
  };
}
