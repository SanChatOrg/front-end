import React, { useEffect, useRef } from 'react';
import './Map.css';

import ProfileModal from '../../components/User/Profile/ProfileModal';
import MapAPI from './MapAPI';


function Map() {


  // 유저 정보

    // // 유저 정보 임시 값
    // const UserProfileData = {   image : 'src/assets/img/user/ex_user_profile_03.png',
    //   name : '브라운박사',
    //   info : ' 7 강아지 키우고 있는 브라운 박사 ! 입니다.',
    //   dogList : ["레오", "헥토파스칼", "감자"],
    //   walkStatus : false};



  return (
    <>

      {/* 지도 영역 컴포넌트트 */}
      <MapAPI/>
      
      {/* <ProfileModal      
          image={UserProfileData.image} 
          name={UserProfileData.name} 
          info={UserProfileData.info} 
          dogList={UserProfileData.dogList}  
          walkStatus={UserProfileData.walkStatus}
        />    */}


    </>
  );
}

export default Map;
