import {useLocation, useParams} from "react-router-dom";
import "./ChatRoomPage.css"
import ChatRoomHeader from "../../components/Chat/ChatRoomHeader";
import ChatRoomFooter from "../../components/Chat/ChatRoomFooter";
import ChatRoomBody from "../../components/Chat/ChatRoomBody.jsx";
import {useEffect, useRef, useState} from "react";
import {Stomp} from "@stomp/stompjs";
import axios from "axios";

function ChatRoomPage() {

    const {chatRoomNo: chatRoomNoParam} = useParams();
    const location = useLocation();
    const userNo = 1;

    const {image, name} = location.state;

    //웹소켓 연결 객체
    const stompClient = useRef(null);
    // 메시지 리스트
    const [messages, setMessages] = new useState([]);

    const connect = () => {
        //웹소켓 연결
        const socket = new WebSocket("ws://localhost:8181/ws/chat");
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, () => {
            //메시지 수신(1은 roomId를 임시로 표현)
            stompClient.current.subscribe(`/sub/room/` + chatRoomNoParam, (message) => {
                //누군가 발송했던 메시지를 리스트에 추가
                const newMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        });
    };

    const fetchMessages = () => {
        return axios.get("http://localhost:8181/chat/" + chatRoomNoParam)
            .then(response => {
                setMessages(response.data)
            });

    };

    const disconnect = () => {
        if (stompClient.current) {
            stompClient.current.disconnect();
        }
    };

    useEffect(() => {
        connect();
        fetchMessages();
        // 컴포넌트 언마운트 시 웹소켓 연결 해제
        return () => disconnect();
    }, []);

    useEffect(() => {
        console.log(messages);
    }, [messages]);
    return (
        <>
            <ChatRoomHeader name={name} image={image}/>
            <ChatRoomBody messages={messages} userNo={userNo}/>
            <ChatRoomFooter stompClient={stompClient} chatRoomNoParam={chatRoomNoParam}/>
        </>
    )
}

export default ChatRoomPage;