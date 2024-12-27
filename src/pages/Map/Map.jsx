import React, { useEffect, useRef, useState } from 'react';
import './Map.css';
import axios from 'axios';

import ProfileModal from '../../components/User/Profile/ProfileModal';
import MapAPI from './MapAPI';
import { use } from 'react';


function Map() {


  // 유저 정보

    // // 유저 정보 임시 값
    // const UserProfileData = {   image : 'src/assets/img/user/ex_user_profile_03.png',
    //   name : '브라운박사',
    //   info : ' 7 강아지 키우고 있는 브라운 박사 ! 입니다.',
    //   dogList : ["레오", "헥토파스칼", "감자"],
    //   walkStatus : false};

  //   const [data , setData] = useState('');
  //   const [num , setNum ] = useState(0);
  //   const [dataList, setDataList] = useState([]);

  //   const sendRequest = async () => {
  //     const url = 'http://localhost:8181/community/regist'; // 요청 URL
  //     const requestData = {
  //       community_content : data,
  //       community_no : num
  //     };
    
  //     try {
  //       const response = await axios.post(url, requestData, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //       console.log('Response:', response.data); // 서버 응답 처리
  //     } catch (error) {
  //       console.error('Error:', error); // 에러 처리
  //     }

  //     Request();
  //   };

  //   useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             const response = await axios.get('http://localhost:8181/community/test');
  //             console.log('Response:', response.data); // 서버 응답 처리
  //             setDataList(response.data);
  //         } catch (error) {
  //             console.error('Error fetching data:', error);
  //         }
  //     };

  //     fetchData();
  // }, []);

  // const Request = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8181/community/test');
  //     console.log('Response:', response.data); // 서버 응답 처리
  //     setDataList(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  return (
    <>
      {/* <input type='text' value={data} onChange={(e) => setData(e.target.value)}/> 
      <input type='number' vlaue={num} onChange={(e) => setNum(e.target.value)}/>
      <button onClick={ () => sendRequest()}> 등록 </button>
      <button onClick={Request}> 리스트 </button>

      {dataList.map((data, index) => {
        return (
          <ul key={index}>
            <li>{data.community_content} | {data.community_no}</li>
          </ul>
        );
      })} */}


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
