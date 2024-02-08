import ChatRoomModalOpenButton from "@/common/components/Buttons/ChatRoomAddingModalOpenButton";
import { getAllChatRoomListByUID } from "@/firebase-actions/chatroom/actions";
import { database } from "@/firebaseModule";
import { chatRoomIdState, chatRoomInfoState, userAuthState } from "@/recoil/recoil-store/store";
import { onChildAdded, onChildChanged, onChildRemoved, ref } from "@firebase/database";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styles from "@styles/Chat/SidePanel/ChatRooms.module.scss";
import { ChatRoom } from "@/types";

export default function ChatRooms() {
  const user = useRecoilValue(userAuthState);
  const [chatRoomId, setChatRoomId] = useRecoilState(chatRoomIdState);
  const setChatRoomInfo = useSetRecoilState(chatRoomInfoState);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  const getAndSetChatRooms = useCallback(async () => {
    if (!user) return;
    const rooms = await getAllChatRoomListByUID(user.uid);
    setChatRooms(rooms);
  }, [user]);

  const enterRoom = (room: ChatRoom) => {
    setChatRoomId(room.roomId);
    setChatRoomInfo({
      roomId: room.roomId,
      roomName: room.roomName,
    });
  };

  useEffect(() => {
    if (!user) return;
    const chatRoomsRef = ref(database, `user_chatroom/${user.uid}`);
    onChildAdded(chatRoomsRef, getAndSetChatRooms);
    onChildRemoved(chatRoomsRef, getAndSetChatRooms);
    onChildChanged(chatRoomsRef, getAndSetChatRooms);
  }, [getAndSetChatRooms, user]);

  return (
    <>
      <div className={styles["title-container"]}>
        <h6>Chat Rooms</h6>
        <ChatRoomModalOpenButton />
      </div>
      <div className={styles["room-container"]}>
        {(chatRooms || []).map((room: ChatRoom, _) => {
          return (
            <div
              key={room.roomId}
              style={{
                textDecoration: chatRoomId === room.roomId ? "underline" : "none",
              }}
              onClick={() => enterRoom(room)}
            >
              <span className={styles["room-name"]}>{room.roomName}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
