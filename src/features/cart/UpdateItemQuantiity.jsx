import React from 'react';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseItemQuantity,
  getCurrentitemQuantityByid,
  increaseItemQuantity,
} from './cartSlice';

const UpdateItemQuantiity = ({ pizzaId }) => {
  const getCartItemQuantity = useSelector(getCurrentitemQuantityByid(pizzaId));
  const dispatch = useDispatch();
  const inc = () => {
    dispatch(increaseItemQuantity(pizzaId));
  };
  const dec = () => {
    dispatch(decreaseItemQuantity(pizzaId));
  };
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button className="button rounded-ful h-8 w-8 p-0" onClick={inc}>
        +
      </Button>
      <span className="text-sm font-medium">{getCartItemQuantity}</span>
      <Button className="button rounded-ful h-8 w-8 p-0" onClick={dec}>
        -
      </Button>
    </div>
  );
};

export default UpdateItemQuantiity;
