import './ProfileHeader.css';
import {useParams} from 'react-router-dom';
import ProfileFollow from './ProfileFollow';
function ProfileHeader({userName , userInfo , userImage, userId, userNo, session, myFollowList, followUserBtnClick, UnfollowUserBtnClick, alertSetting }) {

  const { username } = useParams();

  console.log(myFollowList , "할로우우");
  

  return (
    
    <div>
 
      <div className='profile-part1'> 
        <div className='profile-part-right'>
        <div className='user-profile-img'> <img src={userImage.photoUrl}/> </div> 
        </div>
        <div className='profile-part-left'>
          <div className='profile-part-left-top'>
            <div className='user-profile-name'> {userName} ({userId}) </div>
            <div className='user-profile-intro'> {userInfo} </div>
         
          
          </div>
        
          <div className='profile-part-left-bottom'>
            {/* 따로 처리 필요 세션에 따라 변경! */}
        
            { session === username  ?
             <div className='user-profile-myProfile'> <button onClick={() => alertSetting()}> 내 프로필 </button>  </div>
                
                :
                <>
                {myFollowList.some((follower) => follower.userId === userId) ? (
                  <div className="user-profile-following-btn" onClick={() => UnfollowUserBtnClick(userNo)}>
                    <button>팔로잉</button>
                  </div>
                ) : (
                  <div className="user-profile-follow-btn" onClick={() => followUserBtnClick(userNo)}>
                    <button>팔로우</button>
                  </div>
                )}

              </>
              
            }
        
      
          {/*<div className='user-profile-follow'> <button> 팔로잉 </button>  </div>
          <div className='user-profile-follow'> <button> 프로필 편집 </button>  </div>*/}
          </div>

        
        </div>

      </div>

    </div>
  );
}

export default ProfileHeader;