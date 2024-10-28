// RecipeCard.stories.js
import RecipeCard from "./RecipeCard";

const meta = {
  title: "RecipeDetails/RecipeCard",
  component: RecipeCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

// Fetching recipes function
async function fetchRecipes() {
  try {
    // Log the URL being fetched
    console.log("Fetching recipes from URL:", "./api/recipe");

    // Make API request to fetch recipes from your endpoint
    const response = await fetch("./api/recipe");

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch recipes");
    }

    // Parse and return the response data
    const data = await response.json();
    return Array.isArray(data) ? data : []; // Ensure it returns an array
  } catch (error) {
    // Handle and return any errors that occur during the fetch
    console.error("Error fetching recipes:", error);
    return []; // Return an empty array on error
  }
}

// Fetch the data first and then create the story
const dataPromise = fetchRecipes();

// Create a loading state while fetching the data
export const Primary = {
  render: async () => {
    const data = await dataPromise;
    const recipe = data && data.length > 0 ? data[0] : null;

    return <RecipeCard recipe={recipe} />;
  },
};

// Sample API route for fetching a single recipe by its ID (if needed)
// Make sure this API route is correctly configured in your Next.js app
import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

/**
 * Server-side API route to fetch a single recipe by its ID.
 */
export async function GET(_req, { params }) {
  const { id } = params;

  try {
    // Connect to the MongoDB client
    const client = await clientPromise;
    const db = client.db('devdb');

    // Fetch the recipe document by its _id
    const recipe = await db.collection('recipes').findOne({ _id: id });

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    // Return the recipe data
    return NextResponse.json(recipe);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch recipe' }, { status: 500 });
  }
}
