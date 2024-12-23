// 게시물 작성 시간
import "../css/CommunityPostTime.css";

function CommunityPostTime({postTime}) {
  return (
    <div>

      <div className="time-display">{postTime}</div>

    </div>
  );
}
export default CommunityPostTime;