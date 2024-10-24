import { fetchRecipes } from "../../lib/dummyData/fetchSampleData";

export const RecipeCard = () => {
  // Usage example
  const allRecipes = fetchRecipes();
  console.log(allRecipes);

  return (
    <div>
      <h1>{allRecipes[0].title}</h1>
      <p>{allRecipes[0].description}</p>
    </div>
  );
};
