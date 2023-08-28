import { AddChatRoom, addChatRoom } from "@/firebase-actions/chatroom/actions";
import { database } from "@/firebaseModule";
import { userAuthState } from "@/recoil/recoil-store/store";
import { ref, update } from "firebase/database";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useRecoilValue } from "recoil";

interface NicknameModifyModal {
  show: boolean;
  close: () => void;
}

export default function NicknameModifyModal({ show, close }: NicknameModifyModal) {
  const session = useRecoilValue(userAuthState);
  const [nickname, setNickname] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value);

  //TODO 닉네임 업데이트 개발 필요
  const updateNicknameByUID = async () => {
    const uid = session?.uid;

    if (!uid) return;

    const dbRef = ref(database);
    const updates: any = {};
    updates[`users/${uid}/name`] = nickname;
    updates[`user_chatroom/${uid}/name`] = nickname;
    await update(dbRef, updates);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(nickname);
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
          <Button type="submit" variant="primary" onClick={() => {}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
