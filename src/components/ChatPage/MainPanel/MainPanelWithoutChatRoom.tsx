import useLoginCheck from "@/custom-hooks/useLoginCheck";

export default function MainPanelWithoutChatRoom() {
  useLoginCheck();
  return (
    <>
      <div>방을 생성해주세요!!</div>
    </>
  );
}
