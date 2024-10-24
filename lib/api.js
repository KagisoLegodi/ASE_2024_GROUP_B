export async function fetchRecipes() {
  try {
    // Log the URL being fetched
    console.log("Fetching recipes from URL:", "/api/recipes");

    // Make API request to fetch recipes from your endpoint
    const response = await fetch("/api/recipes");

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch recipes");
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle and return any errors that occur during the fetch
    return `Error fetching recipes: ${error.message}`;
  }
}
