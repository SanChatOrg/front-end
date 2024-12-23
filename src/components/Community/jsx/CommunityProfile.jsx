// 프로필 사진과 닉네임 컴포넌트
import "../css/CommunityProfile.css";

function CommunityProfile({ profileImg, userName }) {
  return (
    <div className="user-profile">
      <div className="profile-container">
        <img className="profile-image" src={profileImg} alt="Profile" />
      </div>
      <span className="userName">{userName}</span>
    </div>
  );
}
export default CommunityProfile;