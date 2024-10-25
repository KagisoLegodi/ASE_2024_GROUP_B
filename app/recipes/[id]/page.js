import { fetchProductById } from "../../../lib/api";

export default async function RecipeDetail({ params }) {
  const { id } = params;
  let recipe;

  // Fetch recipe data
  try {
    recipe = await fetchProductById(id);
  } catch (error) {
    console.error("Failed to fetch recipe:", error);
  }

  const handleBack = () => {
    // Define navigation logic
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <p className="text-xl text-gray-700 mb-4">Category: {recipe.category}</p>
      <p className="text-lg text-gray-600 mb-4">{recipe.description}</p>
      <p className="text-md text-gray-500 mb-4">Published: {new Date(recipe.published).toDateString()}</p>
      <p className="text-md text-gray-500 mb-4">Servings: {recipe.servings}</p>

      <div className="flex flex-col md:flex-row mb-8">
        <div className="bg-gray-200 p-4 rounded-xl">
          <img
            src={recipe.images[0]}
            alt={recipe.title}
            className="w-full h-[400px] object-contain mx-auto rounded"
          />
        </div>
        {recipe.images.length > 1 && (
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {recipe.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-[90px] h-[60px] object-contain rounded"
              />
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Tags:</h3>
        <ul className="list-disc pl-5">
          {recipe.tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Instructions:</h3>
        <ul className="list-decimal pl-5">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="mb-2">{step}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Nutrition Facts:</h3>
        <p>{recipe.nutrition.calories} kcal</p>
        {/* Add other nutrition data as needed */}
      </div>
    </main>
  );
}
