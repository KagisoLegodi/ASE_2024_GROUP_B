import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { Heart } from "lucide-react";

/**
 * Header component with navigation and logout functionality.
 *
 * @component
 * @param {Object} props - Props passed to the component.
 * @param {boolean} props.isDarkMode - Current theme state (dark or light).
 * @param {Function} props.toggleTheme - Function to toggle the theme.
 * @param {Object} props.user - User session data (e.g., email).
 * @returns {JSX.Element} - The rendered Header component.
 */
const Header = ({ isDarkMode, toggleTheme, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Logout function
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/authorisation/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        window.location.href = "/"; // Redirect to home after logout
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const [favouriteCount, setFavouriteCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsLoggedIn(!!token);
  
    const fetchFavouriteCount = async () => {
      if (!token) return;
      try {
        const response = await fetch("/api/favourites?action=count", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setFavouriteCount(data.count);
        }
      } catch (error) {
        console.error("Error fetching favourite count:", error);
      }
    };
  
    fetchFavouriteCount();
  
    // Update favourites count on custom event
    const updateCount = () => {
      fetchFavouriteCount();
    };
    window.addEventListener("favouritesUpdated", updateCount);
  
    return () => {
      window.removeEventListener("favouritesUpdated", updateCount);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[var(--header-bg)] bg-opacity-80 shadow-md backdrop-blur-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <div className="h-10 cursor-pointer flex items-center">
              {isDarkMode ? (
                <Image
                  src="/ArejengLogoDark.png"
                  alt="Logo for Dark Theme"
                  width={120}
                  height={120}
                  className="h-auto w-auto"
                />
              ) : (
                <Image
                  src="/ArejengLogo.png"
                  alt="Logo for Light Theme"
                  width={120}
                  height={120}
                  className="h-auto w-auto"
                />
              )}
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/recipe">
            <span className="hover:text-[var(--link-hover)] cursor-pointer">
              Recipes
            </span>
          </Link>
          <Link href="/favourites">
            <span className="hover:text-[var(--link-hover)] cursor-pointer">
              Favourites ({favouriteCount})
            </span>
          </Link>
          <Link href="/shoppingList">
            <span className="hover:text-[var(--link-hover)] cursor-pointer">
              Shopping-list
            </span>
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-[var(--button-bg)] px-3 py-1 rounded-full"
            >
              <span className="font-bold text-[var(--logout-text)]">Logout</span>
            </button>
          ) : (
            <>
              <Link href="/login">
                <button className="bg-[var(--button-bg)] px-3 py-1 rounded-full">
                  <span className="font-bold text-[var(--login-text)]">Login</span>
                </button>
              </Link>
              <Link href="/signup">
                <button className="bg-[var(--button-bg)] px-3 py-1 rounded-full">
                  <span className="font-bold text-[var(--signup-text)]">
                    Sign Up
                  </span>
                </button>
              </Link>
            </>
          )}
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
