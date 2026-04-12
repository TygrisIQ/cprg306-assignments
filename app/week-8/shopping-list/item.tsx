import React from "react";

type ItemProps = {
  name: string;
  quantity: number;
  category: string;
  onSelect: () => void;
  onDelete: () => void;
};

export default function Item({ name, quantity, category, onSelect, onDelete }: ItemProps) {
  return (
    <li className="p-2 mb-2 bg-slate-900 rounded-md flex justify-between items-center">
      <div
        onClick={onSelect}
        className="cursor-pointer hover:bg-slate-800 flex-1 rounded transition-colors p-1"
      >
        <h2 className="text-xl font-bold text-white">{name}</h2>
        <div className="text-sm text-gray-300">
          Buy {quantity} in {category}
        </div>
      </div>
      <button
        onClick={onDelete}
        className="ml-3 text-red-400 hover:text-red-300 font-bold text-lg px-2"
      >
        ✕
      </button>
    </li>
  );
}