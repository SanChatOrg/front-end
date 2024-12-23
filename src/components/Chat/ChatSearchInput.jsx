import "./ChatSearchInput.css";

function ChatSearchInput({className, type, placeholder}) {
  return (
    <>
      <input className={`chat-search-input ${className}` } type={type} placeholder={placeholder}/>
    </>
  );
}

export default ChatSearchInput;
