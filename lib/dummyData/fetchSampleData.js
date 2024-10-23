// Import the recipes array from the file
import { recipes } from './sampleData.js';

// Function to fetch recipes
export const fetchRecipes = () => {
  try {
    // Return the recipes array
    return recipes;
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return [];
  }
};
