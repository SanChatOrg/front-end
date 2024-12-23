// 수정 삭제 등 포함하는 옵션 버튼 컴포넌트
import { useState } from "react";
import "../css/CommunityOptionBtn.css"
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../routes/paths";

function CommunityOptionBtn() {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleOnClickEdit = () => {
    setTimeout(() => {
      navigate(PATHS.COMMUNITY.EDIT);
    }, 200);
  }

  return (
    <div className="option-menu">
      <button className="dot-button" onClick={toggleMenu}>
        <span>⋮</span>
      </button>

      {menuOpen && (
        <div className="drop-menu">
          <div className="menu-item">
            공유
          </div>

          <div className="menu-item" onClick={handleOnClickEdit}>
            수정
          </div>

          <div className="menu-item delete">
            삭제
          </div>
        </div>
      )}

    </div>
  );
}
export default CommunityOptionBtn;