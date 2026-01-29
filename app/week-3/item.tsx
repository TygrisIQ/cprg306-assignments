import React from 'react';

interface ItemProps {
  name: string;
  quantity: number;
  category: string;
}

const Item: React.FC<ItemProps> = ({ name, quantity, category }) => {
  return (
    <li className="p-2 m-4 bg-slate-900 max-w-sm border border-slate-800 rounded-md">
      <h2 className="text-xl font-bold text-white">{name}</h2>
      <div className="text-sm text-slate-300">
        Buy {quantity} in <span className="capitalize">{category}</span>
      </div>
    </li>
  );
};

export default Item;
