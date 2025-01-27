import '../css/ReplyMessageInput.css';

function ReplyMessageInput({ className, type, placeholder, handleContent }) {

  return (
    <>
      <input
        className={`chat-send-input ${className}`}
        type={type}
        placeholder={placeholder}
        onChange={handleContent}
      />
    </>
  );
}

export default ReplyMessageInput;