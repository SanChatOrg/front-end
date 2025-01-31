import '../css/ReplyMessageInput.css';

function ReplyMessageInput({ className, type, placeholder, value, handleContent }) {

  return (
    <>
      <input
        className={`chat-send-input ${className}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleContent}
      />
    </>
  );
}

export default ReplyMessageInput;