import type { PageStore } from "./PageStore";
import type { UsersStore } from "./UserStore";

export interface StoreInterfaces {
  user: UsersStore;
  page: PageStore;
}
