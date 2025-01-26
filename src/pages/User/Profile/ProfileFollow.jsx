
import './ProfileFollow.css';


function ProfileFollow({isFollow ,isFollowList ,setIsFollow ,followerBtnClick , followBtnClick, followBackBtnClick , followerList , followList}) {

    return (
        <div>

   
 
        <div className='profile-main-follow'> 
                {isFollowList ?   
                    <button className="follow-back-btn" onClick={followBackBtnClick}>  ←  </button>
                    : 
                    <></>
                    }
             
                <div  className='profile-main-follow-right'  onClick={followerBtnClick} >
                    <div className="follower-btn"> 팔로워 </div>
                    <div className="follower-amount"> {followerList.length} </div>
                </div>
                <div className='profile-main-follow-left' onClick={followBtnClick}>
                    <div className="follow-btn" > 팔로잉 </div>
                    <div  className="follow-amount"> {followList.length} </div>
                </div>
        </div>

        

       
        </div>);
}

export default ProfileFollow;