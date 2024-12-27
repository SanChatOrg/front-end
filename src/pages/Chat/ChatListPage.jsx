import "./ChatListPage.css"
import ChatList from "../../components/Chat/ChatList";
import ChatSearch from "../../components/Chat/ChatSearch";

function ChatListPage() {
  return (
    <>
      {/* 채팅방 목록 페이지 */}
      <div className="chat-list-container">

        {/* 채팅방 검색 */}
        <ChatSearch/>

        {/* 채팅방 목록 */}
        <ChatList/>
        
      </div>
    </>
  );
}

export default ChatListPage;
