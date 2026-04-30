import type { ingredientType } from "./ingredientType";

export interface recipeType {
  id: number;
  title: string;
  ingredients: ingredientType[];
  instructions?: string;
  link?: string;
}
