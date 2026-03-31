import type { recipeType } from "../recipeType";

export interface UsersStore {
  usersList: [
    {
      username: string;
      recipes: recipeType[];
      votes: number[];
    },
  ];
}
