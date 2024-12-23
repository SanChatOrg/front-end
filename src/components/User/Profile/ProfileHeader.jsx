import './ProfileHeader.css';

function ProfileHeader() {

  return (
    
    <div>
 
      <div className='profile-part1'> 
        <div className='profile-part-right'>
        <div className='user-profile-img'> <img src='/src/assets/img/user/ex_user_profile_03.png'/> </div> 
        </div>
        <div className='profile-part-left'>
          <div className='profile-part-left-top'>
            <div className='user-profile-name'> 브라운 박사 </div>
            <div className='user-profile-intro'> 7 멍멍이를 키우고 이씁니다 </div>
          </div>
          <div className='profile-part-left-bottom'>
          <div className='user-profile-follow'> <button> 팔로우 하기 </button>  </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default ProfileHeader;