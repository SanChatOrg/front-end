// 한 게시글 전체
import "../css/CommunityPostItem.css"

import CommunityImgScroll from "./CommunityImgScroll";
import CommunityOptionBtn from "./CommunityOptionBtn";
import CommunityPostImg from "./CommunityPostImg";
import CommunityPostText from "./CommunityPostText";
import CommunityPostTime from "./CommunityPostTime";
import CommunityProfile from "./CommunityProfile";
import CommunityResponseItem from "./CommunityResponseItem";

function CommunityPostItem({
  communityNo,
  profileImg,
  userName,
  text,
  postImg,
  postTime,
  likeCount,
  replyCount,
  handlePostDelete,
  handleLikeClick,
  isLikedMap,
  userNo,
}) {

  return (
    <div>

      <div className="post-header">
        <div className="profile-time">
          <div className="main-profile">
            <CommunityProfile profileImg={profileImg} userName={userName} />
          </div>
          <CommunityPostTime postTime={postTime} />
        </div>
        <CommunityOptionBtn communityNo={communityNo} handlePostDelete={handlePostDelete} />
      </div>

      <CommunityPostImg postImg={postImg} />

      <CommunityResponseItem userNo={userNo} likeCount={likeCount} replyCount={replyCount} communityNo={communityNo} handleLikeClick={handleLikeClick} isLikedMap={isLikedMap} />

      <CommunityPostText userName={userName} text={text} />

    </div>
  );
}
export default CommunityPostItem;