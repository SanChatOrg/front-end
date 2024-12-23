/* src/pages/Community/CommunityDetail.jsx */

import CommunityDetailItem from "../../components/Community/jsx/CommunityDetailItem";
import Header from "../../components/Community/jsx/Header";

function CommunityDetail() {

  const postDetail = {
    profileImg: "../../../../src/assets/img/user/ex_user_profile_01.png",
    userName: "시바견 노예",
    postTime: "1분 전",
    text: "집 좀 들어가자고 이제 그만 놀고 집 들어가자! 오늘 진짜 신나게 뛰어다녔잖아 너도 슬슬 지쳤지? 집에 가면 맛있는 간식도 있고, 네가 좋아하는 폭신한 자리도 기다리고 있다구! 안 따라오면 혼자 간다 빨리 와!!",
    postImg: "../../../../src/assets/img/user/ex_user_profile_01.png",
    replyCnt: "1,100"
  };


  return (
    <div>
      <Header pageName="글 보기" />

      <CommunityDetailItem
        profileImg={postDetail.profileImg}
        userName={postDetail.userName}
        postTime={postDetail.postTime}
        text={postDetail.text}
        postImg={postDetail.postImg}
        replyCnt={postDetail.replyCnt}
      />
    </div>
  );
}
export default CommunityDetail;