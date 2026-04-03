import { useState } from "react";
import { SidebarButton } from "./SidebarButton";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header className="flex items-center justify-between py-4 px-6 bg-red-400 shadow-md absolute top-0 right-0 left-0">
        <h1 className="text-2xl font-bold text-gray-800">What to Eat?</h1>
        <a
          className="text-gray-600 hover:text-gray-800 mr-4 cursor-pointer bg-red-300 px-3 py-1 rounded-md transition hover:bg-red-400 border-2 border-white"
          onClick={() => {
            setMenuOpen((prev) => !prev);
          }}
        >
          Menu
        </a>
      </header>
      <nav
        className={`absolute w-34 top-16 transition duration-200 my-2 -right-34 ${!menuOpen ? "" : "-translate-x-30"}`}
      >
        <SidebarButton className="bg-red-500" destination="">
          Home
        </SidebarButton>
        <SidebarButton className="bg-blue-500" destination="recipes">
          Recipes
        </SidebarButton>
        <SidebarButton className="bg-green-500" destination="ingredients">
          Ingredients
        </SidebarButton>
      </nav>
    </>
  );
};
