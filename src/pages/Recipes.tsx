import { useEffect, useState } from "react";
import { getRecipes } from "../api";
import type { recipeType } from "../types/recipeType";
import type { ingredientType, unitType } from "../types/ingredientType";

export const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<recipeType[]>([]);
  const [showAddRecipePopup, setShowAddRecipePopup] = useState<boolean>(false);
  const [ingredientsList, setIngredientsList] = useState<ingredientType[]>([]);

  useEffect(() => {
    getRecipes()
      .then((recipes) => {
        setRecipes(recipes);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  const handleSubmit = () => {
    const newRecipe: recipeType = {
      name: "New Recipe",
      ingredients: [],
    };
    // Call addRecipe API here and update the recipes state
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Recipes</h1>
      <p className="text-gray-700 mb-4">
        Here you can browse and manage your recipes.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
            onClick={() => setShowAddRecipePopup(true)}
          >
            Add New Recipe
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          {recipes.length === 0 ? (
            <p className="text-gray-600">No recipes found. Add some!</p>
          ) : (
            recipes.map((recipe, id) => (
              <div key={id} className="mb-4">
                <h2 className="text-xl font-semibold">{recipe.name}</h2>
              </div>
            ))
          )}
        </div>
        {showAddRecipePopup && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 w-96 z-10">
              <h2 className="text-xl font-semibold mb-4">Add New Recipe</h2>
              <p className="text-gray-600">
                Use the form below to add a new recipe to your collection.
              </p>
            </div>
            <div className="bg-black opacity-50 absolute inset-0"></div>
            <form
              onSubmit={() => {
                handleSubmit();
              }}
            >
              <label className="block text-gray-700 mb-2">Recipe Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex items-center mb-4">
                <label className="block text-gray-700 mb-2">Ingredients</label>
                {ingredientsList.map((ingredient, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      placeholder={ingredient.name}
                    />
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      placeholder={ingredient.quantity}
                    />
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={ingredient.unit}
                      onChange={(e) => {
                        const newIngredientsList = [...ingredientsList];
                        newIngredientsList[index].unit = e.target
                          .value as unitType;
                        setIngredientsList(newIngredientsList);
                      }}
                    >
                      <option value="g">g</option>
                      <option value="kg">kg</option>
                      <option value="ml">ml</option>
                      <option value="l">l</option>
                      <option value="tsp">tsp</option>
                      <option value="tbsp">tbsp</option>
                      <option value="cup">cup</option>
                      <option value="pcs">pcs</option>
                    </select>
                  </div>
                ))}
                <button
                  type="button"
                  className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                  onClick={() => {
                    setIngredientsList([
                      ...ingredientsList,
                      { name: "", quantity: "", unit: "g" },
                    ]);
                  }}
                >
                  Add Ingredient
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
              >
                Add Recipe
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
