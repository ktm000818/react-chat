import { useLogout } from "@/custom-hooks/useLogout";
import { addProfileImageToStorage } from "@/firebase-actions/upload/profile-image/actions";
import { sessionState, userImageSelector, userNameSelector } from "@/recoil/recoil-store/store";
import styles from "@styles/Chat/MainPanel/UserPanel.module.scss";
import { ChangeEvent, ForwardedRef, forwardRef, MouseEventHandler, RefObject, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function UserPanel() {
  const fileUploaderRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <ProfilePictureFileUploader ref={fileUploaderRef} />
      <div className={styles["container"]}>
        <UserImageWithDropdown fileUploaderRef={fileUploaderRef} />
        <NicknameWithDropdown fileUploaderRef={fileUploaderRef} />
      </div>
    </>
  );
}

const ProfilePictureFileUploader = forwardRef((_, ref: ForwardedRef<HTMLInputElement>) => {
  const sessionValue = useRecoilValue(sessionState);
  const setSessionValue = useSetRecoilState(sessionState);
  const handleChangeFile = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    try {
      if (target.files && target.files.length > 0) {
        const file: any = target.files[0];
        const user = await addProfileImageToStorage(file);
        if (user && user.image) {
          setSessionValue({ ...sessionValue, photoURL: user.image });
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
          <img src={userImageURL} alt="logo" width={40} height={40} />
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
    const loginUser = useRecoilValue(userNameSelector);
    return (
      <span className={styles["nickname"]} ref={ref} onClick={onClick}>
        {loginUser}
      </span>
    );
  });
  return (
    <>
      <Dropdown className={styles["dropdown"]} align={"end"}>
        <Dropdown.Toggle as={Nickname} id="test"></Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>닉네임 변경</Dropdown.Item>
          <Dropdown.Item onClick={logout}>로그아웃</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
