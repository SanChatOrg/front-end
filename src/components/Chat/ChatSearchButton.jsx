import "./ChatSearchButton.css";

function ChatSearchButton({className, image, handleOnClick}) {
  return (
    <button className={`chat-search-btn ${className}`} onClick={handleOnClick}>
      <img src={image}/>
    </button>
  );
}

export default ChatSearchButton;