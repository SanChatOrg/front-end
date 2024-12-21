import "./ChatProfileImg.css"

function ChatProfileImg({image}) {
  return (
    <div className="chatroom-image-box">
      <img className="chatroom-profile-image" src={image}/>
    </div>
  )
}

export default ChatProfileImg;