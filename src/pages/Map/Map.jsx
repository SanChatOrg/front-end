import React, { useEffect, useRef } from 'react';
import './Map.css';

import ProfileModal from '../User/Profile/ProfileModal';
import MapAPI from './MapAPI';


function Map() {

  return (
    <>

      {/* 지도 영역 컴포넌트트 */}
      <MapAPI/>

      {/* 프로필 모달 컴포넌트 */}
      {/* <ProfileModal />       */}
      
    
    </>
  );
}

export default Map;
