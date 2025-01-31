// 한 게시글 전체
import "../css/CommunityPostItem.css"

import CommunityImgScroll from "./CommunityImgScroll";
import CommunityOptionBtn from "./CommunityOptionBtn";
import CommunityPostImg from "./CommunityPostImg";
import CommunityPostText from "./CommunityPostText";
import CommunityPostTime from "./CommunityPostTime";
import CommunityProfile from "./CommunityProfile";
import CommunityResponseItem from "./CommunityResponseItem";

function CommunityPostItem({ communityNo, profileImg, userName, text, postImg, postTime, likeCount, replyCount, onLike }) {

  return (
    <div>

      <div className="post-header">
        <div className="profile-time">
          <CommunityProfile profileImg={profileImg} userName={userName} />
          <CommunityPostTime postTime={postTime} />
        </div>
        <CommunityOptionBtn communityNo={communityNo} />
      </div>

      <CommunityPostImg postImg={postImg} />

      <CommunityResponseItem likeCount={likeCount} replyCount={replyCount} onLike={onLike} communityNo={communityNo} />

      <CommunityPostText userName={userName} text={text} />

    </div>
  );
}
export default CommunityPostItem;