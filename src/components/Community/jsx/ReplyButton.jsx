import "../css/ReplyButton.css";

function ReplyButton({ className, image, handlePostBtn }) {

  return (
    <button className={`chat-btn ${className}`} onClick={handlePostBtn}>
      <img src={image} />
    </button>
  );
}

export default ReplyButton;