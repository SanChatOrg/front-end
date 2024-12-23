// 댓글버튼과 댓글 수 컴포넌트
import { useNavigate } from "react-router-dom";
import "../css/CommunityReplyBtn.css"
import { PATHS } from "../../../routes/paths";

function CommunityReplyBtn() {

  const navigate = useNavigate();

  const handleOnClickDetail = () => {
    setTimeout(() => {
      navigate(PATHS.COMMUNITY.DETAIL);
    }, 200);
  }

  return (
    <div>
      <div className="reply-container">
        <button onClick={handleOnClickDetail}></button>
        <span className="reply-count">1,100</span>
      </div>
    </div>
  );
}
export default CommunityReplyBtn;