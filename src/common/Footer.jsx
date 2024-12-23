import { useNavigate } from "react-router-dom";
import "./Footer.css";
import { PATHS } from "../routes/paths";

const Footer = () => {

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setTimeout(() => {
        navigate(path);
    }, 200); // 0.2초 지연
  };

  return (
    <div className="footer">
      <div className="footer-item" onClick={() => handleNavigation(PATHS.MAP)}>
        <div className="icon map-icon" />
        <span>지도</span>
      </div>
      <div className="footer-item">
        <div className="icon community-icon" onClick={() => handleNavigation(PATHS.COMMUNITY.MAIN)}/>
        <span>커뮤니티</span>
      </div>
      <div className="footer-item active">
        <div className="icon paw-icon" />
        <span>메인</span>
      </div>
      <div className="footer-item" onClick={() => handleNavigation(PATHS.CHAT.LIST)}>
        <div className="icon chat-icon" />
        <span>채팅</span>
      </div>
      <div className="footer-item" onClick={() => handleNavigation(PATHS.USER.PROFILE)}>
        <div className="icon profile-icon" />
        <span>마이페이지</span>
      </div>
    </div>
  );
};

export default Footer;