"use client";

import NewItem from "./new-item";

export default function Page() {
  const handleAddItem = (item: any) => {
    console.log(item);
    alert(`Added Item: ${item.name}, Quantity: ${item.quantity}, Category: ${item.category}`);
  };

  return (
    <main className="flex justify-center w-full bg-black h-screen pt-10">
      <NewItem onAddItem={handleAddItem} />
    </main>
  );
}