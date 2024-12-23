// 글 보기 페이지 댓글 | 댓글 수
import "../css/CommunityDetailReplyCnt.css"

function CommunityDetailReplyCnt({ replyCnt }) {
  return (
    <div>
      <span className="reply">
        댓글
        <p className="replyCnt">
          {replyCnt}
        </p>
      </span>
    </div>
  );
}
export default CommunityDetailReplyCnt;