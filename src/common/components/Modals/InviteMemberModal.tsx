import { User, UserList, getUserListExceptChatroomMemberAndCurrUser } from "@/firebase-actions/user/actions";
import { useEffect, useId, useRef, useState } from "react";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import styles from "@styles/Modal/InviteMemberModal.module.scss";
import { inviteUserToChatRoom } from "@/firebase-actions/chatroom/actions";
import { useRecoilValue } from "recoil";
import { chatRoomIdState } from "@/recoil/recoil-store/store";

export default function InviteMemberModal({ open = false, handleCloseModal = () => {}, chatRoomId = "" }) {
  const [userList, setUserList] = useState<UserList>({});
  const [selectedUserList, setSelectedUserList] = useState<Array<User>>([]);
  const memberMapRef = useRef(new Map());
  const rid = useId();

  const addAndRemoveUser = (user: User) => {
    if (memberMapRef.current.get(user.uid)) {
      memberMapRef.current.delete(user.uid);
    } else {
      memberMapRef.current.set(user.uid, user);
    }

    setSelectedUserList(Array.from(memberMapRef.current.values()));
  };

  const initiateUserList = async () => setUserList(await getUserListExceptChatroomMemberAndCurrUser(chatRoomId));

  const closeModal = () => {
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