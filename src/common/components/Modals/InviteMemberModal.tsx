import { inviteUserToChatRoom } from "@/firebase-actions/chatroom/actions";
import { getUserListExceptChatroomMemberAndCurrUser } from "@/firebase-actions/user/actions";
import { User, UserList } from "@/types";
import styles from "@styles/Modal/InviteMemberModal.module.scss";
import { useEffect, useId, useRef, useState } from "react";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";

export default function InviteMemberModal({ open = false, handleCloseModal = () => {}, chatRoomId = "" }) {
  const [userList, setUserList] = useState<UserList>({});
  const [selectedUserList, setSelectedUserList] = useState<Array<User>>([]);
  const memberMapRef = useRef(new Map<string, User>());
  const rid = useId();

  const addAndRemoveUser: (user: User) => void = (user) => {
    if (memberMapRef.current.get(user.uid)) {
      memberMapRef.current.delete(user.uid);
    } else {
      memberMapRef.current.set(user.uid, user);
    }

    setSelectedUserList(Array.from(memberMapRef.current.values()));
  };

  const initiateUserList: () => Promise<void> = async () =>
    setUserList(await getUserListExceptChatroomMemberAndCurrUser(chatRoomId));

  const closeModal: () => void = () => {
    handleCloseModal();
    memberMapRef.current.clear();
    setSelectedUserList([]);
  };

  useEffect(() => {
    if (open) initiateUserList();
  }, [open]);

  return (
    <Modal show={open} onHide={handleCloseModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Invite</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup className={styles["list-group"]}>
          {Object.values(userList).length > 0 ? (
            Object.values(userList).map((user, i) => (
              <ListGroup.Item action key={`${rid}_${user.uid}`}>
                <div className={styles["list-group-item"]} onClick={() => addAndRemoveUser(user)}>
                  <div className={styles["list-group-item-checkbox-wrapper"]}>
                    <Form.Check
                      id="list-group-item-checkbox"
                      inline
                      name="group1"
                      type={"checkbox"}
                      readOnly
                      checked={Boolean(selectedUserList.find((v) => v.uid === user.uid))}
                    />
                  </div>
                  <div className={styles["list-group-item-image"]}>
                    <img src={user.image} alt=" " width={50} height={50} />
                  </div>
                  <div className={styles["list-group-item-info-wrapper"]}>
                    <div className={styles["list-group-item-name"]}>{user.name}</div>
                    <div className={styles["list-group-item-desc"]}></div>
                  </div>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <div>There is no one can invite!</div>
          )}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            inviteUserToChatRoom(selectedUserList, chatRoomId);
            closeModal();
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
