// 프로필 사진과 닉네임 컴포넌트
import "../css/CommunityProfile.css";
import CommunityReplyTime from "./CommunityReplyTime";

function CommunityProfile({ profileImg, userName, replyTime }) {
  return (
    <div className="user-profile">
      <div className="profile-container">
        <img className="profile-image" src={profileImg} alt="Profile" />
      </div>

      <div className="username-time">
        <span className="userName">{userName}</span>

        <div className="detail-reply-time">
          <CommunityReplyTime replyTime={replyTime} />
        </div>
      </div>

    </div>
  );
}
export default CommunityProfile;