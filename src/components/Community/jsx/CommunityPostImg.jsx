// 게시물 사진 컴포넌트
import "../css/CommunityPostImg.css";
// import postImg from "../../../../src/assets/img/user/ex_user_profile_01.png";


function CommunityPostImg({ postImg }) {
  return (
    <div className="post-image-container">
      <img className="post-image" src={postImg} alt="게시글 이미지" />
    </div>
  );
}
export default CommunityPostImg;