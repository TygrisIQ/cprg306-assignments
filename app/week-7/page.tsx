"use client";
import { useState } from "react";
import NewItem from "../week-4/new-item";
import ItemList from "../week-5/item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "../week-5/items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem: { name: string; quantity: number; category: string }) => {
    const itemWithId = { ...newItem, id: Math.random().toString(36).substring(2, 9) };
    setItems((prevItems) => [...prevItems, itemWithId]);
  };

  const handleItemSelect = (item: { name: string }) => {
    let cleanName = item.name.split(",")[0].trim();
    cleanName = cleanName.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, "").trim();
    setSelectedItemName(cleanName);
  };

  return (
    <main className="bg-slate-950 p-4 min-h-screen">
      <h1 className="text-3xl font-bold m-2 text-white text-center">Shopping List</h1>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <div>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div>
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}