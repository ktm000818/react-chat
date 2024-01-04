import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "@/styles/Button/InviteUserModalButton.module.scss";
import { inviteUserToChatRoom } from "@/firebase-actions/chatroom/actions";
import { UserList, getUserList } from "@/firebase-actions/user/actions";

interface InviteUserModalButton {
  chatRoomId: string;
  children: React.ReactNode;
}

export default function Component({ chatRoomId, children }: InviteUserModalButton) {
  const [show, setShow] = useState(false);
  const [userList, setUserList] = useState<UserList>({});

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setUserList(await getUserList());
    setShow(true);
  }

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        {children}
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>친구를 초대해보세요!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup className={styles["list-group"]}>
            {Object.values(userList).map((user, _) => (
              <ListGroup.Item>
                <div className={styles["list-group-item"]}>
                  <div className={styles["list-group-item-image"]}>
                    <img src={user.image} alt=" " width={50} height={50} />
                  </div>
                  <div className={styles["list-group-item-info-wrapper"]}>
                    <div className={styles["list-group-item-name"]}>
                      {user.name}
                    </div>
                    <div className={styles["list-group-item-desc"]}>

                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => inviteUserToChatRoom(chatRoomId)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
