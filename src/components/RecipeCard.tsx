import { Eye, Pencil, Trash } from "lucide-react";
import type { recipeType } from "../types/recipeType";

export const recipeCard: React.FC<{
  recipe: recipeType;
  onView: () => void;
  onEdit: () => void;
  onRemove: () => void;
}> = ({ recipe, onView, onEdit, onRemove }) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
        <p className="text-gray-700 mb-4">
          {recipe.instructions
            ? recipe.instructions
            : "No instructions available."}
        </p>
        <p className="text-gray-700 mb-4">
          {recipe.link ? recipe.link : "No link available."}
        </p>
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
    </div>
  );
};

export default recipeCard;
