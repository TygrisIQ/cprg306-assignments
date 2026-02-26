"use client";

import { useState } from "react";
import NewItem from "../week-4/new-item";
import ItemList from "../week-5/item-list";
import itemsData from "../week-5/items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);

  const handleAddItem = (newItem: { name: string; quantity: number; category: string }) => {
    const itemWithId = { ...newItem, id: Math.random().toString(36).substring(2, 9) };
    setItems((prevItems) => [...prevItems, itemWithId]);
  };

  return (
    <main className="bg-slate-950 p-4 min-h-screen">
      <h1 className="text-3xl font-bold m-2 text-white max-w-sm mx-auto">Shopping List</h1>
      <NewItem onAddItem={handleAddItem} />
      <ItemList items={items} />
    </main>
  );
}