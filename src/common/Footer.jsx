import { useNavigate, useLocation } from "react-router-dom";
import "./Footer.css";
import { PATHS } from "../routes/paths";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기

  const handleNavigation = (path) => {
    setTimeout(() => {
      navigate(path);
    }, 200); // 0.2초 지연
  };

  return (
    <div className="footer">
      <div className="footer-item" onClick={() => handleNavigation(PATHS.COMMUNITY.MAIN)}>
        <img
          className="icon community-icon"
          src={location.pathname === PATHS.COMMUNITY.MAIN ||
            location.pathname.startsWith(PATHS.COMMUNITY.DETAIL) ||
            location.pathname.startsWith(PATHS.COMMUNITY.WRITE) ||
            location.pathname.startsWith(PATHS.COMMUNITY.EDIT)

            ? "/public/icons/View_fill.svg" : "/public/icons/View_line.png"}
        />
        <span>커뮤니티</span>
      </div>
      <div className="footer-item" onClick={() => handleNavigation(PATHS.MAP.MAP)}>
        <img
          className="icon map-icon"
          src={location.pathname === PATHS.MAP.MAP ? "/public/icons/Geo_fill.svg" : "/public/icons/Geo_line.png"}
        />
        <span>지도</span>
      </div>
      <div className="footer-item" onClick={() => handleNavigation(PATHS.CHAT.LIST)}>
        <img
          className="icon chat-icon"
          src={location.pathname === PATHS.CHAT.LIST || location.pathname.startsWith(PATHS.CHAT.ROOM) ? "/public/icons/Chat_fill.svg" : "/public/icons/Chat_line.png"}
        />
        <span>채팅</span>
      </div>
      <div className="footer-item" onClick={() => handleNavigation(`${PATHS.USER.PROFILE}/minjun85`)}>
        <img
          className="icon profile-icon"
          src={location.pathname.startsWith(PATHS.USER.PROFILE) ? "/public/icons/Person_fill.svg" : "/public/icons/Vector_line.png"}
        />
        <span>마이페이지</span>
      </div>
    </div>
  );
};

export default Footer;
