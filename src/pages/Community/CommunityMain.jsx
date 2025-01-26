import "./CommunityMain.css";

import CommunityPostItem from "../../components/Community/jsx/CommunityPostItem";
import Header from "../../components/Community/jsx/Header";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";

function CommunityMain() {

  const navigate = useNavigate();

  const posts = [
    {
      id: 1,
      profileImg: "../../../../src/assets/img/user/ex_user_profile_01.png",
      userName: "시바견 노예",
      text: "집 좀 들어가자고 이제 그만 놀고 집 들어가자! 오늘 진짜 신나게 뛰어다녔잖아",
      postImg: "../../../../src/assets/img/user/ex_user_profile_01.png",
      postTime: "• 1분"
    },
    {
      id: 2,
      profileImg: "../../../../src/assets/img/user/ex_user_profile_02.png",
      userName: "댕댕이 집사",
      text: "오늘은 정말 날씨가 좋아서 산책이 즐거웠어요!",
      postImg: "../../../../src/assets/img/user/ex_user_profile_02.png",
      postTime: "• 1시간"

    },
    {
      id: 3,
      profileImg: "../../../../src/assets/img/user/ex_user_profile_03.png",
      userName: "브라운 박사",
      text: "브라운이가 오늘 처음으로 강아지 친구를 만났어요!",
      postImg: "../../../../src/assets/img/user/ex_user_profile_03.png",
      postTime: "• 1일"

    },
    {
      id: 4,
      profileImg: "../../../../src/assets/img/user/ex_user_profile_04.png",
      userName: "강아지 주인",
      text: "우리 강아지 오늘 처음으로 공원에 다녀왔어요!",
      postImg: "../../../../src/assets/img/user/ex_user_profile_04.png",
      postTime: "• 3일"

    },
  ];

  const handleWriteClick = () => {
    setTimeout(() => {
      navigate(PATHS.COMMUNITY.WRITE)
    }, 200);
  };

  return (
    <div>
      <Header pageName="커뮤니티" showWriteBtn={true} onWriteClick={handleWriteClick} />
      <div className="post-container">
        {posts.map((post) => (
          <CommunityPostItem
            key={post.id}
            profileImg={post.profileImg}
            userName={post.userName}
            text={post.text}
            postImg={post.postImg}
            postTime={post.postTime}
          />
        ))}
      </div>
    </div>
  );
}

export default CommunityMain;
