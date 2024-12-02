"use client";

import React, { useState, useEffect } from "react";
import { Edit, Save, X } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function RecipeDescriptionEdit({
  initialDescription,
  recipeId,
  onDescriptionUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(initialDescription);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log("Received recipeId:", recipeId);
  }, [recipeId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDescription(initialDescription);
  };

  const getUserId = async () => {
    try {
      console.log("Attempting to fetch user ID...");
      const response = await fetch("/api/get-user-id");
  
      if (!response.ok) {
        console.error("Failed to fetch user ID. Status:", response.status);
        throw new Error("Failed to retrieve user ID");
      }
  
      const { userId } = await response.json();
      console.log("User ID successfully retrieved:", userId);
      return userId;
    } catch (error) {
      console.error("Error in getUserId:", error);
      return null;
    }
  };
  
  
  async function handleSubmit(event) {
    event.preventDefault();
  
    console.log("handleSubmit triggered...");
    console.log("Fetching user ID...");
  
    try {
      const userId = await getUserId(); // Ensure this returns the correct userId
      console.log("User ID successfully retrieved:", userId);
  
      const updatedDescription = "I have made this recipe a thousand times..."; // Example description
      console.log("Submitting updated description:", updatedDescription);
  
      // Include all required fields in the request body
      const response = await fetch(
        `http://localhost:3000/api/recipes/${recipeId}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId, // Ensure this field is passed if required
            description: updatedDescription, // Field to update
          }),
        }
      );
  
      const data = await response.json();
      if (!response.ok) {
        console.error("Error response from update API:", data);
        throw new Error("Failed to update description");
      }
  
      console.log("Description updated successfully:", data);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  }
  
  
  

  if (isEditing) {
    return (
      <div className="relative">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter recipe description"
        />
        <div className="flex justify-end mt-2 space-x-2">
          <Button variant="ghost" onClick={handleCancel} disabled={isSubmitting}>
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <p className="flex-grow mr-4">{description}</p>
      <Button variant="outline" size="sm" onClick={handleEdit}>
        <Edit className="mr-2 h-4 w-4" /> Edit
      </Button>
    </div>
  );
}