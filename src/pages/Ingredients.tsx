import { useEffect, useMemo, useRef, useState } from "react";
import { getIngredients } from "../api/getIngredients";
import type { ingredientType } from "../types/ingredientType";
import { sortArrayOnField } from "../utils/sortArrayOnField";
import type { categoryType } from "../types/categoryType";

export const Ingredients: React.FC = () => {
  const ingredientsList = useRef<ingredientType[]>([]);
  const [newCategoryPopup, setNewCategoryPopup] = useState<boolean>(false);
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [tableRows, setTableRows] = useState<(ingredientType | string)[]>([]);

  useEffect(() => {
    getIngredients()
      .then((ingredients) => {
        console.log("Fetched ingredients:", ingredients);
        ingredientsList.current = sortArrayOnField(ingredients, "category");
        setIngredientCategories();
        //build list of table rows with categories as headers and ingredients as rows under their respective categories
        let tempList: (ingredientType | string)[] = [];
        let emptyCategories: string[] = [];
        tempList.push(
          ...ingredientsList.current.filter(
            (ingredient) => !ingredient.category || ingredient.category === "",
          ),
        );
        categories.forEach((category) => {
          if (category.ingredients.length > 0) {
            tempList.push(category.name);
            tempList.push(...category.ingredients);
          } else {
            emptyCategories.push(category.name);
          }
        });
        tempList.push(...emptyCategories);
        setTableRows(tempList);
      })
      .catch((error) => {
        console.error("Error fetching ingredients:", error);
      });
  }, []);

  const setIngredientCategories = () => {
    let categoriesList = [] as categoryType[];
    ((categoriesList = ingredientsList.current.reduce((acc, ingredient) => {
      let category: categoryType;
      if (acc.find((cat) => cat.name === ingredient.category)) {
        category = acc.find((cat) => cat.name === ingredient.category)!;
        category.ingredients.push(ingredient);
      } else {
        category = {
          name: ingredient.category,
          ingredients: [ingredient],
        };
        acc.push(category);
      }
      return acc;
    }, [] as categoryType[])),
      //create list of unique categories from ingredients list
      setCategories(categoriesList));
  };

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const categoryName = formData.get("categoryName") as string;
    setCategories((prev) => [...prev, { name: categoryName, ingredients: [] }]);
    setTableRows((prev) => [...prev, categoryName]);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-gray-100 p-8">
        <h2 className="text-3xl font-bold mb-4">Manage Your Ingredients</h2>
        <p className="text-gray-700 mb-6">
          Create categories for your ingredients and manage macros here
        </p>
        <div className="bg-white rounded-lg shadow-md p-6">
          <table className="mb-4">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 border-b">Name</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, index) => {
                if (typeof row === "string") {
                  return (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b font-bold bg-gray-200">
                        {row}
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{row.name}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>

          <button
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
            onClick={() => {
              setNewCategoryPopup(true);
            }}
          >
            Add Category
          </button>
        </div>
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
