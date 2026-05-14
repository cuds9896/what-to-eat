import React, { useEffect, useRef, useState } from "react";
import { getIngredients } from "../api/getIngredients";
import type { ingredientType } from "../types/ingredientType";
import { sortArrayOnField } from "../utils/sortArrayOnField";
import { IngredientDraggable } from "../components/IngredientDraggable";
import { IngredientCategory } from "../components/IngredientCategory";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";

export const Ingredients: React.FC = () => {
  const ingredientsList = useRef<ingredientType[]>([]);
  const [newCategoryPopup, setNewCategoryPopup] = useState<boolean>(false);
  const [displayCategories, setDisplayCategories] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    getIngredients()
      .then((ingredients) => {
        ingredientsList.current = sortArrayOnField(ingredients, "category");
        setIngredientCategories();
      })
      .catch((error) => {
        console.error("Error fetching ingredients:", error);
      });
  }, []);

  const setIngredientCategories = () => {
    let categories: Record<string, string[]> = { Uncategorized: [] };
    ingredientsList.current.forEach((ingredient) => {
      if (!ingredient.category) {
        categories["Uncategorized"].push(ingredient.name);
        return;
      }
      if (
        displayCategories[ingredient.category as keyof typeof displayCategories]
      ) {
        categories[ingredient.category as keyof typeof categories].push(
          ingredient.name,
        );
      } else {
        categories[ingredient.category as keyof typeof categories] = [
          ingredient.name,
        ];
      }
    });
    setDisplayCategories(categories);
  };

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const categoryName = formData.get("categoryName") as string;
    if (displayCategories[categoryName as keyof typeof displayCategories]) {
      return;
    }
    setDisplayCategories((prev) => ({
      ...prev,
      [categoryName]: [],
    }));
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-gray-100 p-8">
        <h2 className="text-3xl font-bold mb-4">Manage Your Ingredients</h2>
        <p className="text-gray-700 mb-6">
          Create categories for your ingredients and manage macros here
        </p>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-row gap-6">
          <DragDropProvider
            onDragOver={(event) => {
              setDisplayCategories((prev) => move(prev, event));
            }}
          >
            {Object.entries(displayCategories).map(([column, ingredients]) => (
              <IngredientCategory key={column} id={column}>
                <h3 className="text-xl font-semibold mb-4">
                  {column || "Uncategorized"}
                </h3>
                {ingredients.map((ingredient, index) => (
                  <IngredientDraggable
                    key={ingredient}
                    id={ingredient}
                    index={index}
                    category={column}
                  />
                ))}
              </IngredientCategory>
            ))}
          </DragDropProvider>
        </div>
        <button
          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
          onClick={() => {
            setNewCategoryPopup(true);
          }}
        >
          Add Category
        </button>
      </div>
      {newCategoryPopup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-black opacity-50 absolute inset-0"></div>
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md z-10">
            <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddCategory(e);
                setNewCategoryPopup(false);
              }}
            >
              <input
                type="text"
                name="categoryName"
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                placeholder="Category Name"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewCategoryPopup(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
