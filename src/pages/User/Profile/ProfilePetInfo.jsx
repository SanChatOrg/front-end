import './ProfilePetInfo.css';

function ProfilePetInfo({selectedDogData}) {


    console.log(selectedDogData);

    return (
        <div>
       
            {selectedDogData && Object.keys(selectedDogData).length > 0   && (
                <div className='profile-pet-info'>
                {/* <div className='pet-img'> 
                    <img src="/src/assets/profile-image-001.png"/> 
                </div> */}
                
                    <div > {selectedDogData.dogName} <span> ( {selectedDogData.birthDate} ) </span></div>
                    <div>  {selectedDogData.dogGender === "M" ? "남자" : "여자"} </div>
                    <div>  {selectedDogData.dogBreed} </div>
                    <div>  {selectedDogData.isNeutered ? "중성화 했어요" : "중성화 안했어요"}  </div>
                
                </div>
            )
            }
            
        
            
             
        </div>
    );
}

export default ProfilePetInfo;