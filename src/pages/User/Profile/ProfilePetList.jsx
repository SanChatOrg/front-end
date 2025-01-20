import './ProfilePetList.css';

function ProfilePetList({userName, dogList, onPetSelection}) {
    
    const handleSelectPet = (pet) => {
        if (onPetSelection) {
            onPetSelection(pet); // 상위 컴포넌트로 선택 항목 전달
            console.log("선택된 헷 ---- ", pet);
        }
    }

  return (
    
    <div>
      
        <div className='profile-part2'> 
            <div className='pet-title'> <span> {userName}</span> 님의 애완견</div>
            <div className='pet-list'>

            {dogList.length > 0 && dogList.map((dog, index) => (
            <div className='pet-profile' key={index} onClick={() => handleSelectPet(dog.dogNo)}>
                <div className='pet-profile-img'> <img src={dog.photo.photoUrl}/> </div> 

                {dog.dogGender === "M" ?
                    <div className='pet-profile-gender'> <img src='/src/assets/pet-Male.png'/> </div>
                    : 
                    <div className='pet-profile-gender'> <img src='/src/assets/pet-Female.png'/> </div>
                }
                
                <div  className='pet-profile-name'> {dog.dogName} </div>
            </div>
            ))}
         
            {/* <div className='pet-profile'>
                <div className='pet-profile-img'> <img src='/src/assets/img/user/ex_user_profile_02.png'/> </div> 
                <div className='pet-profile-gender'> <img src='/src/assets/pet-Female.png'/> </div>
                <div className='pet-profile-name'> 헥토파스칼 </div>
            </div>
            <div className='pet-profile'>
                <div className='pet-profile-img'> <img src='/src/assets/img/user/ex_user_profile_02.png'/> </div> 
                <div className='pet-profile-gender'> <img src='/src/assets/pet-Female.png'/> </div>
                <div className='pet-profile-name'> 헥토파스칼 </div>
            </div>
            <div className='pet-profile'>
                <div className='pet-profile-img'> <img src='/src/assets/img/user/ex_user_profile_02.png'/> </div> 
                <div className='pet-profile-gender'> <img src='/src/assets/pet-Female.png'/> </div>
                <div className='pet-profile-name'> 헥토파스칼 </div>
            </div>
            <div className='pet-profile'>
                <div className='pet-profile-img'> <img src='/src/assets/img/user/ex_user_profile_02.png'/> </div> 
                <div className='pet-profile-gender'> <img src='/src/assets/pet-Female.png'/> </div>
                <div className='pet-profile-name'> 헥토파스칼 </div>
            </div> */}
            </div>
        
        </div>


    </div>
  );
}

export default ProfilePetList;