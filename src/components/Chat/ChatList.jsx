import ChatItem from "./ChatItem"
import "./ChatList.css"

function ChatList({className}) {

  const chatroomList = [
    {image: "https://res.cloudinary.com/sanchat/image/upload/v1738334124/ypjpftodmicseoojoumy.jpg", name: "순찌부찌", message: "루비도 신날 거 같아요! 내일 봬요! 🐶💛", date: "오늘", chatRoomNo: 1},
    {image: "https://res.cloudinary.com/sanchat/image/upload/v1738334124/qyotqq8iute3nfyor3vk.jpg", name: "산책중독", message: "웰시코기 귀여웡", date: "어제", chatRoomNo: 2},
    {image: "https://res.cloudinary.com/sanchat/image/upload/v1738334124/wdefm4bntlqfqhyxu34x.jpg", name: "간식좀", message: "견종이 어떻게 되시오 낭자~", date: "24.12.16", chatRoomNo: 3},
    {image: "https://res.cloudinary.com/sanchat/image/upload/v1738334124/dmtlgpzzjkocehflrxsd.jpg", name: "호날두", message: "강아지 너무너무 귀여워요!!!! 진짜 또 보고싶어요ㅠㅠㅠㅠ 진짜진짜 귀여워요ㅠㅠㅠㅠㅠㅠㅠ", date: "24.12.15", chatRoomNo: 4},
  ];

  return(

    <div className={`chat-list ${className}`}>
      {chatroomList ? (
      chatroomList.map((user, index) => (
        <ChatItem 
          key={index} 
          image={user.image} 
          name={user.name} 
          message={user.message} 
          date={user.date} 
          chatRoomNo={user.chatRoomNo}
        />
      )) 
      ) : (
        <p>채팅방이 없습니다.</p>
      ) 
      }
    </div>
  )
}

export default ChatList;