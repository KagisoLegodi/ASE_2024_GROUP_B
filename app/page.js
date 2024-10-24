
import RecipeCard from "./components/RecipeCard";

import { fetchRecipes } from "@/lib/api";

export default async function Home() {
  
  let recipes = [];
  try{
    const data = await fetchRecipes();
    recipes = data

  }catch(error){

  }
  return (
    <main>
      <h1 className="text-2xl font-bold text-center mb-8">Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
};
