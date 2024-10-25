import { fetchProductById } from "../../../lib/api";

/**
 * The RecipeDetail component fetches and displays a specific recipe based on its ID.
 * It shows the recipe's details, including prep time, cooking time, total time, and servings.
 *
 * @async
 * @function RecipeDetail
 * @param {Object} props - The props object.
 * @param {Object} props.params - The route parameters, containing the recipe ID.
 * @returns {JSX.Element} A React component that displays recipe details.
 *
 * @example
 * // Usage of RecipeDetail component
 * <RecipeDetail params={{ id: 'recipeId' }} />
 */
export default async function RecipeDetail({ params }) {
  const { id } = params;
  let recipe;

  try {
    // Fetch recipe data from the API
    const data = await fetchProductById(id);
    recipe = data; // Assign the fetched recipe to the recipe variable
  } catch (error) {
    console.error("Failed to fetch recipe:", error);
    return <p>Failed to load recipe details.</p>;
  }

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  const { prepTime, cookTime, totalTime, servings, title, description } = recipe;

  /**
   * Formats time in minutes to a readable string (e.g., "15 mins").
   * @param {number} timeInMinutes - The time in minutes.
   * @returns {string} The formatted time string.
   */
  const formatTime = (timeInMinutes) => {
    return `${timeInMinutes} mins`;
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="mb-4">{description}</p>
      {/* Add other recipe details here, like ingredients, steps, or images */}
    </main>
  );
}
