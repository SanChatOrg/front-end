// 댓글의 텍스트 내용 컴포넌트
import "../css/CommunityReplyContent.css"

function CommunityReplyContent({ replyContent }) {

console.log('댓글 내용', replyContent);


  return (
    <div className="detail-reply-content">
      <span>{replyContent}</span>
    </div>
  );
}
export default CommunityReplyContent;