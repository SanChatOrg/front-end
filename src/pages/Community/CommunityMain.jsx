import "./CommunityMain.css";

import CommunityPostItem from "../../components/Community/jsx/CommunityPostItem";
import Header from "../../components/Community/jsx/Header";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { useEffect, useState } from "react";

function CommunityMain() {

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]); // 서버에서 받아온 데이터를 저장할 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

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
    fetch('http://localhost:8181/community/getAllPost')
      .then(response => {
        if (!response.ok) {
          throw new Error("글 조회 실패");
        }
        return response.json();
      })
      .then(data => {
        console.log("글 데이터: ", data);
        setPosts(data);
        setIsLoading(false);
      })
      .catch(error => console.error('서버연결 오류', error));
    setIsLoading(false);
  }, []);

  // 새글 작성 버튼
  const handleWriteClick = () => {
    setTimeout(() => {
      navigate(PATHS.COMMUNITY.WRITE)
    }, 200);
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

  // 좋아요 관리
  const handleLike = (postId, countChange) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.communityNo === postId
          ? { ...post, communityLikeCount: post.communityLikeCount + countChange }
          : post
      )
    );
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
            <div className="post-map">
              <CommunityPostItem
                key={post.communityNo}
                communityNo={post.communityNo}
                profileImg={post.profilePhoto}
                userName={post.userName}
                text={post.communityContent}
                postImg={post.photoList ? post.photoList.map(photo => photo.photoUrl) : []}
                postTime={calculateTime(post.createdAt)}
                likeCount={post.communityLikeCount}
                replyCount={post.communityReplyCount}
                onLike={(countChange) => handleLike(post.communityNo, countChange)}
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
