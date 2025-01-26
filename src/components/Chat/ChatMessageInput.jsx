import './ChatMessageInput.css';

function ChatMessageInput({className, type, placeholder, value, onChange}) {
  return(
    <>
      <input className={`chat-send-input ${className}` } type={type} placeholder={placeholder} value={value} onChange={onChange}/>
    </>
  );
}

export default ChatMessageInput;