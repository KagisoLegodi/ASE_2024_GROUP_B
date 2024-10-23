import { fetchRecipes } from "../lib/dummyData/fetchSampleData";
export default function Home() {

  // Usage example
const allRecipes = fetchRecipes();
console.log(allRecipes);

  return (
    <div>
      <main></main>
      <footer></footer>
    </div>
  );
}
