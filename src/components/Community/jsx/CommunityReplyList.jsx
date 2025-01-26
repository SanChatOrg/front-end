// 댓글 묶음(목록)
import CommunityProfile from "./CommunityProfile";
import CommunityReplyContent from "./CommunityReplyContent";
import CommunityReplyTime from "./CommunityReplyTime";
import "../css/CommunityReplyList.css";
import CommunityReplyOption from "./CommunityReplyOption";

function CommunityReplyList({ profileImg, userName, replyData, handleOnClickDelete }) {
  return (
    <div>
      {replyData.map((reply) => (
        <div key={reply.replyNo} className="detail-reply">
          <div className="detail-reply-left">
            <CommunityProfile profileImg={profileImg} userName={userName} />
            <div className="reply-time">
              <CommunityReplyTime reply={reply.createdAt} />
            </div>
          </div>
          <CommunityReplyContent replyContent={reply.replyContent} />
          <CommunityReplyOption handleOnClickDelete={() => handleOnClickDelete(reply.communityNo, reply.replyNo)} />
        </div>
      ))}

    </div>
  );
}
export default CommunityReplyList;