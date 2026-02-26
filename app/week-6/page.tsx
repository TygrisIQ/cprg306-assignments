"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "../week-5/item-list";
import itemsData from "../week-5/items.json";

export default function Page() {
  // Initialize state with the JSON data
  const [items, setItems] = useState(itemsData);

  // Event handler to add a new item
  const handleAddItem = (newItem: { name: string; quantity: number; category: string }) => {
    // Generate a random ID for the new item
    const itemWithId = { 
      ...newItem, 
      id: Math.random().toString(36).substring(2, 9) 
    };
    
    // Create a new array with the existing items plus the new item
    setItems([...items, itemWithId]);
  };

  return (
    <main className="bg-slate-950 p-4 min-h-screen">
      <h1 className="text-3xl font-bold m-2 text-white max-w-sm mx-auto">Shopping List</h1>
      
      {/* Pass the event handler to NewItem */}
      <NewItem onAddItem={handleAddItem} />
      
      {/* Pass the items state to ItemList */}
      <ItemList items={items} />
    </main>
  );
}