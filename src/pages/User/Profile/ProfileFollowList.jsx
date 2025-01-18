import './ProfileFollowList.css';


function ProfileFollowList({isFollow ,setIsFollow ,followerBtnClick , followBtnClick, isFollowList, followBackBtnClick, followList, followerList}) {

    console.log(followList);
    console.log(followerList);

    return (
        <div>

            <div className='follow-list'> 

          
          
            {isFollow ? 
            <>
               {followList.map((follow,index) => (
                 <div className='follow-list-follower'> 
                 <div className='follow-list-follow-box'>
                     <div className='follow-list-img'> 
                         <img src="/src/assets/profile-image-002.png"/>  
                     </div> 
                     <div>
                         <div> {follow.userName} </div>
                         <div>({follow.userId})</div>
                     </div>
                 </div>
                 <div className='user-profile-following-btn'> <button> 팔로잉 </button>  </div>
                
             </div>
               )
            )}
            </>
                :
                <>
                
                {followerList.map((follower, index) => (

                <div className='follow-list-follower'> 
                    <div className='follow-list-follow-box'>
                        <div className='follow-list-img'> 
                            <img src="/src/assets/profile-image-002.png"/>  
                        </div> 
                        <div>
                            <div> {follower.userName} </div>
                            <div>({follower.userId})</div>
                        </div>
                    </div>

                  
                  {follower.isFollowed  ?
                  <div className='user-profile-following-btn'> <button> 팔로잉 </button>  </div>
                    :

                    <div className='user-profile-follow-btn'> <button> 팔로우 </button>  </div>
                  }
                   
                   
                </div>

                ))}
                </>
            }
            </div>


       
        </div>);
}

export default ProfileFollowList;