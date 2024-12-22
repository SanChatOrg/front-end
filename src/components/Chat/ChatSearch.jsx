import './ChatSearch.css';
import ChatSearchButton from './ChatSearchButton';
import ChatSearchInput from './ChatSearchInput';

function ChatSearch() {
  return (
    <div className='chat-search-container'>
      <ChatSearchInput/>
      <ChatSearchButton/>
    </div>
  );
}

export default ChatSearch;
