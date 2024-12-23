// 댓글 하나를 구성하는 아이템
import "../css/CommunityReplyItem.css";

import CommunityLikeBtn from "./CommunityLikeBtn";
import CommunityReplyBtn from "./CommunityReplyBtn";

function CommunityResponseItem() {
  return (
    <div className="btn-container">
      <CommunityLikeBtn/>

      <CommunityReplyBtn/>
    </div>
  );
}
export default CommunityResponseItem;