// 댓글의 답글달기
import { useState } from "react";
import "../css/CommunityChildReply.css";

function CommunityChildReply({ onClickChildReply }) {

  return (
    <div>

      <button type="submit" className="childReply-btn" onClick={onClickChildReply}>
        답글 달기
      </button>

    </div>
  );
}
export default CommunityChildReply;