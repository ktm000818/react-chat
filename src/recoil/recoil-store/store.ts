import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const sessionState = atom<any>({
  key: "sessionState",
  default: null,
  effects: [persistAtom],
});

export const chatRoomIdState = atom<string>({
  key: "chatRoomIdState",
  default: "",
  effects: [persistAtom],
});

interface ChatRoomInfo {
  roomId: string;
  roomName: string;
}

export const chatRoomInfoState = atom<ChatRoomInfo>({
  key: "chatRoomInfoState",
  default: { roomId: "", roomName: "" },
  effects: [persistAtom],
});

export const isLoggedInSelector = selector<boolean>({
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

export const userNameSelector = selector<string | null>({
  key: "userName",
  get: ({ get }) => {
    const user = get(sessionState);
    if (user) {
      return user.displayName;
    } else {
      return null;
    }
  },
});

export const userImageSelector = selector<string>({
  key: "userImage",
  get: ({ get }) => {
    const user = get(sessionState);
    if (user) {
      return user.photoURL;
    } else {
      return "";
    }
  },
});
