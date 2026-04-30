export interface ingredientType {
  name: string;
  quantity: string;
  unit: unitType;
  category: string;
  carbs: number;
  protein: number;
  fat: number;
}

export type unitType = "g" | "kg" | "ml" | "l" | "tsp" | "tbsp" | "cup" | "pcs";
