import Link from "next/link";
import Image from "next/image";
import { PrepTimeIcon } from "./PrepTimeIcon";
import { CookTimeIcon } from "./CookTimeIcon";

export default function RecipeCard(recipe) {
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="bg-white shadow-soft rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow p-6">
      <Image
        src={recipe.images[0]}
        alt={recipe.title}
        className="w-full h-40 object-contain"
        width={500}
        height={500}
        quality={75}
        priority
      />
      <h3 className="text-black font-bold mt-2 text-lg text-gradient-primary">
        {recipe.title}
      </h3>
      <div className="flex flex-row justify-between items-center mt-2">
        <div className="flex flex-col items-center text-gray-400 p-4">
          <PrepTimeIcon />
          {recipe.prep} mins
        </div>
        <div className="flex flex-col items-center text-gray-400 text-center">
          <CookTimeIcon />
          {/* Include any other details here */}
        </div>
      </div>
    </div>
  );
}
