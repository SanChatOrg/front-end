// 뒤로가기 | 페이지명 상단 바
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../routes/paths";
import "../css/Header.css"

function Header({ pageName, onWriteClick, showWriteBtn }) {

  const navigate = useNavigate();

  const handleOnClickWriteBtn = () => {
    setTimeout(() => {
      navigate(PATHS.COMMUNITY.WRITE);
    }, 200);
  };

  return (
    <div>
      <div className="top">
        {/* 뒤로가기 아이콘 넣기*/}
        <h3 className="page_name">{pageName}</h3>
        {/* 글쓰기 아이콘 넣기 */}
        {showWriteBtn && (
          <button className="write-btn" onClick={onWriteClick || handleOnClickWriteBtn}> </button>
            
        )}
      </div>
    </div>
  );
}
export default Header;