import "./ChatProfileImg.css"

function ChatProfileImg({className, image}) {
  return (
    <div className={`chatroom-image-box ${className}`}>
      <img className="chatroom-profile-image" src={image}/>
    </div>
  )
}

export default ChatProfileImg;