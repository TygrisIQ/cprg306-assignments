"use client";

import { useState } from "react";
import Item from "./item";
import itemsData from "./items.json";

export default function ItemList() {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...itemsData].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  const groupedItems = itemsData.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof itemsData>);

  Object.keys(groupedItems).forEach((category) => {
    groupedItems[category].sort((a, b) => a.name.localeCompare(b.name));
  });

  return (
    <div className="m-4">
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
          Grouped Category
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
        <ul>
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