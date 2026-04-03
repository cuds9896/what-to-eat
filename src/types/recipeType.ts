import type { ingredientType } from "./ingredientType";

export interface recipeType {
  title: string;
  ingredients: ingredientType[];
  instructions?: string;
  link?: string;
}
