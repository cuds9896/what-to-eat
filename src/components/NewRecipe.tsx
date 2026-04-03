import { useState } from "react";
import type { recipeType } from "../types/recipeType";
import type { ingredientType, unitType } from "../types/ingredientType";

export const newRecipe: React.FC<{
  recipe: recipeType;
  onSubmit: (recipe: recipeType) => void;
}> = ({ recipe, onSubmit }) => {
  const [ingredientsList, setIngredientsList] = useState<ingredientType[]>(
    recipe.ingredients || [],
  );

  const [recipeToEdit, setRecipeToEdit] = useState<recipeType>(
    recipe || { name: "", ingredients: [] },
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newIngredientsList = ingredientsList.filter(
      (ingredient) => ingredient.name && ingredient.quantity,
    );
    const newRecipe: recipeType = {
      name: formData.get("recipeName") as string,
      ingredients: newIngredientsList,
    };
    onSubmit(newRecipe);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl z-10">
      <h2 className="text-xl font-semibold mb-4">Add New Recipe</h2>
      <p className="text-gray-600 ">
        Use the form below to add a new recipe to your collection.
      </p>
      <div className="grow border-t border-gray-400 my-4"></div>
      <form
        className="mt-4"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label className="block text-gray-700 mb-2">Recipe Name</label>
        <input
          type="text"
          value={recipeToEdit.name}
          onChange={(e) => {
            setRecipeToEdit((prev) => ({ ...prev, name: e.target.value }));
          }}
          name="recipeName"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="flex items-center mb-4 flex-col">
          <label className="block text-gray-700 mb-2">Ingredients</label>
          {ingredientsList.map((ingredient, index) => (
            <div key={index} className="flex items-center mb-2 gap-2 w-full">
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) => {
                  const updatedIngredients = [...ingredientsList];
                  updatedIngredients[index].name = e.target.value;
                  setIngredientsList(updatedIngredients);
                }}
                className="w-8/12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Ingredient name"
              />
              <input
                type="text"
                value={ingredient.quantity}
                onChange={(e) => {
                  const updatedIngredients = [...ingredientsList];
                  updatedIngredients[index].quantity = e.target.value;
                  setIngredientsList(updatedIngredients);
                }}
                className="w-2/12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Qty"
              />
              <select
                value={ingredient.unit}
                onChange={(e) => {
                  const updatedIngredients = [...ingredientsList];
                  updatedIngredients[index].unit = e.target.value as unitType;
                  setIngredientsList(updatedIngredients);
                }}
                className="w-2/12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <button
                type="button"
                className="ml-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                onClick={() => {
                  setIngredientsList((prev) =>
                    prev.filter((_, i) => i !== index),
                  );
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            onClick={() => {
              setIngredientsList([
                ...ingredientsList,
                { name: "", quantity: "", unit: "g" as unitType },
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
  );
};

export default newRecipe;
