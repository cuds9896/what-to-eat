import { useEffect, useState } from "react";
import { getRecipes } from "../api";
import type { recipeType } from "../types/recipeType";
import NewRecipe from "../components/NewRecipe";
import RecipeCard from "../components/RecipeCard";

export const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<recipeType[]>([]);
  const [showAddRecipePopup, setShowAddRecipePopup] = useState<boolean>(false);
  const [recipeToEdit, setRecipeToEdit] = useState<recipeType | null>(null);
  const [recipeNumber, setRecipeNumber] = useState<number>(-1);

  useEffect(() => {
    getRecipes()
      .then((recipes) => {
        setRecipes(recipes);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Recipes</h1>
      <p className="text-gray-700 mb-4">
        Here you can browse and manage your recipes.
      </p>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="min-h-64 overflow-y-auto mb-4 max-h-full">
          {recipes.length === 0 ? (
            <p className="text-gray-600">No recipes found. Add some!</p>
          ) : (
            recipes.map((recipe, id) => (
              <RecipeCard
                key={id}
                recipe={recipe}
                onView={() => {
                  console.log("View recipe:", recipe);
                }}
                onEdit={() => {
                  setRecipeNumber(id);
                  setRecipeToEdit(recipe);
                  setShowAddRecipePopup(true);
                }}
              />
            ))
          )}
        </div>
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
          onClick={() => setShowAddRecipePopup(true)}
        >
          Add New Recipe
        </button>
      </div>
      {showAddRecipePopup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-black opacity-50 absolute inset-0"></div>
          <NewRecipe
            recipe={recipeToEdit || { name: "", ingredients: [] }}
            onSubmit={(recipe) => {
              const tempRecipes = [...recipes];
              if (recipeNumber === -1) {
                tempRecipes.push(recipe);
              } else {
                tempRecipes[recipeNumber] = recipe;
              }
              setRecipes(tempRecipes);
              setShowAddRecipePopup(false);
              setRecipeToEdit(null);
              setRecipeNumber(-1);
            }}
          />
        </div>
      )}
    </div>
  );
};
