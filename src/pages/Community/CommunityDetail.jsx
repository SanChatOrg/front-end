/* src/pages/Community/CommunityDetail.jsx */

import CommunityDetailItem from "../../components/Community/jsx/CommunityDetailItem";
import Header from "../../components/Community/jsx/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import defaultProfileImg from "../../assets/dog-paw-active.png";
import "./CommunityDetail.css"

function CommunityDetail() {

  const [post, setPost] = useState({ // 조회한 디테일 데이터
    profileImg: "",
    userName: "",
    postTime: "",
    text: "",
    postImg: [],
    replyCnt: "0",
    communityNo: "",
    userNo: "",
  });
  const [replyContent, setReplyContent] = useState(''); // 작성 댓글 내용
  const [getReplyData, setGetReplyData] = useState([]); // 조회한 댓글 리스트

  const calculateTime = (createdAt) => {
    const postedTime = new Date(createdAt);
    const currentTime = new Date();
    const diff = Math.floor((currentTime - postedTime) / 1000 / 60);

    if (diff < 60) return `${diff}분`;
    if (diff < 1440) return `${Math.floor(diff / 60)}시간`;
    return `${Math.floor(diff / 1440)}일`;
  };

  // 서버연결 확인
  useEffect(() => {
    fetch('http://localhost:8181/community/get')
      .then(response => response.text())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error('서버연결 오류', error));
  }, []);


  // 글 조회
  useEffect(() => {
    fetch(`http://localhost:8181/community/getDetail/1`) // 추후 선택된 글 ${communityNo} 변경예정
      .then(response => {
        if (!response.ok) {
          throw new Error("글 조회 실패");
        }
        return response.json();
      })
      .then(data => {
        setPost({
          ...data,
          filePath: data?.photoList && data.photoList.length > 0
            ? data.photoList.map(photo => photo.photoUrl)
            : []
        });
        console.log(data);



        const imageUrls = data.photoList ? data.photoList.map(photo => photo.photoUrl) : [];

        setPost({
          profileImg: data.profilePhoto || defaultProfileImg,
          userName: data.userName,
          postTime: calculateTime(data.createdAt),
          text: data.communityContent,
          postImg: imageUrls,
          replyCnt: data.communityReplyCount || 0,
          communityNo: data.communityNo,
          userNo: data.userNo,
        });
        return data.communityNo;
      })
      .then((communityNo) => {
        return fetch(`http://localhost:8181/community/getReply/${communityNo}`);
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("댓글 조회 실패");
        }
        return response.json();
      })
      .then(replyData => {
        setGetReplyData(replyData.map(reply => ({
          communityNo: reply.communityNo,
          createdAt: calculateTime(reply.createdAt),
          replyContent: reply.replyContent,
          replyNo: reply.replyNo,
          replyParentNo: reply.replyParentNo,
          updatedAt: calculateTime(reply.updatedAt),
          userNo: reply.userNo,
        })));

        setReplyContent('');

        console.log("댓글: ", replyData);
      })
      .catch(error => console.error('에러 발생: ', error));
  }, []);

  // console.log("게시글에서 받아온 데이터: " + JSON.stringify(post));    

  // 댓글 본문 내용
  const handleContent = (e) => {
    setReplyContent(e.target.value);
    console.log(replyContent);
  }

  // 댓글 업로드 버튼
  const handlePostBtn = () => {
    if (!replyContent.trim()) {
      alert("댓글이 입력되지 않았어요.");
      return;
    }

    const formData = new FormData();
    formData.append("replyContent", replyContent);
    formData.append("userNo", post.userNo);
    formData.append("communityNo", post.communityNo);

    axios.post(`http://localhost:8181/community/newReply/1`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(response => {
        console.log('업로드 성공: ', response.data);
      })
      .catch(error => {
        console.error('등록 실패: ', error);
      });
  };

  console.log(getReplyData.replyContent);

  // 댓글 삭제
  const handleOnClickDelete = async (communityNo, replyNo) => {
    try {
      await axios.put(`http://localhost:8181/community/deleteReply/${communityNo}/${replyNo}`); // 
    } catch (error) {
      console.error("댓글 삭제 실패: ", error);  
    }
    console.log("댓글 삭제 완료: " + replyNo);
  };


  return (
    <div>
      <Header pageName="글 보기" />
      <div className="detail-container">
        <CommunityDetailItem
          profileImg={post.profileImg}
          userName={post.userName}
          postTime={post.postTime}
          text={post.text}
          postImg={post.postImg}
          replyCnt={post.replyCnt}

          // 댓글
          handleContent={handleContent}
          handlePostBtn={handlePostBtn}
          handleOnClickDelete={() => handleOnClickDelete(getReplyData.communityNo, getReplyData.replyNo)}

          replyData={getReplyData}
        />
      </div>
    </div>
  );
}
export default CommunityDetail;