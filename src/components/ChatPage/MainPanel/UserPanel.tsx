import NicknameModifyModal from "@/common/components/Modals/NicknameModifyModal";
import { useLogout } from "@/custom-hooks/useLogout";
import { updateProfileImageToStorageAndDatabase } from "@/firebase-actions/upload/profile-image/actions";
import { userAuthState, userImageSelector, userNameSelector } from "@/recoil/recoil-store/store";
import styles from "@styles/Chat/MainPanel/UserPanel.module.scss";
import { ChangeEvent, ForwardedRef, MouseEventHandler, RefObject, forwardRef, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useRecoilState, useRecoilValue } from "recoil";
import Users from "./Users";

export default function UserPanel() {
  const fileUploaderRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <ProfilePictureFileUploader ref={fileUploaderRef} />
      <div className={styles["container"]}>
        <UserListButton />
        <UserImageWithDropdown fileUploaderRef={fileUploaderRef} />
        <NicknameWithDropdown />
      </div>
    </>
  );
}

const UserListButton = () => {
  const [hide, setHide] = useState(true);
  return (
    <>
      <div className={styles["user-list-container"]}>
        <div className={styles["user-list-button"]} onClick={() => setHide((prev) => !prev)}>
          <img src="icon/person.png" alt="memberList" width={30}/>
        </div>
        {!hide && (
          <div className={styles["user-list"]}>
            <Users />
          </div>
        )}
      </div>
    </>
  );
};

const ProfilePictureFileUploader = forwardRef((_, ref: ForwardedRef<HTMLInputElement>) => {
  const [userAuth, setUserAuthState] = useRecoilState(userAuthState);
  const handleChangeFile = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    try {
      if (target.files && target.files.length > 0) {
        const file: any = target.files[0];
        const imageUrl = await updateProfileImageToStorageAndDatabase(file);
        if (imageUrl && userAuth) {
          setUserAuthState({ ...userAuth, photoURL: imageUrl });
        }
      }
    } catch (error) {}
  };

  return <input className={styles["file-input"]} type="file" ref={ref} onChange={handleChangeFile} />;
});

function UserImageWithDropdown({ fileUploaderRef }: { fileUploaderRef: RefObject<HTMLInputElement> }) {
  const UserImage = forwardRef<HTMLDivElement, { onClick: MouseEventHandler<HTMLDivElement> }>(({ onClick }, ref) => {
    const userImageURL = useRecoilValue(userImageSelector);
    return (
      <div className={styles["user-image-wrapper"]} ref={ref} onClick={onClick}>
        <div className={styles["user-image"]}>
          <img src={userImageURL ?? undefined} alt="logo" width={40} height={40} />
        </div>
      </div>
    );
  });

  return (
    <>
      <Dropdown className={styles["dropdown"]} drop="down-centered">
        <Dropdown.Toggle as={UserImage} id="s"></Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => fileUploaderRef.current?.click()}>프로필 사진 변경</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

function NicknameWithDropdown() {
  const logout = useLogout();
  const Nickname = forwardRef(({ onClick }: { onClick: MouseEventHandler<HTMLSpanElement> }, ref: any) => {
    const nickname = useRecoilValue(userNameSelector);
    return (
      <span className={styles["nickname"]} ref={ref} onClick={onClick}>
        {nickname}
      </span>
    );
  });
  const [showNicknameModifyModal, setShowNicknameModifyModal] = useState(false);

  return (
    <>
      <NicknameModifyModal show={showNicknameModifyModal} close={() => setShowNicknameModifyModal(false)} />

      <Dropdown className={styles["dropdown"]} align={"end"}>
        <Dropdown.Toggle as={Nickname} id="test"></Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setShowNicknameModifyModal(true)}>닉네임 변경</Dropdown.Item>
          <Dropdown.Item onClick={logout}>로그아웃</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
