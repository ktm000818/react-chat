import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

interface ChatRoomInfo {
  roomId: string;
  roomName: string;
}

interface Session {
  uid?: string;
  email?: string;
  emailVerified?: boolean;
  displayName?: string;
  isAnonymous?: boolean;
  photoURL?: string;
  providerData?: [
    {
      providerId?: string;
      uid?: string;
      displayName?: string;
      email?: string;
      phoneNumber?: null;
      photoURL?: string;
    }
  ];
  stsTokenManager?: {
    refreshToken?: string;
    accessToken?: string;
    expirationTime?: number;
  };
  createdAt?: string;
  lastLoginAt?: string;
  apiKey?: string;
  appName?: string;
}

export const sessionState = atom<Session | null>({
  key: "sessionState",
  default: null,
  effects: [persistAtom],
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

export const chatRoomListState = atom<any[]>({
  key: "chatRoomListState",
  default: [],
});

export const favoritesListState = atom<any[]>({
  key: "favoritesListState",
  default: [],
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

export const userNameSelector = selector<string | undefined>({
  key: "userName",
  get: ({ get }) => {
    const user = get(sessionState);
    if (user) {
      return user.displayName;
    } else {
      return undefined;
    }
  },
});

export const userImageSelector = selector<string | undefined>({
  key: "userImage",
  get: ({ get }) => {
    const user = get(sessionState);
    if (user) {
      return user.photoURL;
    } else {
      return undefined;
    }
  },
});
