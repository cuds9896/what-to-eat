import type { recipeType } from "../types/recipeType";

export const recipeCard: React.FC<{
  recipe: recipeType;
  onView: () => void;
  onEdit: () => void;
}> = ({ recipe, onView, onEdit }) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
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
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            onClick={onView}
          >
            View
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            onClick={onEdit}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default recipeCard;
