import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const sessionState = atom({
  key: "sessionState",
  default: null,
  effects: [persistAtom],
});

export const chatRoomIdState = atom({
  key: "chatRoomIdState",
  default: null,
  effects: [persistAtom],
});

export const isLoggedInSelector = selector({
  key: "isLoggedInSelector",
  get: ({ get }) => {
    const user = get(sessionState);
    if (user) {
      return true;
    } else {
      return false;
    }
  },
});

export const userNameSelector = selector({
  key: "userName",
  get: ({ get }) => {
    const user = get(sessionState);
    if (user) {
      return user.displayName;
    }
  },
});

export const userImageSelector = selector({
  key: "userImage",
  get: ({ get }) => {
    const user = get(sessionState);
    if (user) {
      return user.photoURL;
    }
  },
});
