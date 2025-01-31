/* src/pages/Community/CommunityDetail.jsx */

import CommunityDetailItem from "../../components/Community/jsx/CommunityDetailItem";
import Header from "../../components/Community/jsx/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import defaultProfileImg from "../../assets/dog-paw-active.png";
import "./CommunityDetail.css"
import { useNavigate, useParams } from "react-router-dom";
import { PATHS } from '../../routes/paths';


function CommunityDetail() {

  const navigate = useNavigate();
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
  const [isDeleting, setIsDeleting] = useState(false); // 삭제상태
  const { communityNo } = useParams();


  const nickName = post.userName;

  // 시간 설정
  const calculateTime = (createdAt) => {
    const postedTime = new Date(createdAt);
    const currentTime = new Date();
    const diff = Math.floor((currentTime - postedTime) / 1000 / 60);

    if (diff < 1) return "지금";
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
    fetch(`http://localhost:8181/community/getDetail/${communityNo}`) // 추후 선택된 글 ${communityNo} 변경예정
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
  const handlePostBtn = async () => {
    if (!replyContent.trim()) {
      alert("댓글이 입력되지 않았어요.");
      return;
    }

    const formData = new FormData();
    formData.append("replyContent", replyContent);
    formData.append("userNo", post.userNo);
    formData.append("communityNo", post.communityNo);

    try {
      const response = await fetch(`http://localhost:8181/community/newReply/${communityNo}`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error("댓글 등록 실패");
      }

      const data = await response.json();

      setGetReplyData(prevReplyData => [...prevReplyData, {
        communityNo: data.communityNo,
        createdAt: calculateTime(data.createdAt),
        replyContent: data.replyContent,
        replyNo: data.replyNo,
        replyParentNo: data.replyParentNo || null,
        updatedAt: calculateTime(data.updatedAt),
        userNo: data.userNo,
      }]);

      setReplyContent('');

    } catch (error) {
      console.error('댓글 등록 실패: ', error);
      alert('댓글 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  console.log(getReplyData.replyContent);

  // 댓글 삭제
  const handleOnClickDelete = async (communityNo, replyNo) => {
    try {
      await axios.put(`http://localhost:8181/community/deleteReply/${communityNo}/${replyNo}`);
      setGetReplyData((prevReplyData) =>
        prevReplyData.filter((reply) => reply.replyNo !== replyNo)
      );
    } catch (error) {
      console.error("댓글 삭제 실패: ", error);
    }
    console.log("댓글 삭제 완료: " + replyNo);
  };

  // 답글 달기
  const handleMentionUser = (nickName) => {
    setReplyContent(`@${nickName} `);
  };

  // 본문 삭제
  const handlePostDelete = async (communityNo) => {
    if (!window.confirm('게시글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      setIsDeleting(true);

      await axios.put(`http://localhost:8181/community/deletePost/${communityNo}`);
      alert('게시글이 삭제되었습니다.');
      navigate(PATHS.COMMUNITY.MAIN);
    } catch (error) {
      console.error("게시글 삭제 실패: ", error);
      alert('게시글 삭제에 실패했습니다. 다시 시도해주세요.');

    } finally {
      setIsDeleting(false);
      setMenuOpen(false);
    }
    console.log("게시글 삭제 완료: " + communityNo);
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
          replyCnt={getReplyData.length}
          communityNo={post.communityNo}

          // 댓글
          replyContent={replyContent}
          handleContent={handleContent}
          handlePostBtn={handlePostBtn}
          handleOnClickDelete={handleOnClickDelete}

          replyData={getReplyData}

          // 답글달기
          handleMentionUser={handleMentionUser}

          // 본문삭제
          handlePostDelete={handlePostDelete}
        />
      </div>
    </div>
  );
}
export default CommunityDetail;