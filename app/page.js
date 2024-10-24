<<<<<<< HEAD
import { MongoClient } from 'mongodb';

/**
 * Fetches recipes from the MongoDB database.
 * 
 * Connects to the MongoDB instance using the URI provided in the environment variables
 * and retrieves the first 20 recipes from the 'recipes' collection.
 * 
 * @async
 * @function fetchRecipes
 * @returns {Promise<Array>} A promise that resolves to an array of recipe objects from the database.
 */
async function fetchRecipes() {
  const uri = process.env.MONGODB_URI; // MongoDB URI from environment variables
  const client = new MongoClient(uri); // Initialize the MongoDB client

  try {
    // Connect to the MongoDB client
    await client.connect();
    
    // Connect to the specific database
    const db = client.db('devdb'); // Replace 'devdb' with your actual database name
    
    // Fetch the first 20 recipes from the 'recipes' collection
    const recipes = await db.collection('recipes').find().limit(20).toArray();
    
    return recipes;
  } catch (error) {
    // Log any error that occurs during fetching
    console.error('Failed to fetch recipes:', error);
    return [];
  } finally {
    // Ensure that the client is closed after the operation
    await client.close();
  }
}

/**
 * The main functional component that fetches and renders the list of recipes.
 * 
 * The component calls `fetchRecipes` to retrieve data from the database and renders
 * a grid of recipe cards. The layout is responsive, showing:
 * - 1 column on small screens
 * - 2 columns on small devices (640px and above)
 * - 3 columns on medium devices (768px and above)
 * - 4 columns on large devices (1024px and above)
 * 
 * Each recipe card displays the title, category, image, cooking time, preparation time,
 * number of servings, and publication date.
 * 
 * @async
 * @function Home
 * @returns {JSX.Element} The JSX layout for the recipes page.
 */
export default async function Home() {
  // Fetch the data from the MongoDB database
  const recipes = await fetchRecipes();

  return (
    <main>
      <h1 className="text-2xl font-bold text-center mb-8">Recipes</h1>
    </main>
=======

export default function Home() {

  return (
    <div>
      <main><p>123</p></main>
    </div>
>>>>>>> main
  );
}
