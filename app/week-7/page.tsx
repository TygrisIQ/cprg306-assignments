"use client";

import { useState } from "react";
import NewItem from "../week-4/new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "../week-5/items.json"; // Make sure this is imported!

export default function Page() {
  // Pass itemsData here, NOT Item!
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem: { name: string; quantity: number; category: string }) => {
    const itemWithId = { ...newItem, id: Math.random().toString(36).substring(2, 9) };
    setItems((prevItems) => [...prevItems, itemWithId]);
  };

  const handleItemSelect = (item: { name: string }) => {
    // Clean the string (remove sizes/quantities and emojis)
    let cleanedName = item.name.split(',')[0].trim();
    cleanedName = cleanedName.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
    
    setSelectedItemName(cleanedName);
  };

  return (
    <main className="bg-slate-950 p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-white text-center md:text-left md:ml-10">Shopping List</h1>
      <div className="flex flex-col md:flex-row gap-8 justify-center md:justify-start">
        <div className="flex-1 max-w-sm">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        
        <div className="flex-1 max-w-lg">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}