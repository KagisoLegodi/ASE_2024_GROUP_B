import clientPromise from "@/lib/mongodb"; // MongoDB client

/**
 
API route handler for fetching recipes from the 'recipes' collection in MongoDB.
Handles a GET request and returns a JSON response with the fetched recipes.*
@async
@function GET
@param {Request} request - The incoming request object containing the URL with query parameters.
@returns {Promise<Response>} - A response object containing the fetched recipes in JSON format
or an error message if the request fails.*/
export async function GET() {
 

  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("devdb"); // Connect to the 'devdb' database

    // Fetch all recipes from the 'recipes' collection
    const recipes = await db.collection("recipes").find({}).toArray();

    // Return the fetched recipes in JSON format with a 200 status code
    return new Response(JSON.stringify(recipes), { status: 200 });
  } catch (error) {
    console.error(error);
    // Return an error message in JSON format with a 500 status code
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}0