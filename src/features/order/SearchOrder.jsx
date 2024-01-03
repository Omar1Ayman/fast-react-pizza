import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchOrder = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const handelSubmit = (e) => {
    e.preventDefault();
    navigate(`/order/${query}`);
    setQuery('');
  };
  return (
    <form onSubmit={handelSubmit}>
      <input
        className="bg-yello-100 w-20 rounded-full px-4 py-2 text-sm font-semibold transition-all placeholder:text-stone-400  focus:w-80 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 focus:ring-offset-2 sm:w-64"
        type="text"
        placeholder="Serch for order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchOrder;
