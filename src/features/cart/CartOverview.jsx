import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCArtPrice, getTotalCArtQuantity } from './cartSlice';

function CartOverview() {
  const cart = useSelector((s) => s.cart.cart);
  const totalCArtQuantity = useSelector(getTotalCArtQuantity);
  const totalCArtPrice = useSelector(getTotalCArtPrice);

  if (!totalCArtQuantity) return null;
  return (
    <div className=" bg-stone-800 ">
      <div className="container mx-auto flex items-center justify-between py-5 uppercase text-stone-200">
        <p className="space-x-3 font-semibold text-stone-300">
          <span>{totalCArtQuantity} pizzas</span>
          <span>${totalCArtPrice}</span>
        </p>
        <Link to="/cart">Open cart &rarr;</Link>
      </div>
    </div>
  );
}

export default CartOverview;
