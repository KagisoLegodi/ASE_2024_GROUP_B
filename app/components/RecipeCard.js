import { fetchRecipes } from "../../lib/dummyData/fetchSampleData";

export const RecipeCard = () => {
  // Usage example
  const allRecipes = fetchRecipes();
  console.log(allRecipes);

  return (
    <div>
      <h1>Hello</h1>
      <p>This is my recipe</p>
    </div>
  );
};
