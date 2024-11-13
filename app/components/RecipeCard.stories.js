// RecipeCard.stories.js
import RecipeCard from "./RecipeCard";

// Mock data for the RecipeCard
const mockRecipe = {
  title: "Classic Spaghetti Carbonara",
  prep: 15,
  cook: 30,
  images: [
    "https://images.unsplash.com/photo-1481931098730-318b6f776db0?q=80&w=2790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  published: "2023-09-15",
};


const meta = {
  title: "RecipeCard/RecipeCard",
  component: RecipeCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: 'text' },
    prep: { control: 'number' },
    cook: { control: 'number' },
    images: { control: 'array' },
    published: { control: 'date' },
  },
  args: { ...mockRecipe },
};

export default meta;

export const Primary = {
  args: {
    ...mockRecipe
  },
};
