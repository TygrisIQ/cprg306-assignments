"use client";

import { useState, useEffect } from "react";

const fetchMealIdeas = async (ingredient: string) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
};

export default function MealIdeas({ ingredient }: { ingredient: string }) {
  const [meals, setMeals] = useState<any[]>([]);

  const loadMealIdeas = async () => {
    if (ingredient) {
      const fetchedMeals = await fetchMealIdeas(ingredient);
      setMeals(fetchedMeals);
    } else {
      setMeals([]);
    }
  };

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="flex-1 mt-4 max-w-md mx-auto w-full">
      <h2 className="text-2xl font-bold text-white mb-4">Meal Ideas</h2>
      {ingredient ? (
        meals.length > 0 ? (
          <div>
            <p className="text-white mb-4">Here are some meal ideas using {ingredient}:</p>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {meals.map((meal) => (
                <li key={meal.idMeal} className="bg-slate-800 p-2 rounded-lg shadow-md hover:bg-slate-700 transition-colors">
                  <p className="text-white text-center font-semibold mb-2">{meal.strMeal}</p>
                  <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-auto rounded-md" />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-white">No meal ideas found for {ingredient}.</p>
        )
      ) : (
        <p className="text-white">Select an item to see meal ideas.</p>
      )}
    </div>
  );
}