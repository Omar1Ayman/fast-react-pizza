import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, deleteItem } from './cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
  const cart = useSelector((s) => s.cart.cart);
  const username = useSelector((s) => s.user.username);
  const dispatch = useDispatch();

  const clear = () => {
    dispatch(clearCart());
    toast.success('successfully cleard', {
      draggable: true,
      theme: 'dark',
    });
  };
  if (cart.length < 1) return <EmptyCart />;
  return (
    <div className="mt-5">
      <Link
        to="/menu"
        className="text-sm text-blue-500 hover:text-blue-700 hover:underline"
      >
        &larr; Back to menu
      </Link>

      <h2 className="my-3">Your cart, {username}</h2>

      <ul className="my-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={cart.pizzaId} />
        ))}
      </ul>
      <div className="space-x-5">
        <Link to="/order/new" className="button px-3 py-2">
          Order pizzas
        </Link>
        {cart.length >= 1 && (
          <Button
            onClick={clear}
            className="button ring-stone-20  bg-transparent px-3 py-2 text-stone-400 ring-1 hover:text-stone-700"
          >
            Clear Cart
          </Button>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Cart;
