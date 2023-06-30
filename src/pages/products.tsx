import { Product, getProducts } from "@stripe/firestore-stripe-payments";
import { payments } from "@/firebase/payments";

export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  return {
    props: {
      products,
    },
  };
};

export default function Products({ products }: { products: Product[] }) {
  return (
    <>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.prices[0].unit_amount}</p>
        </div>
      ))}
    </>
  );
}
