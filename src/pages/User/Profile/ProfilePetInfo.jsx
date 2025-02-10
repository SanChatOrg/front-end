import { useEffect, useState } from 'react';
import './ProfilePetInfo.css';

function ProfilePetInfo({dogList , selectedPet}) {

        

    return (
        <div>
       

           { dogList && dogList.map((dog,index) => (

                (dog.dogNo === selectedPet &&
                <div className='profile-pet-info'>
                {/* <div className='pet-img'> 
                    <img src="/src/assets/profile-image-001.png"/> 
                </div> */}
                
                    <div > {dog.dogName} <span> ( {dog.birthDate} ) </span></div>
                    <div>  {dog.dogGender === "M" ? "남자" : "여자"} </div>
                    <div>  {dog.dogBreed} </div>
                    <div>  {dog.isNeutered ? "중성화 했어요" : "중성화 안했어요"}  </div>
                
                </div>)
            ))}

            
            
            
        
            
             
        </div>
    );
}

export default ProfilePetInfo;