// 글 보기 전체 컴포넌트
import "../css/CommunityDetailItem.css"
import CommunityDetailFooter from "./CommunityDetailFooter";
import CommunityDetailReplyCnt from "./CommunityDetailReplyCnt";
import CommunityOptionBtn from "./CommunityOptionBtn";
import CommunityPostImg from "./CommunityPostImg";
import CommunityPostText from "./CommunityPostText";
import CommunityPostTime from "./CommunityPostTime";
import CommunityProfile from "./CommunityProfile";
import CommunityReplyList from "./CommunityReplyList";

function CommunityDetailItem({ profileImg, userName, text, postImg, postTime, replyCnt, handleContent, handlePostBtn, replyData, handleOnClickDelete }) {
  return (
    <div>
      <div className="detail-header">
        <div className="detail-header-content">
          <CommunityProfile profileImg={profileImg} userName={userName} />
        </div>
        <CommunityOptionBtn />
      </div>


      <CommunityPostImg postImg={postImg} />

      <div className="detail-text">
        <CommunityPostText userName={userName} text={text} />
        <CommunityPostTime postTime={postTime} />
      </div>

      <CommunityDetailReplyCnt replyCnt={replyCnt} />


      <CommunityReplyList profileImg={profileImg} userName={userName} replyData={replyData} handleOnClickDelete={handleOnClickDelete} />

      <div className="detail-input">
        <CommunityDetailFooter userName={userName} handleContent={handleContent} handlePostBtn={handlePostBtn} />
      </div>


    </div>
  );
}
export default CommunityDetailItem;
