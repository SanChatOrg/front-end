// 한 게시글 전체
import "../css/CommunityPostItem.css"

import CommunityImgScroll from "./CommunityImgScroll";
import CommunityOptionBtn from "./CommunityOptionBtn";
import CommunityPostImg from "./CommunityPostImg";
import CommunityPostText from "./CommunityPostText";
import CommunityPostTime from "./CommunityPostTime";
import CommunityProfile from "./CommunityProfile";
import CommunityResponseItem from "./CommunityResponseItem";

function CommunityPostItem({ profileImg, userName, text, postImg, postTime }) {

  return (
    <div>

      <div className="post-header">
        <CommunityProfile profileImg={profileImg} userName={userName} />
        <CommunityOptionBtn />
      </div>

      <CommunityPostImg postImg={postImg} />

      <CommunityImgScroll />

      <CommunityResponseItem />

      <CommunityPostText userName={userName} text={text} />

      <CommunityPostTime postTime={postTime} />
    </div>
  );
}
export default CommunityPostItem;