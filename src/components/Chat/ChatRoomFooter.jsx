import ChatMessageInput from "./ChatMessageInput";
import "./ChatRoomFooter.css"
import ChatButton from "./ChatButton";

function ChatRoomFooter() {
  return(
    <div className="chat-room-footer-container">

      <ChatButton 
        className="chat-room-footer-camera-btn" 
        image="/icons/ic_chat_camera_btn.svg" 
      />

      <ChatMessageInput
        className="chat-room-footer-input"
        type="text"
        placeholder="메세지 입력"
      />

      <ChatButton
        className="chat-room-footer-send-btn"
        image="/icons/ic_chat_send_btn.svg" 
      />
      
    </div>
  )
}

export default ChatRoomFooter;