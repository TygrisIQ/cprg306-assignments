"use client";

import { useState } from "react";
import Item from "./item";

interface ItemProps {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

export default function ItemList({ items }: { items: ItemProps[] }) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ItemProps[]>);

  Object.keys(groupedItems).forEach((key) => {
    groupedItems[key].sort((a, b) => a.name.localeCompare(b.name));
  });

  return (
    <div className="m-4 max-w-sm mx-auto">
      <div className="flex gap-2 mb-4">
        <label className="text-white pt-2">Sort by: </label>
        <button
          onClick={() => setSortBy("name")}
          className={`p-1 m-2 w-28 ${sortBy === "name" ? "bg-orange-500" : "bg-orange-700"}`}
        >
          Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`p-1 m-2 w-28 ${sortBy === "category" ? "bg-orange-500" : "bg-orange-700"}`}
        >
          Category
        </button>
        <button
          onClick={() => setSortBy("grouped")}
          className={`p-1 m-2 w-28 ${sortBy === "grouped" ? "bg-orange-500" : "bg-orange-700"}`}
        >
          Grouped
        </button>
      </div>

      {sortBy === "grouped" ? (
        <div>
          {Object.keys(groupedItems)
            .sort()
            .map((category) => (
              <div key={category}>
                <h3 className="capitalize text-xl font-bold text-orange-400 mt-4 mb-2 pl-4">
                  {category}
                </h3>
                <ul className="pl-0">
                  {groupedItems[category].map((item) => (
                    <Item key={item.id} {...item} />
                  ))}
                </ul>
              </div>
            ))}
        </div>
      ) : (
        <ul className="pl-0">
          {sortedItems.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </ul>
      )}
    </div>
  );
}