"use client";

import { useState } from "react";
import Item from "./item";

// Define the shape of an Item
type ItemObj = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

// Define the prop types
type ItemListProps = {
  items: ItemObj[];
};

export default function ItemList({ items }: ItemListProps) {
  const [sortBy, setSortBy] = useState("name");

  // Create a copy of the items prop before sorting to prevent mutating the prop
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  const groupedItems = items.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, ItemObj[]>);

  Object.keys(groupedItems).forEach((category) => {
    groupedItems[category].sort((a, b) => a.name.localeCompare(b.name));
  });

  return (
    <div className="m-4 max-w-sm mx-auto">
      {/* Sort Control Buttons */}
      <div className="flex gap-2 mb-4">
        <label className="text-white pt-2">Sort by: </label>
        
        <button
          onClick={() => setSortBy("name")}
          className={`p-1 m-2 w-28 ${
            sortBy === "name" ? "bg-orange-500" : "bg-orange-700"
          }`}
        >
          Name
        </button>

        <button
          onClick={() => setSortBy("category")}
          className={`p-1 m-2 w-28 ${
            sortBy === "category" ? "bg-orange-500" : "bg-orange-700"
          }`}
        >
          Category
        </button>

        <button
          onClick={() => setSortBy("grouped")}
          className={`p-1 m-2 w-28 ${
            sortBy === "grouped" ? "bg-orange-500" : "bg-orange-700"
          }`}
        >
          Grouped
        </button>
      </div>

      {/* Render Logic */}
      {sortBy === "grouped" ? (
        // Render Grouped List
        <div>
          {Object.keys(groupedItems)
            .sort() // Sort categories alphabetically
            .map((category) => (
              <div key={category}>
                <h3 className="capitalize text-xl font-bold text-orange-400 mt-4 mb-2 pl-4">
                  {category}
                </h3>
                <ul>
                  {groupedItems[category].map((item) => (
                    <Item
                      key={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      category={item.category}
                    />
                  ))}
                </ul>
              </div>
            ))}
        </div>
      ) : (
        // Render Flat Sorted List
        <ul className="pl-0">
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      )}
    </div>
  );
}