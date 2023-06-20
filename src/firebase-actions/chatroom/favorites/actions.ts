import { database } from "@/firebaseModule";
import { child, get, push, ref, remove, set } from "firebase/database";

const TABLE = "favorites";

type FavoriteAddProps = (uid: string, roomId: string) => Promise<void>;
type FavoriteRemoveProps = (roomId: string) => Promise<void>;

export const addFavorite: FavoriteAddProps = async (uid, roomId) => {
  const favoritesRef = ref(database, `${TABLE}`);
  const newFavoriteRef = push(favoritesRef);
  await set(newFavoriteRef, {
    uid,
    roomId
  });
};

export const removeFavorite: FavoriteRemoveProps = async (roomId) => {
  const docKey = await getFavoriteDocKeyByRoomId(roomId);

  if(!docKey){
    return;
  }

  const favoriteRef = ref(database, `${TABLE}/${docKey}`);
  await remove(favoriteRef);
}

export interface Favorite {
  uid: string;
  roomId: string;
}

interface Favorites {
  [key: string]: Favorite;
}

export const getFavoriteDocKeyByRoomId: (roomId: string) => Promise<string | null> = async (roomId) => {
  try {
    const dbRef = ref(database);
    const favorites = await get(child(dbRef, `${TABLE}`));
    const favoritesVal:Favorites = await favorites.val();
    let result = '';

    if (favorites.exists()) {
      for(const favorite in favoritesVal){
        if(favoritesVal[favorite].roomId === roomId){
          result = favorite;
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


export const getFavoritesByUID: (uid: string) => Promise<Favorite[] | null> = async (uid) => {
  try {
    const dbRef = ref(database);
    const result = await get(child(dbRef, `${TABLE}`));
    const resultVal:Favorites  = await result.val();

    if (result.exists()) {
      return Object.values(resultVal).filter((favoriteRoom) => favoriteRoom.uid === uid);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
