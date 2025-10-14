import { Subscriptions } from "./subscriptions";

export type UserInfo = {
  id: string | number;
  name: string;
  username: string;
  email: string;
  phoneNumber?: string | number;
  subscriptions: Subscriptions;
};
