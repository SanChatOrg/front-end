import "./ChatButton.css";

function ChatButton({className, image, handleOnClick}) {
  return (
    <button className={`chat-btn ${className}`} onClick={handleOnClick}>
      <img src={image}/>
    </button>
  );
}

export default ChatButton;