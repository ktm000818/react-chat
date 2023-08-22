import { AddChatRoom, addChatRoom } from "@/firebase-actions/chatroom/actions";
import { sessionState } from "@/recoil/recoil-store/store";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useRecoilValue } from "recoil";

interface ChatRoomAddingModal {
  show: boolean;
  close: () => void;
}

export default function ChatRoomAddingModal({ show, close }: ChatRoomAddingModal) {
  const user = useRecoilValue(sessionState);
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");

  const handleClickAdd = async () => {
    if (!user || !user?.uid || !user?.displayName || !user?.photoURL) {
      return false;
    }
    const data: AddChatRoom = {
      roomName: roomName,
      description: description,
      user: {
        uid: user.uid,
        name: user.displayName,
        image: user.photoURL,
      },
    };
    await addChatRoom(data);

    alert("채팅방 생성 완료!");
    close();
  };

  return (
    <>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Create Chat Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Room Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Room Name" onChange={({ target }) => setRoomName(target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={6} type="text" placeholder="description" onChange={({ target }) => setDescription(target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClickAdd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
