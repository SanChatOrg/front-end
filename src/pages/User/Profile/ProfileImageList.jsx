import './ProfileImageList.css';

function ProfileImageList({imageList}) {


  return (

    <div>
      <div className='profile-part3'> 

        {imageList.map((index, img) => {
          <>
        <button> {img} </button>
        <img className="profile-grid-img" src={img.photoUrl} />
   
          </>
       
        })}

        {imageList.map((img, index) => (
                  <img key={index} className="profile-grid-img" src={img.photoUrl} alt={`Profile ${index}`} />
        ))}

      </div>
    </div>
  );
}

export default ProfileImageList;