import React from "react";

type ItemProps = {
  name: string;
  quantity: number;
  category: string;
  onSelect: () => void;
};

export default function Item({ name, quantity, category, onSelect }: ItemProps) {
  return (
    <li 
      onClick={onSelect}
      className="p-2 mb-2 bg-slate-900 cursor-pointer hover:bg-slate-800 rounded-md transition-colors"
    >
      <h2 className="text-xl font-bold text-white">{name}</h2>
      <div className="text-sm text-gray-300">
        Buy {quantity} in {category}
      </div>
    </li>
  );
}