import './ProfileImageList.css';
import { PATHS } from '../../../routes/paths.js'
import { useNavigate } from 'react-router-dom';

function ProfileImageList({imageList}) {



      const navigate = useNavigate();

    // 프로필 이동 (네비게이트)
    const goCommunityList = (communityNo) => { 
      navigate(`${PATHS.COMMUNITY.DETAIL}/${communityNo}`, { state: communityNo });
    };

  return (

    <div>
      <div className='profile-part3'> 

         {imageList.map((img, index) => (
          
          <div key={index} onClick={()=>goCommunityList(img.communityNo)}>

          {img.photoList.map((photo, index) => (
              <img key={index} className="profile-grid-img" src={photo.photoUrl} alt={`Profile ${index}`} />
          ))}

          </div>
       
        ))}
   


      </div>
    </div>
  );
}

export default ProfileImageList;