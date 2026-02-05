"use client";

import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");
  const [nameTouched, setNameTouched] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || name.length < 2) {
      alert("Name must be at least 2 characters long.");
      return;
    }

    const item = {
      name,
      quantity,
      category,
    };

    console.log(item);
    
    alert(`Added Item: ${name}, Quantity: ${quantity}, Category: ${category}`);

    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameTouched(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 m-4 bg-slate-900 max-w-sm w-full rounded-lg shadow-md mx-auto">
      <div className="mb-2">
        <input
          type="text"
          placeholder="Item name"
          required
          className={`w-full mt-1 border-2 p-2 rounded-lg text-black bg-white ${nameTouched && name.length === 0 ? "border-red-500 bg-red-100" : "border-gray-300"}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setNameTouched(true)}
        />
        {nameTouched && name.length === 0 && (
            <p className="text-red-500 text-xs mt-1">Name is required.</p>
        )}
      </div>

      <div className="flex justify-between">
        <input
          type="number"
          min="1"
          max="99"
          required
          className="w-20 ml-1 border-2 border-gray-300 p-2 rounded-lg text-black bg-white"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <select
          className="ml-1 border-2 border-gray-300 p-2 rounded-lg text-black bg-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={name.length === 0}
        className="w-full mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        +
      </button>
    </form>
  );
}
