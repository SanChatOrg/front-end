// 수정 삭제 등 포함하는 옵션 버튼 컴포넌트
import { useState } from "react";
import "../css/CommunityReplyOption.css"
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../routes/paths";
import axios from "axios";

function CommunityReplyOption({ handleOnClickDelete }) {


  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };



  return (
    <div className="option-menu">
      <button className="dot-button" onClick={toggleMenu}>
        <span>⋮</span>
      </button>

      {menuOpen && (
        <div className="drop-menu">
          <div className="menu-item delete" onClick={handleOnClickDelete}>
            삭제
          </div>

          <div className="menu-item">
            취소
          </div>
        </div>
      )}

    </div>
  );
}
export default CommunityReplyOption;