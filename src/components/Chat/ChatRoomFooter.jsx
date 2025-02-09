import ChatMessageInput from "./ChatMessageInput";
import "./ChatRoomFooter.css"
import ChatButton from "./ChatButton";
import {useState} from "react";

function ChatRoomFooter({stompClient, chatRoomNoParam}) {
    // 사용자 입력을 저장할 변수
    const [inputValue, setInputValue] = useState('');

    const userNo = 1;

    // 입력 필드에 변화가 있을 때마다 inputValue를 업데이트
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    //메세지 전송
    const sendMessage = () => {
        if (stompClient.current && inputValue) {
            //현재로서는 임의의 테스트 값을 삽입
            const body = {
                chatRoomNo: chatRoomNoParam,
                userNo: userNo,
                messageContent : inputValue,
                messageType: "CHAT"
            };
            stompClient.current.send(`/pub/send/` + chatRoomNoParam, {}, JSON.stringify(body));
            setInputValue('');
        }
    };
  return(
    <div className="chat-room-footer-container">

      <ChatButton
        className="chat-room-footer-camera-btn"
        image="/icons/photo_camera.svg"
      />

      <ChatMessageInput
        className="chat-room-footer-input"
        type="text"
        placeholder="메세지 입력"
        value={inputValue}
        onChange={handleInputChange}
      />

      <ChatButton
        className="chat-room-footer-send-btn"
        image="/icons/send.svg"
        handleOnClick={sendMessage}
      />

    </div>
  )
}

export default ChatRoomFooter;