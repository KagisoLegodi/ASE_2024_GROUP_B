// RecipeCard.stories.js
import RecipeCard from "./RecipeCard";

// Mock data for the RecipeCard
const mockRecipe = {
  title: "Delicious Pasta",
  prep: 15,
  cook: 30,
  images: [
    "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg", // Use a valid image URL
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
