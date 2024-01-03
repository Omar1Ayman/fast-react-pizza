import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem, getCurrentitemQuantityByid } from '../cart/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonDeleteItem from '../cart/ButtonDeleteItem';
import UpdateItemQuantiity from '../cart/UpdateItemQuantiity';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const getCartItemQuantity = useSelector(getCurrentitemQuantityByid(id));
  const isInCart = getCartItemQuantity > 0;

  const handelAddItemToCart = () => {
    console.log(pizza);
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
    toast.success(`successfully added ${name}`, {
      draggable: true,
      theme: 'dark',
    });
  };

  return (
    <>
      <li className="flex cursor-pointer gap-4 py-3 ">
        <img
          src={imageUrl}
          alt={name}
          className={` h-28 w-28  rounded-md ${
            soldOut ? 'opacity-70 grayscale' : ''
          }`}
        />
        <div className="flex grow flex-col pt-0.5">
          <p className="font-medium">{name}</p>
          <p className="text-sm capitalize italic text-stone-500">
            {ingredients.join(', ')}
          </p>
          <div className=" mt-auto flex items-center justify-between ">
            {!soldOut ? (
              <p className="mr-5 text-sm">{formatCurrency(unitPrice)}</p>
            ) : (
              <p className="text-sm font-medium uppercase text-stone-500">
                Sold out
              </p>
            )}
            {isInCart && (
              <div className="flex items-center gap-3 sm:gap-8">
                {<UpdateItemQuantiity pizzaId={id} />}
                <ButtonDeleteItem pizzaId={id} />
              </div>
            )}

            {!soldOut && !isInCart && (
              <Button
                onClick={handelAddItemToCart}
                className="button text-[12px] md:px-5 md:py-2.5 "
              >
                Add to cart
              </Button>
            )}
          </div>
        </div>
      </li>
      <ToastContainer draggable />
    </>
  );
}

export default MenuItem;
