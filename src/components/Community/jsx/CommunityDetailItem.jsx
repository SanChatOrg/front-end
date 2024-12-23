// 글 보기 전체 컴포넌트
import "../css/CommunityDetailItem.css"
import CommunityDetailReplyCnt from "./CommunityDetailReplyCnt";

import CommunityImgScroll from "./CommunityImgScroll";
import CommunityOptionBtn from "./CommunityOptionBtn";
import CommunityPostImg from "./CommunityPostImg";
import CommunityPostText from "./CommunityPostText";
import CommunityPostTime from "./CommunityPostTime";
import CommunityProfile from "./CommunityProfile";

function CommunityDetailItem({ profileImg, userName, text, postImg, postTime, replyCnt }) {
  return (
    <div>
      <div className="detail-header">
        <CommunityProfile profileImg={profileImg} userName={userName} />
        <CommunityPostTime postTime={postTime} />
        <CommunityOptionBtn />
      </div>


      <CommunityPostImg postImg={postImg} />

      <CommunityImgScroll />

      <div className="detail-text">
        <CommunityPostText userName={userName} text={text} />
      </div>

      <CommunityDetailReplyCnt replyCnt={replyCnt} />

      <div>
        <div className="detail-header">
          <CommunityProfile profileImg={profileImg} userName={userName} />
          <CommunityPostTime postTime={postTime} />
          <CommunityOptionBtn />
        </div>
      </div>

    </div>
  );
}
export default CommunityDetailItem;
