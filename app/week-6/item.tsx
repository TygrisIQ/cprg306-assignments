import React from "react";

export default function Item({ name, quantity, category }: { name: string; quantity: number; category: string }) {
  return (
    <li className="p-2 my-4 bg-slate-900 w-full hover:bg-orange-800 cursor-pointer list-none">
      <h2 className="text-xl font-bold text-white">{name}</h2>
      <div className="text-sm text-gray-300">
        Buy {quantity} in {category}
      </div>
    </li>
  );
}