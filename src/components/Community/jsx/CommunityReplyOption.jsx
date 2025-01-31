// 수정 삭제 등 포함하는 옵션 버튼 컴포넌트
import { useState, useEffect, useRef } from "react";
import "../css/CommunityReplyOption.css"
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../routes/paths";
import axios from "axios";

function CommunityReplyOption({ handleOnClickDelete }) {

  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // 외부 클릭 시 메뉴창 닫힘
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);


  return (
    <div className="option-menu" ref={menuRef}>
      <button className="dot-button" onClick={toggleMenu}>
        <span>⋮</span>
      </button>

      {menuOpen && (
        <div className="drop-menu">
          <div className="menu-item delete" onClick={handleOnClickDelete}>
            삭제
          </div>

          <div className="menu-item" onClick={() => setMenuOpen(false)}>
            취소
          </div>
        </div>
      )}

    </div>
  );
}
export default CommunityReplyOption;