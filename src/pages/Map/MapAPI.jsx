import React, { useEffect, useRef, useState } from 'react';
import './MapAPI.css';
import MapWalkDisplay from './MapWalkDisplay';


function MapAPI() {
    
    const mapContainer = useRef(null); // 네이버 지도
    const mapRef = useRef(null); // 지도 객체 참조
    const [location, setLocation] = useState({latitude : null , longitude : null}); // 내 위치


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
        const mapOptions = {
          center: new naver.maps.LatLng(location.latitude, location.longitude), // 내 위치
          zoom: 10,
          minZoom: 15,
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

        // 마커 추가
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(location.latitude, location.longitude),
          map: mapRef.current,
        });

        // 정보창 추가
        const contentString = '<div>여기에 정보창 내용을 넣으세요!</div>';
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

        // 정보창 처음에 열기
        infowindow.open(mapRef.current, marker);
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
  
    
    // var HOME_PATH = window.HOME_PATH || '.';
    // var position = new naver.maps.LatLng(37.3849483, 127.1229117);

    // var map = new naver.maps.Map('map', {
    //     center: position,
    //     zoom: 19
    // });

    // var markerOptions = {
    //     position: position.destinationPoint(90, 15),
    //     map: map,
    //     icon: {
    //         url: HOME_PATH +'/img/example/sally.png',
    //         size: new naver.maps.Size(50, 52),
    //         origin: new naver.maps.Point(0, 0),
    //         anchor: new naver.maps.Point(25, 26)
    //     }
    // };

    // var marker = new naver.maps.Marker(markerOptions);
      

  return (
    <>
     
      <div className='map-box'>

        {/* 산책 정보 표시 */}
        <MapWalkDisplay/>

        {/* 내 위치 바로가기 */}
        <div className='map-my-location'> 
            <button onClick={goMyLocation}> 📍 </button>
        </div>

        {/* 보이기 버튼 */}
        <div className='map-view-mode'> 
            <button > 👁️ </button>
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
