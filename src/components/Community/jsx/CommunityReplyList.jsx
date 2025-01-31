// 댓글 묶음(목록)
import CommunityProfile from "./CommunityProfile";
import CommunityReplyContent from "./CommunityReplyContent";
import CommunityReplyTime from "./CommunityReplyTime";
import "../css/CommunityReplyList.css";
import CommunityReplyOption from "./CommunityReplyOption";
import CommunityChildReply from "./CommunityChildReply";

function CommunityReplyList({ profileImg, userName, replyData, handleOnClickDelete, onMentionUser }) {
  return (
    <div>
      {replyData.map((reply) => (
        <div key={reply.replyNo} className="detail-reply">
          <div className="detail-reply-left">

            <div className="profile-time-wrapper">
              <CommunityProfile profileImg={profileImg} userName={userName} replyTime={reply.createdAt} />
            </div>

            <div className="reply-content-wrapper">
              <CommunityReplyContent replyContent={reply.replyContent} />
              <CommunityChildReply onClickChildReply={() => onMentionUser(reply.userName)} />
            </div>
          </div>

          <CommunityReplyOption handleOnClickDelete={() => handleOnClickDelete(reply.communityNo, reply.replyNo)} />
        </div>
      ))}

    </div>
  );
}
export default CommunityReplyList;