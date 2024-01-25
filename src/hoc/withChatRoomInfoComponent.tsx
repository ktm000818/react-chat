import { chatRoomInfoState } from "@/recoil/recoil-store/store";
import { ComponentType } from "react";
import { useRecoilValue } from "recoil";

export const withChatRoomInfoComponent = (Component: ComponentType, ReplacementComponent: ComponentType) => {
  return function () {
    const chatRoomInfo = useRecoilValue(chatRoomInfoState);

    if (!chatRoomInfo.roomId) return <ReplacementComponent />;

    return <Component />;
  };
};