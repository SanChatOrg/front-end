import ChatItem from "./ChatItem"
import "./ChatList.css"

function ChatList({className}) {

  const chatroomList = [
    {image: "/src/assets/img/user/ex_user_profile_01.png", name: "순찌부찌", message: "루비도 신날 거 같아요! 내일 봬요! 🐶💛", date: "오늘", chatRoomNo: 1},
    {image: "/src/assets/img/user/ex_user_profile_02.png", name: "산책중독", message: "웰시코기 귀여웡", date: "어제", chatRoomNo: 2},
    {image: "/src/assets/img/user/ex_user_profile_03.png", name: "간식좀", message: "견종이 어떻게 되시오 낭자~", date: "24.12.16", chatRoomNo: 3},
    {image: "/src/assets/img/user/ex_user_profile_04.png", name: "호날두", message: "강아지 너무너무 귀여워요!!!! 진짜 또 보고싶어요ㅠㅠㅠㅠ 진짜진짜 귀여워요ㅠㅠㅠㅠㅠㅠㅠ", date: "24.12.15", chatRoomNo: 4},
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