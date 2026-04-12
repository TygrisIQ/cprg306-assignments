"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_utils/auth-context";
import NewItem from "../../week-4/new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { getItems, addItem, deleteItem } from "../_services/shopping-list-service";

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();
  interface Item {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

const [items, setItems] = useState<Item[]>([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  const loadItems = async () => {
    if (!user) return;
    const fetchedItems = await getItems(user.uid);
    setItems(fetchedItems);
  };

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  // Protect the page
  if (!user) {
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <p className="text-white text-xl">You must be logged in to view this page.</p>
        <button
          onClick={() => router.push("/week-10")}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded"
        >
          Go to Login
        </button>
      </main>
    );
  }

  const handleAddItem = async (newItem: { name: string; quantity: number; category: string }) => {
    const id = await addItem(user.uid, newItem);
    setItems((prev) => [...prev, { id, ...newItem }]);
  };

  const handleDeleteItem = async (itemId: string) => {
    await deleteItem(user.uid, itemId);
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleItemSelect = (item: { name: string }) => {
    let cleanName = item.name.split(",")[0].trim();
    cleanName = cleanName.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, "").trim();
    setSelectedItemName(cleanName);
  };

  const handleSignOut = async () => {
    await firebaseSignOut();
    router.push("/week-10");
  };

  return (
    <main className="bg-slate-950 p-4 min-h-screen">
      <div className="flex justify-between items-center mb-4 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white">Shopping List</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">{user.displayName}</span>
          <button
            onClick={handleSignOut}
            className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-1 px-4 rounded text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <div>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} onItemDelete={handleDeleteItem} />
        </div>
        <div>
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}