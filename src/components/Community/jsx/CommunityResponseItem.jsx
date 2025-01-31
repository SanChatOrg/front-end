// 댓글 하나를 구성하는 아이템
import "../css/CommunityReplyItem.css";

import CommunityLikeBtn from "./CommunityLikeBtn";
import CommunityReplyBtn from "./CommunityReplyBtn";

function CommunityResponseItem({ likeCount, replyCount, onLike, communityNo }) {
  return (
    <div className="btn-container">
      <CommunityLikeBtn likeCount={likeCount} onLike={onLike} />

      <CommunityReplyBtn replyCount={replyCount} communityNo={communityNo} />
    </div>
  );
}
export default CommunityResponseItem;