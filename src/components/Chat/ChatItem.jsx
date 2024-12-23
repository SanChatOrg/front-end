import { useNavigate } from "react-router-dom";
import "./ChatItem.css"
import { PATHS } from "../../routes/paths";
import ChatProfileImg from "./ChatProfileImg";

function ChatItem({image, name, message, date, chatRoomNo}) {

  const navigate = useNavigate();
  const user = {image: image, name: name}

  const handleViewChatRoom = (chatRoomNo) => {
    setTimeout(() => {
        navigate(`${PATHS.CHAT.ROOM}/${chatRoomNo}`, {state: user});
    }, 200);
  };

  return(
    <div className="chatroom-item" onClick={() => handleViewChatRoom(chatRoomNo)}>
      <ChatProfileImg className="chat-list-profile" image={image}/>

      <div className="chatroom-content">
        <div className="chatroom-name">
          {name}
        </div>
        <div className="chatroom-message">
          {message}
        </div>
      </div>

      <div className="chatroom-date">
        {date}
      </div>

    </div>
  );
}

export default ChatItem;