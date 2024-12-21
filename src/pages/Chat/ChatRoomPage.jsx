import { useLocation, useParams } from "react-router-dom";
import "./ChatRoomPage.css"
import ChatRoomHeader from "../../components/Chat/ChatRoomHeader";
import ChatRoomFooter from "../../components/Chat/ChatRoomFooter";

function ChatRoomPage() {

  const { chatRoomNo: chatRoomNoParam } = useParams();
  const location = useLocation();
  
  const {image, name} = location.state
  
  return(
    <>
      <ChatRoomHeader name={name} image={image}/>
      
      <ChatRoomFooter/>
    </>
  )
}

export default ChatRoomPage;