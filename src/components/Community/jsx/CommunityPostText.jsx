// 게시글 본문 내용
import "../css/CommunityPostText.css";

function CommunityPostText({ userName, text }) {
  return (
    <div className="post-content">
      <span className="userName">{userName}</span>
      <p className="post-text">
        {text}
      </p>
    </div>
  );
}
export default CommunityPostText;