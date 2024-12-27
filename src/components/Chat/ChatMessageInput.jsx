import './ChatMessageInput.css';

function ChatMessageInput({className, type, placeholder}) {
  return(
    <>
      <input className={`chat-send-input ${className}` } type={type} placeholder={placeholder}/>
    </>
  );
}

export default ChatMessageInput;