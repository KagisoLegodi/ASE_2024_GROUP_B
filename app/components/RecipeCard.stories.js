// RecipeCard.stories.js
import RecipeCard from "./RecipeCard";

// Mock data for the RecipeCard
const mockRecipe = {
  title: "Delicious Pasta",
  prep: 15,
  cook: 30,
  images: [
    "https://images.unsplash.com/photo-1481931098730-318b6f776db0?q=80&w=2790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Use a valid image URL
  ],
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "RecipeCard/RecipeCard",
  component: RecipeCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { ...mockRecipe }, // Spread the mockRecipe properties
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    ...mockRecipe, // Spread the mockRecipe properties here too
  },
};
