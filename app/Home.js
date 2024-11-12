import Link from "next/link";

/**
 * Home component that renders the main layout and a link to the Recipe page.
 *
 * @returns {JSX.Element} The Home component.
 */
export default function Home() {
  return (
    <main>
      <h1 className="text-2xl font-bold text-center mb-8">Recipes</h1>

      {/* Link to Recipe page */}
      <div className="text-center mb-4">
        <Link href="/Recipe" className="text-lg text-blue-600 hover:underline">
          View All Recipes
        </Link>
      </div>
    </main>
  );
}
