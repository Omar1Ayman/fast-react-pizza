import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import EmptyCart from '../cart/EmptyCart';
import {
  clearCart,
  getTotalCArtPrice,
  getTotalCArtQuantity,
} from '../cart/cartSlice';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const FormErrors = useActionData();
  const dispatch = useDispatch();
  const cart = useSelector((s) => s.cart.cart);
  const totalCArtPrice = useSelector(getTotalCArtPrice);
  const priorityPrice = withPriority ? totalCArtPrice * 0.2 : 0;
  const totalPrice = totalCArtPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="flex flex-col items-center gap-5 p-5 ">
      <h2 className=" text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form
        method="POST"
        className="w-full rounded-lg px-3 py-5 shadow-lg shadow-slate-600"
      >
        <div className="mb-5 flex flex-col gap-1  sm:flex-row sm:items-center ">
          <label className="font-semibold sm:basis-40">First Name</label>
          <input
            className="input grow px-3"
            type="text"
            name="customer"
            required
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex  flex-col gap-1  sm:flex-row sm:items-center ">
          <label className="font-semibold sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              className="input w-full px-3"
              type="tel"
              name="phone"
              required
            />
            {FormErrors?.phone && (
              <p className="mt-2 rounded-md p-2 text-xs text-red-700">
                {FormErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-1 sm:flex-row sm:items-center">
          <label className="font-semibold sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full px-3"
              type="text"
              name="address"
              required
              defaultValue={address}
              disabled={isLoadingAddress}
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[0px] top-[0px] z-50 md:right-[0px] md:top-[0px]">
              <Button
                className="button txt-sm p-2 font-thin"
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="space-x-3">
          <input
            className="mb-3 h-5 w-5  rounded px-2 font-semibold accent-yellow-400 shadow-sm focus:outline-none"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div className="mt-3">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button
            disabled={isSubmitting || isLoadingAddress}
            className="button"
          >
            {isSubmitting
              ? 'Placing order....'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      'please give us your correct phone number we might need it to contact you';
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  console.log(newOrder);
  return redirect(`/order/${newOrder.id}`);
};
export default CreateOrder;
