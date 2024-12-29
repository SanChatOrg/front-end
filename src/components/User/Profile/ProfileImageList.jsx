import './ProfileImageList.css';

function ProfileImageList({imageList}) {

  console.log(imageList);

  return (

    <div>
      <div className='profile-part3'> 

        {imageList.map((index, img) => {
           <img className="profile-grid-img" src={img} />
        })}

        {imageList.map((img, index) => (
          <img key={index} className="profile-grid-img" src={img} alt={`Profile ${index}`} />
        ))}

        {/* 
        <img className="profile-grid-img" src='../../../assets/profile-image-001.png' alt="Profile" />
        <img className='profile-grid-img' src='/src/assets/img/user/ex_user_profile_01.png'/> */}
        {/* 
        <img className='profile-grid-img' src='/src/assets/img/user/ex_user_profile_01.png'/>
        <img className='profile-grid-img' src='/src/assets/img/user/ex_user_profile_01.png'/>
        <img className='profile-grid-img' src='/src/assets/img/user/ex_user_profile_01.png'/>
        <img className='profile-grid-img' src='/src/assets/img/user/ex_user_profile_01.png'/>
        <img className='profile-grid-img' src='/src/assets/img/user/ex_user_profile_01.png'/> */}
      </div>
    </div>
  );
}

export default ProfileImageList;