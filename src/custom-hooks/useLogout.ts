import { auth, database } from "@/firebaseModule";
import { userAuthState } from "@/recoil/recoil-store/store";
import { DataSnapshot, get, query, ref, update } from "@firebase/database";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useUpdateRecoilRootKey } from "./useUpdateRecoilRootKeyContext";
import { Updates } from "@/types";

const CHATROOM = "chatroom";

export function useLogout() {
  const navigate = useNavigate();
  const user = useRecoilValue(userAuthState);
  const resetRecoilStates = useUpdateRecoilRootKey();

  //TODO 로직 분리 필요함
  const updateLoginStateToFalse: () => void = async () => {
    if (!user) {
      return;
    }
    const dbRef = ref(database);
    const updates: Updates = {};
    const rooms: DataSnapshot = await get(query(ref(database, `${CHATROOM}`)));

    const updateUserLoginState = (rooms: DataSnapshot) => {
      return new Promise((resolve, reject) => {
        (Object.keys(rooms.val()) || []).forEach(async (roomId) => {
          const joinedRooms: DataSnapshot = await get(query(ref(database, `${CHATROOM}/${roomId}/members/${user.uid}`)));
          if (joinedRooms.exists()) {
            updates[`${CHATROOM}/${roomId}/members/${user.uid}/isLogin`] = false;
            resolve(null);
          } else {
            reject(new Error('logout error!'));
          }
        });
      });
    }

    if (rooms.exists()) {
      await updateUserLoginState(rooms);
    }
    updates[`users/${user.uid}/isLogin`] = false;
    await update(dbRef, updates);
  };

  const logout: () => void = () => {
    if (!user) return;
    signOut(auth)
      .then(() => {
        window.localStorage.clear();
        resetRecoilStates();
        updateLoginStateToFalse();
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return logout;
}
