export default function Transaction(props) {
  return (
    <h1>Transaction {props.id}</h1>
  );
}

export function getStaticPaths() {
  return {
    paths: [
      { params: { id: '0' } },
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
      { params: { id: '4' } },
    ],
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  return {
    props: {
      id: params.id
    }
  };
}
