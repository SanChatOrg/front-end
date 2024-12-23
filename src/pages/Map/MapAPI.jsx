import React, { useEffect, useRef, useState } from 'react';
import { PATHS } from '../../routes/paths';
import { useNavigate } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';

import './MapAPI.css';
import ProfileModal from '../../components/User/Profile/ProfileModal';




function MapAPI() {
    
  const navigate = useNavigate();

  const goUserProflie = () => {
    navigate(`${PATHS.USER.PROFILE}`);
  };

    const mapContainer = useRef(null); // 네이버 지도
    const mapRef = useRef(null); // 지도 객체 참조
    const [location, setLocation] = useState({latitude : null , longitude : null}); // 내 위치

    // 유저 정보 임시 값
    const UserProfileData = {   image : 'src/assets/img/user/ex_user_profile_03.png',
      name : '브라운박사',
      info : ' 7 강아지 키우고 있는 브라운 박사 ! 입니다.',
      dogList : ["레오", "헥토파스칼", "감자"],
      walkStatus : false,
    };




    // 내 위치 가져오기 
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({latitude:position.coords.latitude , longitude : position.coords.longitude}); // 위도 경도 값
        },
      );
      console.log(location); 

    }, []); 

    // 지도 불러오기
    useEffect(() => {
      // 네이버 지도 API가 로드된 후 실행
      const { naver } = window;

      if (naver) {

        // const HOME_PATH = window.HOME_PATH || ".";
        const position = new naver.maps.LatLng(location.latitude, location.longitude);
  
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

        // 마커 옵션 1
        const markerOptions = {
          position: position.destinationPoint(90, 0), // 90도 방향으로 15m 떨어진 위치
          map: mapRef.current,
          icon: {
            url:`public/image2.png`,  //50픽셀
            size: new naver.maps.Size(100, 100),
            origin: new naver.maps.Point(0, 0),
            // anchor: new naver.maps.Point(25, 26),
          },
        };

        // 마커 옵션 2
        const markerOptions2 = {
          position: position.destinationPoint(10, 300), // 90도 방향으로 15m 떨어진 위치
          map: mapRef.current,
          icon: {
            url:`public/image3.png`,  //50픽셀
            size: new naver.maps.Size(100, 100),
            origin: new naver.maps.Point(0, 0),
            // anchor: new naver.maps.Point(25, 26),
          },
        };

        // 마커 옵션
        const markerOptions3 = {
          position: position.destinationPoint(40, -200), // 90도 방향으로 15m 떨어진 위치
          map: mapRef.current,
          icon: {
            url:`public/image4.png`,  //50픽셀
            size: new naver.maps.Size(100, 100),
            origin: new naver.maps.Point(0, 0),
            // anchor: new naver.maps.Point(25, 26),
          },
        };
        
        // 마커 추가 (1)
        const marker =  new naver.maps.Marker(markerOptions);

        // 마커 추가 (2)
        const marker2 =  new naver.maps.Marker(markerOptions2);
        
        // 마커 추가 (3)
        const marker3 =  new naver.maps.Marker(markerOptions3);
      
        // 정보창 컴포넌트 HTML 문자열로 변환
        const contentString = ReactDOMServer.renderToString(      
        <ProfileModal      
          image={UserProfileData.image} 
          name={UserProfileData.name} 
          info={UserProfileData.info} 
          dogList={UserProfileData.dogList}  
          walkStatus={UserProfileData.walkStatus}
          goToProfile={goUserProflie}
        />      
      );

        // 정보창 생성
        const infowindow = new naver.maps.InfoWindow({
          content: contentString,
          anchorSize: new naver.maps.Size(15, 5),
          pixelOffset: new naver.maps.Point(0, -10),
        });

        // 마커 클릭 시 정보창 열기
        naver.maps.Event.addListener(marker, "click", () => {
          if (infowindow.getMap()) {
            infowindow.close();
          } else {
            infowindow.open(mapRef.current, marker);
          }
        });

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
