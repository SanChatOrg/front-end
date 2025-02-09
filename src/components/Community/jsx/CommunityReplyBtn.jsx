// 댓글버튼과 댓글 수 컴포넌트
import { useNavigate, useParams } from "react-router-dom";
import "../css/CommunityReplyBtn.css"
import { PATHS } from "../../../routes/paths";
import replyBtn from "../../../assets/replyBtn.png"


function CommunityReplyBtn({ replyCount, communityNo }) {

  const navigate = useNavigate();

  const handleOnClickDetail = () => {
    setTimeout(() => {
      navigate(`${PATHS.COMMUNITY.DETAIL}/${communityNo}`);
    }, 200);
  }

  return (
    <div>
      <div className="reply-container">
        <button onClick={handleOnClickDetail} className="reply-btn">
          <img src={replyBtn} alt="댓글 버튼" className="reply-btn-img"/>
        </button>
        <span className="reply-count">{replyCount}</span>
      </div>
    </div>
  );
}
export default CommunityReplyBtn;