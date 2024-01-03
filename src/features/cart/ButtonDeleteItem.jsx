import React from 'react';
import { deleteItem } from './cartSlice';
import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ButtonDeleteItem = ({ pizzaId }) => {
  const dispatch = useDispatch();
  const delet = () => {
    console.log(pizzaId);
    dispatch(deleteItem(pizzaId));
    toast.success(`successfully deleted`, {
      draggable: true,
      theme: 'dark',
    });
  };
  return (
    <>
      <Button onClick={delet} className="button text-[12px] md:px-5 md:py-2.5">
        Delete
      </Button>
    </>
  );
};

export default ButtonDeleteItem;
