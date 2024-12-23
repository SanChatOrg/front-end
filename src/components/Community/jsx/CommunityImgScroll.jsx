// 게시물 이미지 여러개일때 스크롤 컴포넌트
import "../css/CommunityImgScroll.css"

function CommunityImgScroll() {
  return (
    <div>
      <div className="pagination-indicator">
        <div className="dot active"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>

    </div>
  );
}
export default CommunityImgScroll;