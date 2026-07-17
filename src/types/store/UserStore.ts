import type { recipeType } from "../recipeType";

export interface UsersStore {
  currentUser: User;
  usersList: User[];
}

export interface User {
  uuid: string;
  username: string;
  recipes: recipeType[];
  votes: number[];
}
