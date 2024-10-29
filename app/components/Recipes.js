"use client";

import React, { useEffect, useState } from 'react';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recipes from the API
  useEffect(() => {
    const fetchRecipes = async () => {
        try {
          console.log("Fetching recipes...");
          const response = await fetch('/api/recipes');
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          console.log("Fetched recipes:", data);
          setRecipes(data);
        } catch (error) {
          console.error("Error fetching recipes:", error.message);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      

    fetchRecipes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (recipes.length === 0) {
    return <div>No recipes found.</div>;
  }

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            {/* Add more fields from your recipe object as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipes;
