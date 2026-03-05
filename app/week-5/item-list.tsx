"use client";

import { useState } from "react";
import Item from "./item";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

type ItemListProps = {
  items: ItemType[];
  onItemSelect: (item: ItemType) => void;
};

export default function ItemList({ items, onItemSelect }: ItemListProps) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  return (
    <div className="m-4">
      <div className="flex gap-2 mb-4 items-center">
        <label className="text-white">Sort by: </label>
        <button
          onClick={() => setSortBy("name")}
          className={`p-2 w-28 rounded-md font-semibold ${sortBy === "name" ? "bg-orange-500" : "bg-orange-700"} text-white`}
        >
          Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`p-2 w-28 rounded-md font-semibold ${sortBy === "category" ? "bg-orange-500" : "bg-orange-700"} text-white`}
        >
          Category
        </button>
      </div>

      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
            onSelect={() => onItemSelect(item)}
          />
        ))}
      </ul>
    </div>
  );
}