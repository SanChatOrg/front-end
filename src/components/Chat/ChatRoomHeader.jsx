import ChatProfileImg from "./ChatProfileImg";
import "./ChatRoomHeader.css"

function ChatRoomHeader({name, image}) {

  
  return(
    <div className="chatroom-header">
      <ChatProfileImg image={image}/>
    </div>
  )
}

export default ChatRoomHeader;