import type { User } from "../store/UserStore";

export interface UpdateMessage {
  type: "update";
  message: {
    activeUsers: User[];
  };
}

export interface StartVotingMessage {
  type: "startVoting";
  message: {
    hostId: string;
  };
}

export type WebSocketMessage = UpdateMessage | StartVotingMessage;
