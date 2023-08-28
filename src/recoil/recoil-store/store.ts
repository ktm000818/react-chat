import { User } from "firebase/auth";
import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

interface ChatRoomInfo {
  roomId: string;
  roomName: string;
}

export const userAuthState = atom<User | null>({
  key: "userAuthState",
  default: null,
  effects: [persistAtom],
  dangerouslyAllowMutability: true,
});

export const chatRoomIdState = atom<string>({
  key: "chatRoomIdState",
  default: "",
  effects: [persistAtom],
});

export const chatRoomInfoState = atom<ChatRoomInfo>({
  key: "chatRoomInfoState",
  default: { roomId: "", roomName: "" },
  effects: [persistAtom],
});

export const isLoggedInSelector = selector<boolean>({
  key: "isLoggedInSelector",
  get: ({ get }) => {
    const user = get(userAuthState);
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
    const user = get(userAuthState);
    if (user) {
      return user.providerData[0].displayName;
    } else {
      return null;
    }
  },
});

export const userImageSelector = selector<string | null>({
  key: "userImage",
  get: ({ get }) => {
    const user = get(userAuthState);
    if (user) {
      return user.providerData[0].photoURL;
    } else {
      return null;
    }
  },
});
