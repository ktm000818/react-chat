import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const loginState = atom({
  key: "loginState",
  default: null,
  effects: [persistAtom],
});
