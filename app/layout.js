import './global.css';
/**
 * Metadata configuration for the Next.js application.
 * This object defines various site-wide metadata, including
 * titles, descriptions, icons, social sharing information, and more.
 */
export const metadata = {
  title: "Arejeng Recipes",
  description: "Arejeng Recipe App is your ultimate culinary companion, offering an extensive collection of easy-to-follow recipes that cater to every taste and occasion. Whether you're a seasoned chef or a kitchen newbie, our app empowers you to discover, save, and share delicious recipes from around the world. With step-by-step instructions, customizable recipe options, and handy cooking tips, Arejeng Recipe App makes every meal a memorable experience. Explore new flavors, create mouth-watering dishes, and let your cooking journey begin!",
  icons: {
    icon: [
      { rel: "icon", url: "/favicon-192x192.png", sizes: "192x192" },
      { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
      { rel: "shortcut icon", url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  applicationName: "ArejengRecipeApp",
  openGraph: {
    title: "Arejeng Recipe App",
    description: "Arejeng Recipe App is your ultimate culinary companion, offering an extensive collection of easy-to-follow recipes that cater to every taste and occasion. Whether you're a seasoned chef or a kitchen newbie, our app empowers you to discover, save, and share delicious recipes from around the world. With step-by-step instructions, customizable recipe options, and handy cooking tips, Arejeng Recipe App makes every meal a memorable experience. Explore new flavors, create mouth-watering dishes, and let your cooking journey begin",
    // Uncomment and add the correct URL of the website if available
    // url: "https://mywebsite.com", 
    type: "website",
    images: [
      {
        // Uncomment and add the correct URL for the Open Graph image if available
        // url: "https://yourwebsite.com/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Arejeng Recipe App",
      },
    ],
  },
  keywords: ["recipes", "cooking", "food", "ArejengRecipeApp"],
  author: "Neo Phetoane, Gomolemo Mogono, Omphile Morwane, Ikanyeng Adams, Kagiso Legodi, Jonas Mokawane $ Hlolelo Rampete", 
};

/**
 * Viewport configuration for the Next.js application.
 * Moved the themeColor here as per the latest Next.js requirements.
 */
export const viewport = {
  themeColor: "#ffffff",
};

/**
 * Root layout component for the Next.js application.
 * This component wraps the entire app, providing the main HTML structure.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The nested content to render inside the layout.
 * @returns {JSX.Element} The RootLayout component.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
