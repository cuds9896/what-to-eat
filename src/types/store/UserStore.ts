import type { recipeType } from "../recipeType";

export interface UsersStore {
  usersList: User[];
}

export interface User {
  uuid: string;
  username: string;
  recipes: recipeType[];
  votes: number[];
}
