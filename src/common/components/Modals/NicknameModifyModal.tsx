import { auth, database } from "@/firebaseModule";
import { userAuthState } from "@/recoil/recoil-store/store";
import { updateProfile } from "firebase/auth";
import { child, get, ref, update } from "firebase/database";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

interface Props {
  show: boolean;
  close: () => void;
}

export default function NicknameModifyModal({ show, close }: Props) {
  const session = useRecoilValue(userAuthState);
  const [userAuth, setUserAuth] = useRecoilState(userAuthState);
  const [nickname, setNickname] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value);

  //TODO 닉네임 업데이트 개발 필요
  const updateNicknameByUID = async () => {
    const uid = session?.uid;

    if (!auth.currentUser) return;
    if (!uid) return;
    if (!userAuth) return;

    const dbRef = ref(database);
    const userChatRooms = await get(child(dbRef, `user_chatroom/${uid}`));

    const updates: any = {};
    for (let roomKey in userChatRooms.val()) {
      updates[`user_chatroom/${uid}/${roomKey}/members/${uid}/name`] = nickname;
      updates[`chatroom/${roomKey}/members/${uid}/name`] = nickname;
    }
    updates[`users/${uid}/name`] = nickname;

    await updateProfile(auth.currentUser, {
      displayName: nickname,
    });
    await update(dbRef, updates);
    setUserAuth({ ...userAuth, displayName: nickname });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateNicknameByUID();
    close();
  };

  return (
    <>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Nickname</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Control type="text" placeholder="Enter Room Name" onChange={handleChange} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="secondary" onClick={close}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
