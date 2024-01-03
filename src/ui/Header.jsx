import React from 'react';
import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import UserName from '../features/user/UserName';

const Header = () => {
  return (
    <header className=" h-20 bg-yellow-400  shadow-lg">
      <div className="container mx-auto flex h-full w-full items-center justify-between ">
        <Link
          className="text-2xl font-semibold uppercase tracking-widest"
          to="/"
        >
          Fas React Pizza
        </Link>
        <SearchOrder />
        <UserName>Unknown</UserName>
      </div>
    </header>
  );
};

export default Header;
