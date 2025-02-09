import './ProfileFollowList.css';


function ProfileFollowList({goUserProflie , UnfollowUserBtnClick , isFollow ,setIsFollow ,followerBtnClick , followBtnClick, isFollowList, followBackBtnClick, followList, followerList, followUserBtnClick, setFollowUserNo}) {

    console.log(followList);
    console.log(followerList);

    return (
        <div>

            <div className='follow-list'> 

          
          
            {isFollow ? 
            <>
               {followList.map((follow,index) => (
                 <div className='follow-list-follower' key={follow.userNo}> 
                 <div className='follow-list-follow-box' onClick={() => goUserProflie(follow.userId)}>
                     <div className='follow-list-img'> 
                         <img src={follow.photo.photoUrl}/>  
                     </div> 
                     <div>
                         {/* <div  onClick={() => goUserProflie(follow.userId)}> {follow.userName} </div> */}
                         <div  > {follow.userName} </div>
                         <div > ({follow.userId})</div>
                     </div>
                 </div>
                 <div className='user-profile-following-btn' onClick={() => UnfollowUserBtnClick(follow.userNo)}> <button> 팔로잉 </button>  </div>
        
             </div>
               )
            )}
            </>
                :
                <>
                
                {followerList.map((follower, index) => (

                <div className='follow-list-follower' key={follower.userNo}>  
                    <div className='follow-list-follow-box' onClick={() => goUserProflie(follower.userId)}>
                        <div className='follow-list-img'> 
                            <img src={follower.photo.photoUrl}/>  
                        </div> 
                        <div>
                            <div> {follower.userName} </div>
                            <div >({follower.userId})</div>
                        </div>
                    </div>

                  
                  {follower.isFollowed  ?
                  <div className='user-profile-following-btn' onClick={() => UnfollowUserBtnClick(follower.userNo)}> <button> 팔로잉 </button>  </div>
                    :

                    <div className='user-profile-follow-btn' onClick={() => followUserBtnClick(follower.userNo)}> <button> 팔로우 </button>  </div>
                  }
                   
                   
                </div>

                ))}
                </>
            }
            </div>


       
        </div>);
}

export default ProfileFollowList;