import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PATHS } from '../../routes/paths';
import { useNavigate } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';

import './MapAPI.css';
import ProfileModal from '../User/Profile/ProfileModal';
import MapWalkDisplay from './MapWalkDisplay';



function MapAPI2() {
  // 상태 관리
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [latitude, setLatitude] = useState(37.558773); // 초기 위도
  const [longitude, setLongitude] = useState(127.151588); // 초기 경도
  const [isWalking, setIsWalking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [distance, setDistance] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [autoMoveInterval, setAutoMoveInterval] = useState(null);

  const mapContainer = useRef(null); // 지도 컨테이너
  const mapRef = useRef(null); // 지도 객체
  const markerRef = useRef(null); // 마커 객체

  const EARTH_RADIUS = 6371000; // 지구 반지름 (미터)

  // 하버사인 공식을 사용한 거리 계산
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS * c;
  };

  // 100미터씩 이동하는 로직
  const moveAutomatically = () => {
    // if (!isWalking) return; // 산책 중일 때만 자동 이동 진행

    setCurrentPosition((prevPosition) => {
      if (!prevPosition) return { latitude, longitude };

      const moveDistance = 5; // 100 meters
      const deltaLat = (moveDistance / EARTH_RADIUS) * (180 / Math.PI);
      const deltaLon =
        (moveDistance /
          (EARTH_RADIUS * Math.cos((prevPosition.latitude * Math.PI) / 180))) *
        (180 / Math.PI);

      const newLatitude = prevPosition.latitude + deltaLat;
      const newLongitude = prevPosition.longitude + deltaLon;

      setDistance((prevDistance) =>
        prevDistance +
        calculateDistance(
          prevPosition.latitude,
          prevPosition.longitude,
          newLatitude,
          newLongitude
        )
      );

      setLatitude(newLatitude);
      setLongitude(newLongitude);

      return { latitude: newLatitude, longitude: newLongitude };
    });
  };

  // 위치 변경 업데이트
  const updatePosition = (position) => {
    // const { latitude: newLat, longitude: newLon } = position.coords;

    if (currentPosition) {
      const newDistance = calculateDistance(
        currentPosition.latitude,
        currentPosition.longitude
        // newLat,
        // newLon
      );
      setDistance((prevDistance) => prevDistance + newDistance);
    }

    setCurrentPosition({ latitude: newLat, longitude: newLon });
    // setLatitude(newLat);
    // setLongitude(newLon);
  };

  // 산책 시작
  const startWalking = () => {
    
    setIsWalking(true);
    setStartTime(new Date());
    setDistance(0);
    setCurrentPosition({ latitude, longitude });

    // 자동 이동 시작
    const interval = setInterval(moveAutomatically, 1000); // 1초마다 이동
    setAutoMoveInterval(interval);

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(updatePosition, console.error, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // 산책 종료
  const stopWalking = () => {
    setIsWalking(false);
    setEndTime(new Date());
    // navigator.geolocation.clearWatch(); // 위치 추적 중지

    // 자동 이동 중지
    if (autoMoveInterval) {
      clearInterval(autoMoveInterval);
      setAutoMoveInterval(null);
    }


  // // 거리 측정 중지
  // setIsMeasuring(false);
  };

//   // 거리 측정 시작
// const startMeasuring = () => {
//   setIsMeasuring(true); // 거리 측정 시작
// };

// // 거리 측정 중지
// const stopMeasuring = () => {
//   setIsMeasuring(false); // 거리 측정 중지
// };

  // 산책 시간 계산
  const getWalkingTime = () => {
    if (!startTime || !endTime) return "00분 00초";
    const diff = (endTime - startTime) / 1000; // 초 단위
    const minutes = Math.floor(diff / 60);
    const seconds = Math.floor(diff % 60);
    return `${minutes}분 ${seconds}초`;
  };

  // 지도 및 마커 초기화 및 업데이트
  useEffect(() => {
    const { naver } = window;
    if (!naver) return;

    if (!mapRef.current) {
      // 지도 초기화
      const mapOptions = {
        center: new naver.maps.LatLng(latitude, longitude),
        zoom: 10,
        minZoom: 18,
        mapTypeControl: false,
        zoomControl: false,
      };

      mapRef.current = new naver.maps.Map(mapContainer.current, mapOptions);

      // 마커 초기화
      markerRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(latitude, longitude),
        map: mapRef.current,
        icon: {
          url: `/image1.png`,
          size: new naver.maps.Size(50, 50),
        },
      });
    } else {
      // 지도와 마커 위치 업데이트
      const newPosition = new naver.maps.LatLng(latitude, longitude);
      mapRef.current.setCenter(newPosition);
      if (markerRef.current) {
        markerRef.current.setPosition(newPosition);
      }
    }
  }, [latitude, longitude]);
  return (
    <>
  <div>
      <div ref={mapContainer} style={{ width: "100%", height: "400px" }}></div>
      <button onClick={startWalking} disabled={isWalking}>
        산책 시작
      </button>
      <button onClick={stopWalking} disabled={!isWalking}>
        산책 종료
      </button>
      <p>산책 거리: {distance.toFixed(2)}m</p>
      <p>산책 시간: {getWalkingTime()}</p>
    </div>
    
        {/* 산책 정보 표시 */}
        {/* <MapWalkDisplay/> */}

        {/* 내 위치 바로가기 */}
        <div className='map-my-location'> 
            {/* <button onClick={goMyLocation}> 📍 </button> */}
        </div>

        {/* 보이기 버튼 */}
        <div className='map-view-mode'> 
            {/* <button onClick={goUserProflie}> 👁️ </button> */}
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

        <MapWalkDisplay/>

    </>
  );
}

export default MapAPI2;
