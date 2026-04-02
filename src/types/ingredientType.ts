export interface ingredientType {
  name: string;
  quantity: string;
  unit: unitType;
}

export type unitType = "g" | "kg" | "ml" | "l" | "tsp" | "tbsp" | "cup" | "pcs";
