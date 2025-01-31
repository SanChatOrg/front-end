import "../css/CommunityDetailFooter.css"
import ReplyMessageInput from "./ReplyMessageInput";
import ReplyButton from "./ReplyButton";

function CommunityDetailFooter({ userName, handleContent, handlePostBtn, replyContent }) {
  return (
    <div className="chat-room-footer-container">

      <ReplyMessageInput
        className="chat-room-footer-input"
        type="text"
        placeholder={`${userName}에게 댓글 추가...`}
        value={replyContent}
        handleContent={handleContent}
      />

      <ReplyButton
        className="chat-room-footer-send-btn"
        image="/icons/ic_chat_send_btn.svg"
        handlePostBtn={handlePostBtn}
      />

    </div>
  )
}

export default CommunityDetailFooter;