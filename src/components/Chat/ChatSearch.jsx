import './ChatSearch.css';
import ChatButton from './ChatButton';
import ChatSearchInput from './ChatSearchInput';

function ChatSearch() {
  return (

    <div className='chat-search-container'>

      <ChatSearchInput type="text" placeholder="검색"/>

      <ChatButton image='/icons/search.svg'/>

    </div>
    
  );
}

export default ChatSearch;
