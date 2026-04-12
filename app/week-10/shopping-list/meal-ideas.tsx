"use client";

import { useState, useEffect } from "react";

async function fetchMealIdeas(ingredient: string) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const data = await response.json();
  return data.meals || [];
}

export default function MealIdeas({ ingredient }: { ingredient: string }) {
  const [meals, setMeals] = useState<{ idMeal: string; strMeal: string; strMealThumb: string }[]>([]);

  useEffect(() => {
    if (!ingredient) return;
    fetchMealIdeas(ingredient).then(setMeals);
  }, [ingredient]);

  return (
    <div className="m-4 p-4 bg-slate-900 rounded-lg max-w-sm w-full">
      <h2 className="text-xl font-bold text-white mb-3">
        {ingredient ? `Meal ideas for: ${ingredient}` : "Select an item to see meal ideas"}
      </h2>
      {meals.length === 0 && ingredient && (
        <p className="text-gray-400 text-sm">No meals found.</p>
      )}
      <ul>
        {meals.map((meal) => (
          <li key={meal.idMeal} className="flex items-center gap-3 py-2 border-b border-slate-700 last:border-0">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-12 h-12 rounded-md object-cover"
            />
            <span className="text-white text-sm">{meal.strMeal}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}