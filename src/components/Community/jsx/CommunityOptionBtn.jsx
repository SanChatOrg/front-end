// 수정 삭제 등 포함하는 옵션 버튼 컴포넌트
import { useState, useEffect, useRef } from "react";
import "../css/CommunityOptionBtn.css"
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../routes/paths";

function CommunityOptionBtn({ handlePostDelete, communityNo }) {

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleOnClickEdit = () => {
    setTimeout(() => {
      navigate(`${PATHS.COMMUNITY.EDIT}/${communityNo}`);
    }, 200);
  }

  return (
    <div className="option-menu" ref={menuRef}>
      <button className="dot-button" onClick={toggleMenu}>
        <span>⋮</span>
      </button>

      {menuOpen && (
        <div className="drop-menu">

          <div className="menu-item" onClick={handleOnClickEdit}>
            수정
          </div>

          <div className="menu-item delete" onClick={() => handlePostDelete(communityNo)}>
            삭제
          </div>
        </div>
      )}

    </div>
  );
}
export default CommunityOptionBtn;