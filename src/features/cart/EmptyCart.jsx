import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <div className="mt-5">
      <Link
        to="/menu"
        className="text-sm text-blue-500 hover:text-blue-700 hover:underline"
      >
        &larr; Back to menu
      </Link>

      <p className="mt-7 pl-5 font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
