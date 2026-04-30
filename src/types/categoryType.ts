import type { ingredientType } from "./ingredientType";

export interface categoryType {
  name: string;
  ingredients: ingredientType[];
}

export type unitType = "g" | "kg" | "ml" | "l" | "tsp" | "tbsp" | "cup" | "pcs";
