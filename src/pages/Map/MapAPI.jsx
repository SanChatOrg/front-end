import React, { useEffect, useRef, useState } from 'react';
import { PATHS } from '../../routes/paths';
import { useNavigate } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';

import './MapAPI.css';
import ProfileModal from '../../components/User/Profile/ProfileModal';
import useWatchLocation from './useWatchLocation';



function MapAPI() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  
  const navigate = useNavigate();

  // 프로필 가기 (네비게이트)
  const goUserProflie = (userId) => { 
    navigate(`${PATHS.USER.PROFILE}`,{state : userId});

  };

    const mapContainer = useRef(null); // 네이버 지도
    const mapRef = useRef(null); // 지도 객체 참조

    // const [location, setLocation] = useState({latitude : null , longitude : null}); // 내 위치
  
    
    // 내 위치 가져오기 
    useEffect(() => {

      navigator.geolocation.watchPosition(
        (position) => {
          setLocation({latitude:position.coords.latitude , longitude : position.coords.longitude}); // 위도 경도 값
        },
      );
      console.log(location); 

    }, []); 


    // 유저 정보 배열로 받기
    // 마커에 찍는 이미지는 따로 원형으로 마커용 이미지를 생성해야할 것 같음.
    const UserProfileData = 
      [{  image : 'src/assets/img/user/ex_user_profile_03.png',
      name : '마루콩콩콩',
      info : ' 마루 멍챗 맞팔 해요 ~',
      dogList : ["마루"],
      walkStatus : true,
      userId : 'maru123',
      position : new naver.maps.LatLng(37.5799, 127.200564)},
      {image : 'src/assets/img/user/ex_user_profile_04.png',
      name : '브라운박사',
      info : ' 7 강아지 키우고 있는 브라운 박사 ! 입니다.',
      dogList : ["레오", "헥토파스칼", "감자"],
      walkStatus : true,
      userId : 'backbrown',
      position : new naver.maps.LatLng(37.5762414, 127.199533)},
      {image : 'src/assets/img/user/ex_user_profile_02.png',
      name : '시파주인',
      info : '입력한 정보가 없습니다.',
      dogList : ["모모"],
      walkStatus : true,
      userId : 'sibamomo22',
      position : new naver.maps.LatLng(location.latitude, location.longitude)}
      ]
    ;


    // 지도 불러오기
    useEffect(() => {
      // 네이버 지도 API가 로드된 후 실행
      const { naver } = window;

      if (naver) {

        // 지도 객체 생성하기기
        const mapOptions = {
          center: new naver.maps.LatLng(location.latitude, location.longitude), // 내 위치
          zoom: 10,
          minZoom: 16,
          useStyleMap: false,
          mapTypeControl: false,
          mapTypeControlOptions: {
            style: naver.maps.MapTypeControlStyle.BUTTON,
            position: naver.maps.Position.TOP_LEFT,
          },
          zoomControl: false,
          zoomControlOptions: {
            position: naver.maps.Position.TOP_RIGHT,
          },
        };

        // 네이버 지도 객체 생성
        mapRef.current = new naver.maps.Map(mapContainer.current, mapOptions);        

        // 정보창 컴포넌트 HTML 문자열로 변환
        const contentString = [];

        // 정보창 생성
        const infowindow = [];

        // 마커 옵션
        const markerOptions = [];

        // 마커 배열
        const marker = [];

        // 위치 값 

        for(let n = 0 ; n < UserProfileData.length; n++){

        // 마커 옵션 만들기
          markerOptions[n] = {
          position: UserProfileData[n].position.destinationPoint(0, 0), // 90도 방향으로 15m 떨어진 위치
          map: mapRef.current,
          icon: {
            url: `/image${n}.png`,
            size: new naver.maps.Size(100, 100),
            origin: new naver.maps.Point(0, 0),
            // anchor: new naver.maps.Point(25, 26),
          },
        };

          // 마커 추가하기
          marker[n] =  new naver.maps.Marker(markerOptions[n]);


          // info 데이터 
          contentString[n] = ReactDOMServer.renderToString(      
            <ProfileModal      
              image={UserProfileData[n].image} 
              name={UserProfileData[n].name} 
              info={UserProfileData[n].info} 
              dogList={UserProfileData[n].dogList}  
              walkStatus={UserProfileData[n].walkStatus}
              goToProfile={goUserProflie}
            />      
          );

          
          // info 맵에 추가 
         infowindow[n] = new naver.maps.InfoWindow({
          content: contentString[n],
          anchorSize: new naver.maps.Size(15, 5),
          pixelOffset: new naver.maps.Point(0, -10),
        });


         // 마커 클릭 시 정보창 열기 이벤트
        naver.maps.Event.addListener(marker[n], "click", () => {
          if (infowindow[n].getMap()) {
            infowindow[n].close();
          } else {
            infowindow[n].open(mapRef.current, marker[n]); // 정보창 열기
            const profileButton = document.querySelector('.click-btn'); 
            if (profileButton) {
              profileButton.addEventListener('click', () => {  // 프로필 가기 이벤트
                goUserProflie(UserProfileData[n].userId);
              });
            }
          }
        });


        }
   
        // // 정보창 처음에 열기
        // infowindow.open(mapRef.current, marker);
      }

    }, [location]);
    

    // 내 위치로 가기
    const goMyLocation = (e) => {
      e.preventDefault();
  
      if (mapRef.current) {
        const jeju = new naver.maps.LatLng(location.latitude, location.longitude);
        mapRef.current.setCenter(jeju);
      } else {
        console.error("Map instance is not initialized.");
      }
    };
  

    

  return (
    <>
    
      <div className='map-box'>

        {/* 산책 정보 표시 */}
        {/* <MapWalkDisplay/> */}

        {/* 내 위치 바로가기 */}
        <div className='map-my-location'> 
            <button onClick={goMyLocation}> 📍 </button>
        </div>

        {/* 보이기 버튼 */}
        <div className='map-view-mode'> 
            <button onClick={goUserProflie}> 👁️ </button>
        </div>

        {/* 공개 옵션 */}
        <div className='map-sharing-option'> 
            <select>
                <option> 전체 </option>
                <option> 친구만 </option>
                <option> 비공개 </option>
            </select>
        </div>

         {/* 지도 영역 */}
        <div
            ref={mapContainer}
            className='naver-map'
        ></div>


      </div>
    </>
  );
}

export default MapAPI;
