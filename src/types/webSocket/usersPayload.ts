interface UserState {
  username: string;
  recipes: any[];
  votes: any[];
  online: boolean;
}

interface User {
  state: UserState;
}

export interface WebSocketPayload {
  usersList: Record<string, User>;
}
