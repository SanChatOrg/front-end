import "./CommunityMain.css";

import CommunityPostItem from "../../components/Community/jsx/CommunityPostItem";
import Header from "../../components/Community/jsx/Header";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { useEffect, useState } from "react";
import axios from "axios";

function CommunityMain() {

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]); // 서버에서 받아온 데이터를 저장할 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [isDeleting, setIsDeleting] = useState(false); // 삭제상태
  const [menuOpen, setMenuOpen] = useState(false); // 설정 상태 관리
  const [isLikedMap, setIsLikedMap] = useState({}); // 좋아요 상태 매핑(여러 게시물 관리)


  // 서버연결 확인
  useEffect(() => {
    fetch('http://localhost:8181/community/get')
      .then(response => response.text())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error('서버연결 오류', error));
  }, []);


  // 글 전체 조회
  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:8181/community/getAllPost?userNo=2') // 테스트 용도
      .then(response => {
        if (!response.ok) {
          throw new Error("글 조회 실패");
        }
        return response.json();
      })
      .then(data => {
        console.log("글 데이터: ", data);
        setPosts(data);

        const newIsLikeMap = {};
        data.forEach(post => {
          console.log(`Post ${post.communityNo} isLiked:`, post.isLiked);
          newIsLikeMap[post.communityNo] = post.isLiked === 'y';
        });
        setIsLikedMap(newIsLikeMap);

        setIsLoading(false);
      })
      .catch(error => {
        console.error('서버연결 오류', error);
        setIsLoading(false);
      });
  }, []);

  // 새글 작성 버튼
  const handleWriteClick = () => {
    setTimeout(() => {
      navigate(PATHS.COMMUNITY.WRITE)
    }, 200);
  };

  // 본문 삭제
  const handlePostDelete = async (communityNo) => {
    if (!window.confirm('게시글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      setIsDeleting(true);

      await axios.put(`http://localhost:8181/community/deletePost/${communityNo}`);

      setPosts((prevPosts) => prevPosts.filter(post => post.communityNo !== communityNo));

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

  // 좋아요 버튼 클릭
  const handleLikeClick = async (communityNo, userNo) => {
  try {
    const response = await axios.post(`http://localhost:8181/community/like/${communityNo}/${userNo}`);
    const updatedLike = response.data;

    // 게시물 상태 업데이트
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.communityNo === communityNo) {
          return {
            ...post,
            communityLikeCount: updatedLike.isLiked === 'y' 
              ? post.communityLikeCount + 1 
              : Math.max(0, post.communityLikeCount - 1),
            isLiked: updatedLike.isLiked
          };
        }
        return post;
      })
    );

    // 좋아요 상태 맵 업데이트
    setIsLikedMap((prevIsLikeMap) => ({
      ...prevIsLikeMap,
      [communityNo]: updatedLike.isLiked === 'y'
    }));

  } catch (error) {
    console.error("좋아요 업데이트 오류: ", error);
  }
};



  return (
    <div>
      <Header pageName="커뮤니티" showWriteBtn={true} onWriteClick={handleWriteClick} />
      <div className="post-container">
        {/* 로딩 오버레이 */}
        {isLoading ? (
          <div className="loading_overlay">
            <div className="spinner"></div>
            <div className="loading_text">불러오는중..</div>
          </div>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div className="post-map" key={post.communityNo}>
              <CommunityPostItem
                communityNo={post.communityNo}
                profileImg={post.profilePhoto}
                userName={post.userName}
                text={post.communityContent}
                postImg={post.photoList ? post.photoList.map(photo => photo.photoUrl) : []}
                postTime={calculateTime(post.createdAt)}
                likeCount={post.communityLikeCount}
                replyCount={post.communityReplyCount}
                onLike={(countChange) => handleLike(post.communityNo, countChange)}
                handlePostDelete={handlePostDelete}
                handleLikeClick={handleLikeClick}
                isLikedMap={isLikedMap}
                userNo={2}
              />
            </div>
          ))
        ) : (
          <div className="loading_overlay">
            <div className="spinner"></div>
            <div className="loading_text">불러오는중..</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommunityMain;
