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

        // const HOME_PATH = window.HOME_PATH || ".";
        const position = new naver.maps.LatLng(location.latitude, location.longitude);
  
        // // 네이버 지도 객체 생성
        // mapRef.current = new naver.maps.Map(mapContainer.current, {
        //   center: position,
        //   zoom: 19,
        // });


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
      

        // new naver.maps.Marker({
        //   position: new naver.maps.LatLng(location.latitude, location.longitude),
        //   map: mapRef.current,
        // });


        // 정보창 추가 (1)
        const contentString = [
          '<div style="display: flex; gap: 5px; width: 350px; padding: 10px; border: 1px solid black; border-radius: 5px;">',
          '  <div style="position: relative;">',
          '    <div style="margin: 10px; border: 1px solid black; border-radius: 100%; width: 100px; height: 100px;">',
          '      <img src="public/img_dog.png" style="width: 100%; height: 100%; object-fit: cover;" />',
          '    </div>',
          '    <div style="position: absolute; top: 65px; left: 65px; border: 1px solid black; border-radius: 100%; background-color: #ddd; width: 50px; height: 50px;">',
          '      활성화',
          '    </div>',
          '    <div>',
          '      <button style="width: 120px; border: 1px solid blue; border-radius: 5px;">버튼</button>',
          '    </div>',
          '  </div>',
          '  <div style="width: 100%; display: flex; flex-direction: column;">',
          '    <div style="height: 80%;">',
          '      <div style="font-size: 20px; font-weight: bold; padding: 5px;">웰시코기 123</div>',
          '      <div style="padding: 5px;">소개 글이 없습니다.</div>',
          '    </div>',
          '    <div style="height: 20%;">',
          '      <div style="float: right; display: flex; gap: 5px;">',
          '        <div style="border: 1px solid blue; border-radius: 5px; padding: 3px 5px;">이름</div>',
          '        <div style="border: 1px solid blue; border-radius: 5px; padding: 3px 5px;">이름</div>',
          '        <div style="border: 1px solid blue; border-radius: 5px; padding: 3px 5px;">이름</div>',
          '        <div style="border: 1px solid blue; border-radius: 5px; padding: 3px 5px;">...</div>',
          '      </div>',
          '    </div>',
          '  </div>',
          '</div>',
        ].join('');
        

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
