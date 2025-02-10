import ChatProfileImg from "./ChatProfileImg";
import ChatButton from "./ChatButton";
import "./ChatRoomHeader.css"
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";

function ChatRoomHeader({name, image}) {

  const navigate = useNavigate();

  const handleOnClickBackBtn = () => {
    setTimeout(() => {
        navigate(PATHS.CHAT.LIST);
    }, 200);
  };

  return(

    
    <div className="chat-room-header">

      <ChatButton 
        className="chat-room-back-btn" 
        image="/icons/navigate_before.svg" 
        handleOnClick={handleOnClickBackBtn}
      />

      <ChatProfileImg 
        className="chat-room-header-profile" 
        image={image}
      />

      <div className="chat-room-header-name">{name}</div>

      <ChatButton 
        className="chat-room-search-btn" 
        image="/icons/search.svg"
      />

    </div>

  )
}

export default ChatRoomHeader;