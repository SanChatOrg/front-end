import './ChatSearch.css';
import ChatSearchButton from './ChatSearchButton';
import ChatSearchInput from './ChatSearchInput';

function ChatSearch() {
  return (
    <div className='chat-search-container'>
      <ChatSearchInput type="text" placeholder="검색"/>
      <ChatSearchButton image='/icons/ic_chat_search.svg'/>
    </div>
  );
}

export default ChatSearch;
