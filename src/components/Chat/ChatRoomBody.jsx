import './ChatRoomBody.css'

function ChatRoomBody({messages, userNo}) {
    return (
        <div className="chat-body">
            {messages.map((item, index) => (
                <div
                    key={index}
                    className={`list-item ${item.userNo === userNo ? 'my-message' : 'other-message'}`}
                >
                    {item.messageContent}
                </div>
            ))}
        </div>
    );
}

export default ChatRoomBody;