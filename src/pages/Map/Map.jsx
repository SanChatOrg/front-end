import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Map.css';
import MapAPI from './MapAPI';



function Map() {

  // const [mapData , setMapData] = useState('Default');


  // useEffect(() => {
  //   const fetchData = async () => {
  //             try {
  //                 const response = await axios.get('http://localhost:8181/map/mapData');
  //                 console.log('Response:', response.data); // 서버 응답 처리
  //                 setMapData(response.data);
  //             } catch (error) {
  //                 console.error('Error fetching data:', error);
  //             }
  //         };
    
  //         fetchData();
  // },[])

//   const postData = () => {

//     const data = "안녕하세요";
    
//     axios.post('http://localhost:8181/map/PostMapData', "안녕하세요", {
//       headers: { 'Content-Type': 'text/plain' }
//   });
  
//   }
  
  return (
    <>


      {/* <div> 서버에서 받아온 데이터 : {mapData} </div>
      <div> 서버로 데이터 보내기 : <button onClick={postData}> 보내기 </button> </div> */}

 
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
