import CreateChatRoomModal from "@/common/components/Modals/CreateChatRoomModal";
import { getAllChatRoomListByUID } from "@/firebase-actions/chatroom/actions";
import { database } from "@/firebaseModule";
import { chatRoomIdState, chatRoomInfoState, chatRoomListState, sessionState } from "@/recoil/recoil-store/store";
import { onChildAdded, onChildChanged, onChildRemoved, ref } from "@firebase/database";
import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export default function ChatRooms() {
  const [chatRooms, setChatRooms] = useRecoilState(chatRoomListState);
  const user = useRecoilValue(sessionState);
  const [chatRoomId, setChatRoomId] = useRecoilState(chatRoomIdState);
  const setChatRoomInfo = useSetRecoilState(chatRoomInfoState);

  const getAndSetChatRooms = useCallback(async () => {
    if (!user) {
      return;
    }
    const rooms = await getAllChatRoomListByUID(user.uid);
    setChatRooms(rooms);
  }, [user, setChatRooms]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const chatRoomsRef = ref(database, `user_chatroom/${user.uid}`);
    onChildAdded(chatRoomsRef, () => {
      getAndSetChatRooms();
    });
    onChildRemoved(chatRoomsRef, () => {
      getAndSetChatRooms();
    });
    onChildChanged(chatRoomsRef, () => {
      getAndSetChatRooms();
    });
  }, [getAndSetChatRooms, user]);

  return (
    <div style={{ margin: 10, border: "1px solid black" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h6>Chat rooms</h6>
        <CreateChatRoomModal />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {chatRooms &&
          chatRooms.map((room: any, index: any) => {
            return (
              <div
                key={index + "rooms"}
                style={{
                  textDecoration: chatRoomId === room.roomId ? "underline" : "none",
                }}
                onClick={() => {
                  setChatRoomId(room.roomId);
                  setChatRoomInfo({
                    roomId: room.roomId,
                    roomName: room.roomName,
                  });
                }}
              >
                <h6>{room.roomName}</h6>
              </div>
            );
          })}
      </div>
    </div>
  );
}
