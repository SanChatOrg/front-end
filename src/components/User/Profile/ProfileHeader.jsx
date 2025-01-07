import './ProfileHeader.css';

function ProfileHeader({userName , userInfo , userImage}) {

  return (
    
    <div>
 
      <div className='profile-part1'> 
        <div className='profile-part-right'>
        <div className='user-profile-img'> <img src={userImage}/> </div> 
        </div>
        <div className='profile-part-left'>
          <div className='profile-part-left-top'>
            <div className='user-profile-name'> {userName} </div>
            <div className='user-profile-intro'> {userInfo} </div>
          </div>
          <div className='profile-part-left-bottom'>
            {/* 따로 처리 필요 세션에 따라 변경! */}
          <div className='user-profile-follow'> <button> 팔로우 하기 </button>  </div>
          {/*<div className='user-profile-follow'> <button> 팔로잉 </button>  </div>
          <div className='user-profile-follow'> <button> 프로필 편집 </button>  </div>*/}
          </div>
        </div>

      </div>

    </div>
  );
}

export default ProfileHeader;