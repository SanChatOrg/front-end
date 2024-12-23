import ChatProfileImg from "./ChatProfileImg";
import ChatSearchButton from "./ChatSearchButton";
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
      <ChatSearchButton className="chat-room-back-btn" image="/icons/ic_chat_back_btn.svg" handleOnClick={handleOnClickBackBtn}/>
      <ChatProfileImg className="chat-room-header-profile" image={image}/>
      <div className="chat-room-header-name">{name}</div>
      <ChatSearchButton className="chat-room-search-btn" image="/icons/ic_chat_search.svg"/>
    </div>
  )
}

export default ChatRoomHeader;