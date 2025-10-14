import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { UserInfo } from "../types/user";

const defaultValue: UserInfo = {
  id: 0,
  name: "",
  username: "",
  email: "",
  phoneNumber: "",
  subscriptions: { snack: 0, lunch: 0, breakfast: 0 },
};

interface UserInfoState {
  data: UserInfo;
  isLoggedIn?: boolean;
  token?: string;
  setLoggedIn: (token: string) => void;
  fetchUserInfo: () => Promise<void>;
  setData: (data: UserInfo) => void;
  reset: () => void;
}

export const userInfoStore = create<UserInfoState>()(
  devtools(
    (set, get, store) => ({
      data: defaultValue,
      token: "",
      isLoggedIn: false,
      fetchUserInfo: async () => {
        if (get().isLoggedIn) {
          return;
        }
      },
      setLoggedIn: (token: string) => {
        set((state) => ({
          data: {
            ...state.data,
          },
          isLoggedIn: true,
          token: token,
        }));
      },
      setData: (data: UserInfo) => {
        set((state) => ({
          ...state,
          data: {
            ...data,
          },
        }));
      },
      reset: () => {
        set(store.getInitialState());
      },
    }),
    {
      name: "UserInfoStore",
    }
  )
);
