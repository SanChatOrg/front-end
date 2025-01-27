// 게시물 작성 시간
import "../css/CommunityPostTime.css";

function CommunityReplyTime({ replyTime }) {
  return (
    <div>

      <div className="time-display">{replyTime}</div>

    </div>
  );
}
export default CommunityReplyTime;