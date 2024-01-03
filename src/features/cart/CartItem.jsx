import { useDispatch } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonDeleteItem from './ButtonDeleteItem';
import UpdateItemQuantiity from './UpdateItemQuantiity';
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantiity pizzaId={pizzaId} />
        <ButtonDeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
