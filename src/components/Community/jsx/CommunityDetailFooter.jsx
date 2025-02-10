import "../css/CommunityDetailFooter.css"
import ReplyMessageInput from "./ReplyMessageInput";
import ReplyButton from "./ReplyButton";

function CommunityDetailFooter({ userName, handleContent, handlePostBtn, replyContent }) {
  return (
    <div className="reply-room-footer-container">

      <ReplyMessageInput
        className="reply-room-footer-input"
        type="text"
        placeholder={`${userName}에게 댓글 추가...`}
        value={replyContent}
        handleContent={handleContent}
      />

      <ReplyButton
        className="reply-room-footer-send-btn"
        image="/icons/send.svg"
        handlePostBtn={handlePostBtn}
      />

    </div>
  )
}

export default CommunityDetailFooter;