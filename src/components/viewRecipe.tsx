import { CircleX } from "lucide-react";
import type { recipeType } from "../types/recipeType";

const viewRecipe: React.FC<{
  recipe: recipeType;
  onClose: () => void;
}> = ({ recipe, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black opacity-50 absolute inset-0"></div>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold mb-4">{recipe.title}</h2>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            onClick={onClose}
          >
            <CircleX></CircleX>
          </button>
        </div>
        <p className="text-gray-700 mb-4">
          {recipe.instructions
            ? recipe.instructions
            : "No instructions available."}
        </p>
        <p className="text-gray-700 mb-4">
          {recipe.link ? recipe.link : "No link available."}
        </p>
      </div>
    </div>
  );
};

export default viewRecipe;
