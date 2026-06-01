import { Carrot, ChefHat, Clock, Eye, Pencil, Trash } from "lucide-react";
import type { recipeType } from "../types/recipeType";

export const recipeCard: React.FC<{
  recipe: recipeType;
  onView: () => void;
  onEdit: () => void;
  onRemove: () => void;
}> = ({ recipe, onView, onEdit, onRemove }) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{recipe.title}</h2>
      </div>
      <div className="grow border-t border-gray-400 my-2"></div>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <ChefHat></ChefHat>
          <p className="text-gray-600 text-sm">{recipe.prepTime || "-"}</p>
        </div>
        <div className="flex items-center gap-1">
          <Clock></Clock>
          <p className="text-gray-600 text-sm">{recipe.cookTime || "-"}</p>
        </div>
        <div className="flex items-center gap-1">
          <Carrot></Carrot>
          <p className="text-gray-600 text-sm">{recipe.ingredients.length}</p>
        </div>
        {recipe.instructions && (
          <p className="text-gray-700 mb-4">
            Instructions: {recipe.instructions}
          </p>
        )}
        {recipe.link && (
          <p className="text-gray-700 mb-4">Link: {recipe.link}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-2 rounded-lg transition"
          onClick={onView}
        >
          <Eye></Eye>
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-2 rounded-lg transition"
          onClick={onEdit}
        >
          <Pencil></Pencil>
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-2 rounded-lg transition"
          onClick={() => {
            if (confirm("Are you sure you want to delete this recipe?")) {
              onRemove();
            }
          }}
        >
          <Trash></Trash>
        </button>
      </div>
    </div>
  );
};

export default recipeCard;
