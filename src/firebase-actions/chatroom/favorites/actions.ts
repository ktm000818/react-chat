import { database } from "@/firebaseModule";
import { child, get, push, ref, remove, set, update } from "firebase/database";

const FAVORITES = "favorites";
const USER_FAVORITES = "user_favorites";
const USER_CHATROOM = "user_chatroom";

type FavoriteAddProps = (uid: string, room: { roomId: string }) => Promise<void>;
type FavoriteRemoveProps = (uid: string, roomId: string) => Promise<void>;
type ChangingIsFavoriteFuncProps = (uid: string, roomId: string, flag: boolean) => Promise<void>;

const changeIsFavoritePropertieOfChatRoom: ChangingIsFavoriteFuncProps = async (uid, roomId, flag) => {
  const dbRef = ref(database);

  const updates: any = {};
  updates[`${USER_CHATROOM}/${uid}/${roomId}/isFavorite`] = flag;
  await update(dbRef, updates);
};

export const addFavorite: FavoriteAddProps = async (uid, room) => {
  const favoritesRef = ref(database, `${FAVORITES}`);
  const userFavoritesRef = ref(database, `${USER_FAVORITES}/${uid}/${room.roomId}`);
  const newFavoriteRef = push(favoritesRef);

  const data = { ...room, uid };

  await set(newFavoriteRef, data);
  await set(userFavoritesRef, data);
  await changeIsFavoritePropertieOfChatRoom(uid, room.roomId, true);
};

export const removeFavorite: FavoriteRemoveProps = async (uid, roomId) => {
  const getFavoriteDocKeyByRoomId: (roomId: string) => Promise<string[] | null> = async (roomId) => {
    try {
      const dbRef = ref(database);

      const favorites = await get(child(dbRef, `${FAVORITES}`));
      const userFavoriteRooms = await get(child(dbRef, `${USER_FAVORITES}/${uid}`));

      const favoritesVal: Favorites = await favorites.val();
      const userFavoritesVal: Favorites = await userFavoriteRooms.val();

      let result: string[] = [];

      if (favorites.exists() && userFavoriteRooms.exists()) {
        for (let favoriteDocKey in favoritesVal) {
          if (favoritesVal[favoriteDocKey].roomId === roomId) {
            result.push(favoriteDocKey);
            break;
          }
        }

        for (let userFavoriteRoomKey in userFavoritesVal) {
          if (userFavoriteRoomKey === roomId) {
            result.push(userFavoriteRoomKey);
            break;
          }
        }
        return result;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const docKeys = await getFavoriteDocKeyByRoomId(roomId);

  if (!docKeys) {
    return;
  }

  const favoriteDocRef = ref(database, `${FAVORITES}/${docKeys[0]}`);
  const userFavoriteDocRef = ref(database, `${USER_FAVORITES}/${uid}/${docKeys[1]}`);

  await remove(favoriteDocRef);
  await remove(userFavoriteDocRef);
  await changeIsFavoritePropertieOfChatRoom(uid, roomId, false);
};

export interface Favorite {
  uid: string;
  roomId: string;
}

interface Favorites {
  [key: string]: Favorite;
}

export const getFavoritesByUID: (uid: string) => Promise<Favorite[]> = async (uid) => {
  try {
    const dbRef = ref(database);
    const result = await get(child(dbRef, `${USER_FAVORITES}/${uid}`));
    const resultVal: Favorites = await result.val();

    if (result.exists()) {
      return Object.values(resultVal);
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const getIsFavoriteByRoomId: (uid: string, roomId: string) => Promise<boolean> = async (uid, roomId) => {
  try {
    const dbRef = ref(database);
    const result = await get(child(dbRef, `${USER_FAVORITES}/${uid}`));

    const resultVal = await result.val();

    if (result.exists()) {
      for (let docKeyRoomId in resultVal) {
        if (docKeyRoomId === roomId) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
