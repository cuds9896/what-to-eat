import { useEffect, useState } from "react";
import { addRecipe, getRecipes } from "../api";
import type { recipeType } from "../types/recipeType";
import NewRecipe from "../components/NewRecipe";
import RecipeCard from "../components/RecipeCard";
import ViewRecipe from "../components/viewRecipe";
import { removeRecipe } from "../api/removeRecipe";
import { sortArrayOnField } from "../utils/sortArrayOnField";

export default function Recipes() {
  const [recipes, setRecipes] = useState<recipeType[]>([]);
  const [showAddRecipePopup, setShowAddRecipePopup] = useState<boolean>(false);
  const [recipeToEdit, setRecipeToEdit] = useState<recipeType | null>(null);
  const [recipeNumber, setRecipeNumber] = useState<number>(-1);
  const [viewRecipe, setViewRecipe] = useState<recipeType | null>(null);
  const [uniqueIngredients, setUniqueIngredients] = useState<string[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<recipeType[]>([]);

  useEffect(() => {
    getRecipes()
      .then((recipes) => {
        setRecipes(recipes);
        setFilteredRecipes(recipes);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  useEffect(() => {
    const uniqueIngredients = new Set<string>();
    if (recipes.length === 0) {
      setUniqueIngredients([]);
      return;
    }
    recipes.forEach((recipe) => {
      if (!recipe.ingredients) return;
      recipe.ingredients.forEach((ingredient) => {
        uniqueIngredients.add(ingredient.name);
      });
    });
    setUniqueIngredients(Array.from(uniqueIngredients));
  }, [recipes]);

  const filterRecipes = (ingredientName: string) => {
    if (ingredientName === "") {
      return recipes;
    } else {
      const filtered = recipes.filter((recipe) => {
        if (!recipe.ingredients) return false;
        return recipe.ingredients.some(
          (ingredient) => ingredient.name === ingredientName,
        );
      });
      return filtered;
    }
  };

  const handleSubmitRecipe = (recipe: recipeType) => {
    if (recipeNumber === -1) {
      addRecipe(recipe).then((res) => {
        if (res.ok) {
          setRecipes([...recipes, recipe]);
          setFilteredRecipes([...filteredRecipes, recipe]);
          console.log("Recipe added successfully");
        } else {
          console.error("Failed to add recipe");
        }
        setShowAddRecipePopup(false);
        setRecipeToEdit(null);
        setRecipeNumber(-1);
      });
    } else {
      const tempRecipes = [...recipes];
      tempRecipes[recipeNumber] = recipe;
      setRecipes(tempRecipes);
      setFilteredRecipes(tempRecipes);
      setShowAddRecipePopup(false);
      setRecipeToEdit(null);
      setRecipeNumber(-1);
    }
  };

  const handleRemoveRecipe = (id: number) => {
    removeRecipe(id).then((res) => {
      if (!res.ok) {
        console.error("Failed to remove recipe");
        return;
      }
      const tempRecipes = [...recipes];
      tempRecipes.splice(id, 1);
      setRecipes(tempRecipes);
      setFilteredRecipes(tempRecipes);
    });
  };

  const handleSortChange = (field: keyof recipeType) => {
    setFilteredRecipes(sortArrayOnField([...filteredRecipes], field));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Recipes</h1>
      {recipes.length > 0 && (
        <div className="flex justify-end items-center gap-4 mb-2">
          <h3 className="text-gray-700">Sort by:</h3>
          <select
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              handleSortChange(e.target.value as keyof recipeType);
            }}
          >
            <option value="title">Title</option>
            <option value="id">Date Added</option>
            <option value="ingredients">Number of Ingredients</option>
          </select>
          <h3 className="text-gray-700">Filter:</h3>
          <select
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              setFilteredRecipes(filterRecipes(e.target.value));
            }}
          >
            <option value="">All Ingredients</option>
            {uniqueIngredients.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 h-100% overflow-y-scroll">
          {filteredRecipes.length === 0 ? (
            <p className="text-gray-600">No recipes found. Add some!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 m-2">
              {filteredRecipes.map((recipe, id) => (
                <RecipeCard
                  key={id}
                  recipe={recipe}
                  onView={() => {
                    setViewRecipe(recipe);
                  }}
                  onEdit={() => {
                    setRecipeNumber(id);
                    setRecipeToEdit(recipe);
                    setShowAddRecipePopup(true);
                  }}
                  onRemove={() => {
                    handleRemoveRecipe(recipe.id);
                  }}
                />
              ))}
            </div>
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
            recipe={recipeToEdit || { id: 0, title: "", ingredients: [] }}
            onSubmit={(recipe) => {
              handleSubmitRecipe(recipe);
            }}
            onClose={() => {
              setRecipeToEdit(null);
              setShowAddRecipePopup(false);
            }}
          />
        </div>
      )}
      {viewRecipe && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-black opacity-50 absolute inset-0"></div>
          <ViewRecipe
            recipe={viewRecipe}
            onClose={() => {
              setViewRecipe(null);
            }}
          />
        </div>
      )}
    </div>
  );
}
