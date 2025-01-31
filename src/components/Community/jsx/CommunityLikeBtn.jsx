// 좋아요 버튼과 좋아요 수 컴포넌트
import { useState } from "react";
import "../css/CommunityLikeBtn.css"
import likeBtn from "../../../assets/likeBtn.svg"

function CommunityLikeBtn({ likeCount: initialLikeCount, onLike }) {

  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
  const [likeCount, setLikeCount] = useState(initialLikeCount); // 초기 좋아요 수

  // 좋아요 버튼 클릭
  const handleLikeClick = () => {
    const newIsLiked = !isLiked;
    const countChange = newIsLiked ? 1 : -1;

    setIsLiked(newIsLiked);

    fetch(`http://localhost:8181/community/like/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (!response.ok) throw new Error('Request failed');
        return response.json();
      })
      .then(data => {
        onLike(countChange);
      })
      .catch(error => {
        setIsLiked(!newIsLiked);
      });

    onLike(countChange);
  };


  return (
    <div>

      <div className="like-container">
        <button
          className={`like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLikeClick}
          aria-label="좋아요"
        >
          <img src={likeBtn} alt="좋아요 버튼" className="like-btn-img"/>
        </button>
        <span className="like-count">{likeCount}</span>
      </div>

    </div>
  );
}
export default CommunityLikeBtn;