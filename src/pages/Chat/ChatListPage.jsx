import "./ChatListPage.css"
import ChatList from "../../components/Chat/ChatList";
import ChatSearch from "../../components/Chat/ChatSearch";

function ChatListPage() {
  return (
    <>
      <ChatSearch/>

      <div className="chat-container">
        <ChatList/>
      </div>
    </>
  );
}

export default ChatListPage;
