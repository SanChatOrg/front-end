// 뒤로가기 | 페이지명 상단 바
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../routes/paths.js";
import "./Header.css"
import settingIcon from "/public/icons/settings.svg";

function Header({ alertSetting }) {

  const navigate = useNavigate();

  const handleOnClickWriteBtn = () => {
    setTimeout(() => {
      navigate(PATHS.COMMUNITY.WRITE);
    }, 200);
  };


 
  return (
    <div>
      <div className="top">

          <button className="write-btn" onClick={() => alertSetting()}>
            <img src={settingIcon} alt="새글 작성" className="write-btn-img"/>
          </button>

      </div>
    </div>
  );
}
export default Header;