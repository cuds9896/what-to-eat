import type { ingredientType } from "./ingredientType";

export interface recipeType {
  name: string;
  ingredients: ingredientType[];
  instructions?: string;
  link?: string;
}
