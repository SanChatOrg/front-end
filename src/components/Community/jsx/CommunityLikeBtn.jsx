// 좋아요 버튼과 좋아요 수 컴포넌트
import { useState } from "react";
import "../css/CommunityLikeBtn.css";
import notLikeBtn from "../../../assets/notLikeBtn.png";
import likeBtn from "../../../assets/likeBtn.png";

function CommunityLikeBtn({ likeCount, handleLikeClick, isLikedMap, communityNo, userNo }) {

  return (
    <div>

      <div className="like-container">
        <button
          className={`like-btn ${isLikedMap[communityNo] ? 'liked' : ''}`}
          onClick={() => handleLikeClick(communityNo, userNo)}
          aria-label="좋아요"
        >
          <img
            src={isLikedMap[communityNo] ? likeBtn : notLikeBtn}
            aria-label="좋아요 버튼"
            className="like-btn-img"
          />
        </button>

        {likeCount > 0 && <span className="like-count">{likeCount}</span>}
      </div>

    </div>
  );
}
export default CommunityLikeBtn;