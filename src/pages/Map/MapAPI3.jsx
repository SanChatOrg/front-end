import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PATHS } from '../../routes/paths';
import { useNavigate } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import './MapWalkDisplay2.css'
import './MapAPI.css';
// import 
import MapWalkDisplay from './MapWalkDisplay';
import MapWalkDisplay2 from './MapWalkDisplay2';
import MapWalkDisplay3 from './MapWalkDisplay3';
import axios from 'axios';




function MapAPI3() {

  const EARTH_RADIUS = 6371000; // 지구 반지름 (미터)

  // 산책 기록 데이터
  const [isDogSelect, setIsDogSelect] = useState(true);
  const [DogList, setDogList] = useState("");

  // 네이버 지도 관련 객체
  const mapContainer = useRef(null); // 지도 컨테이너
  const mapRef = useRef(null); // 지도 객체
  const markerRef = useRef(null); // 마커 객체

  // 사용자 위치 (위도, 경도)
  const [location, setLocation] = useState({latitude: 0 , longitude : 0});

  // 사용자 정보
  const [UserProfileData, setUserProfileData] = useState({
        image: 'src/assets/img/user/ex_user_profile_02.png',
        name: '혜주',
        info: '입력한 정보가 없습니다.',
        dogList: ["공멍"],
        walkStatus: true,
        userId: 'hyeju',
        position: new naver.maps.LatLng(0, 0)
    });


  // 산책 종료 후 "최종 기록 데이터"
  const [partDogList, setPartDogList] = useState([]); // 참여한 강아지
  const [walkDate , setWalkDate] = useState(); // 산책 참여 일자 
  const [walkTimeStart, setWalkTimeStart] = useState(); // 산책 시작 시간
  const [walkTimeEnd, setWalkTimeEnd] = useState(); // 산책 종료 시간 
  const [walkTime, setWalkTime] = useState();
  const [walkDistance, setWalkDistance] = useState(); // 산책 거리
  // 산책 시작함 
  const [isWalkStart, setIsWalkStart] = useState(false);

  // 산책 상태 관리 변수
  const [isWalking, setIsWalking] = useState(false); // 산책 상태
  const [isPaused, setIsPaused] = useState(false); // 일시정지 상태
  const [isStopped, setIsStopped] = useState(false);

  const [elapsedTime, setElapsedTime] = useState(0); // 경과 시간 (초 단위)
  const timerRef = useRef(null); // 타이머 ID 저장
  const [autoMoveInterval, setAutoMoveInterval] = useState(null); // 인터벌 상태 관리
  const [distance, setDistance] = useState(0); // 거리 계산 저장

  const navigate = useNavigate();

  // 프로필 가기 (네비게이트)
  const goUserProflie = (userId) => { 
    navigate(`${PATHS.USER.PROFILE}`,{state : userId});

  };

/////////////////////////////
/////////////////////////////
/////////////////////////////

  // 내 위치 가져오기

  useEffect(() => {
    navigator.geolocation.watchPosition(
      (position) => {
        setLocation({latitude:position.coords.latitude , longitude : position.coords.longitude}); // 위도 경도 값

        setUserProfileData((prevData) => ({
          ...prevData, // 기존 데이터 유지
          position: new naver.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          ),
        }));
      },
    );
    console.log(location); 
  }, []); 



/////////////////////////////
/////////////////////////////
/////////////////////////////
 


  useEffect(()=>{
    console.log(DogList , "하위에서 관리됨");
    console.log(isWalkStart, "하위에서 관리됨");
    setPartDogList([DogList]); // 서버로 보낼 최종 데이터
    // console.log("서버로 보낼 최종 데이터" , partDogList);
  },[DogList])
  
  useEffect(() => {
    console.log("서버로 보낼 최종 데이터 (최신):", partDogList);
  }, [partDogList]);

  useEffect(() => {
      if(isWalkStart === true){
        console.log(partDogList , "와의 산책이 시작되었습니다");
      }
  }, [isWalkStart]);


  // 산책 버튼 
  const walkBtn = () => {

    setIsWalkStart(true);
    // 강아지 선택하기
    setPartDogList([]); // 참여하는 강아지 선택 후 저장
  
    // if 강아지가 하나라도 선택되었다면 버튼 나타나기 [산책 시작하기]
  } 


  // 기록
  // useEffect(()=> {
  //   console.log(walkDate, walkTimeStart, walkTimeEnd);
  //   console.log(elapsedTime, formatTime(elapsedTime) , "산책시간");
  // },[walkDate, walkTimeEnd, walkTimeStart,elapsedTime]);


  // 시간 반환 함수
  const getLocalTime = () => {
    const today = new Date(); // TODAY 대신 Date 객체를 새로 생성
    const hours = today.getHours().toString().padStart(2, "0"); 
    const minute = today.getMinutes().toString().padStart(2, "0");
    const second = today.getSeconds().toString().padStart(2, "0");
  
    const time = `${hours}:${minute}:${second}`; // HH:MM:SS 형식
    return time;
  };

  // 날짜 반환 함수 
  const getLocalDate = () => {
    const today = new Date(); // TODAY 대신 Date 객체를 새로 생성
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // 월을 2자리로 포맷팅
    const day = today.getDate().toString().padStart(2, "0"); // 일을 2자리로 포맷팅
    const date = `${year}-${month}-${day}`; // YYYY-MM-DD 형식

    return date;
  }

    // 시간 포맷팅 함수 (초 → HH:MM:SS)
    const formatTime = (time) => {
    
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
  
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };
  


    // 거리 계산 함수 (10m 씩 이동함)
    // 100미터씩 이동하는 로직

  const resultDate = () => {
    console.log("최종 데이터 입니다 ---------------------");
    console.log(walkDate, walkTimeStart, walkTimeEnd);
    console.log(walkTime , "최종 산책시간");
    console.log(walkDistance, "m 최종 산책 거리 ");
    console.log("-------------------------------------");
     
  }

 
/////////////////////////////
/////////////////////////////
/////////////////////////////


    
useEffect(() => {
  const { naver } = window;
  if (!naver) return;

  const map = initializeMap(naver, mapContainer.current);



  const marker = createMarker(naver, map, UserProfileData);
    // 맵의 초기 중심을 마커의 위치로 설정
    map.setCenter(marker.getPosition());
  createInfoWindow(naver, marker, UserProfileData, goUserProflie);
  
}, [location, UserProfileData]);

const initializeMap = (naver, mapContainer) => {
  const mapOptions = {
    center: new naver.maps.LatLng(location.latitude, location.longitude),
    zoom: 10,
    minZoom: 18,
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
  
  return new naver.maps.Map(mapContainer, mapOptions);
};

const createMarker = (naver, map, UserProfileData) => {
  const markerOptions = {
    position: UserProfileData.position,
    map: map,
    icon: {
      url: `/image2.png`,
      size: new naver.maps.Size(100, 100),
      origin: new naver.maps.Point(0, 0),
    },
  };
  
  return new naver.maps.Marker(markerOptions);
};
  
const createInfoWindow = (naver, marker, UserProfileData, goUserProflie) => {

  const contentString = ReactDOMServer.renderToString(
    // <ProfileModal
    //   image={UserProfileData.image}
    //   name={UserProfileData.name}
    //   info={UserProfileData.info}
    //   dogList={UserProfileData.dogList}
    //   walkStatus={UserProfileData.walkStatus}
    //   goToProfile={goUserProflie}
    // />
  );

  const infowindow = new naver.maps.InfoWindow({
    content: contentString,
    anchorSize: new naver.maps.Size(15, 5),
    pixelOffset: new naver.maps.Point(0, -10),
  });

  // 마커 클릭 시 정보창 열기 이벤트
  naver.maps.Event.addListener(marker, "click", () => {
    if (infowindow.getMap()) {
      infowindow.close();
    } else {
      infowindow.open(marker.getMap(), marker);
      const profileButton = document.querySelector(".click-btn");
      if (profileButton) {
        profileButton.addEventListener("click", () => {
          goUserProflie(UserProfileData.userId);
        });
      }
    }
  });

  return infowindow;
};
 
/////////////////////////////
/////////////////////////////
/////////////////////////////

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


// 위치 변경 업데이트
const updatePosition = (position) => {
  const { latitude: newLat, longitude: newLon } = position.coords;

  if (UserProfileData.position) {
    const newDistance = calculateDistance(
      UserProfileData.position.lat(),
      UserProfileData.position.lng(),
      newLat,
      newLon
    );
    setDistance((prevDistance) => prevDistance + newDistance);
  }

  setUserProfileData((prevData) => ({
    ...prevData,
    position: new naver.maps.LatLng(newLat, newLon),
  }));
};

// 100미터씩 이동하는 로직
const moveAutomatically = () => {
  setUserProfileData((prevData) => {
    if (!prevData.position) return prevData;

    const moveDistance = 5; // 5 meters
    const deltaLat = (moveDistance / EARTH_RADIUS) * (180 / Math.PI);
    const deltaLon =
      (moveDistance /
        (EARTH_RADIUS * Math.cos((prevData.position.lat() * Math.PI) / 180))) *
      (180 / Math.PI);

    const newLatitude = prevData.position.lat() + deltaLat;
    const newLongitude = prevData.position.lng() - deltaLon;

    const newDistance = calculateDistance(
      prevData.position.lat(),
      prevData.position.lng(),
      newLatitude,
      newLongitude
    );

    // 거리 업데이트
    setDistance((prevDistance) => prevDistance + newDistance);
  
    return {
      ...prevData,
      position: new naver.maps.LatLng(newLatitude, newLongitude),
    };
  });
};
/////////////////////////////////////////////////////////

// 시작 함수
const walkStart = () => {
  if (isStopped) {
    // 시작할 때 초기화
    setWalkDate(""); // 산책 날짜 초기화
    setWalkTimeStart(""); // 시작 시간 초기화
    setWalkTimeEnd(""); // 종료 시간 초기화
    setWalkTime("");
    setIsStopped(false);

  }

  if (!isWalking) {
    // 자동 이동 시작
    setDistance(0);
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
    
    
    setWalkTimeStart(getLocalTime());
    setWalkDate(getLocalDate());
    setIsWalking(true);
    setIsPaused(false);

    // 타이머 시작
    timerRef.current = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

  } else if (isPaused) {
    // 일시정지 상태에서 다시 시작
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
    setIsPaused(false);
    timerRef.current = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);
  }
};

// 일시정지 함수
const walkPaused = () => {
  if (isWalking && !isPaused) {
    clearInterval(timerRef.current); // 타이머 멈추기
    clearInterval(autoMoveInterval); // 자동 이동 멈추기
    setIsPaused(true);
  }
};
const walkStop = () => {
  if (isWalking) {
    // 종료 시간 설정
    setWalkTimeEnd(getLocalTime());
    setWalkTime(formatTime(elapsedTime));
    setIsStopped(true);

    // 타이머 종료 및 상태 업데이트
    clearInterval(timerRef.current);
    clearInterval(autoMoveInterval); // 자동 이동 멈추기
    setIsWalking(false);
    setIsPaused(false);

    // 상태 초기화
    setElapsedTime(0); // 경과 시간 초기화
    setWalkDistance(distance.toFixed(2));
    setDistance(0);
  }
};

// 상태 업데이트 후 실행할 함수
useEffect(() => {
  if (!isWalking && isStopped) {
    result();  // 상태가 업데이트된 후 result 함수 실행
  }
}, [isWalking, isStopped]); // isWalking 또는 isStopped가 변경되면 실행됨

const result = () => {
  // 서버로 데이터 보내기 
  axios.post('http://localhost:8181/walk/walkData', {
    walkDate: walkDate,
    walkTimeStart: walkTimeStart,
    walkTimeEnd: walkTimeEnd,
    walkDistance: walkDistance,
    userId: UserProfileData.userId,
    partDogList: partDogList
  })
    .then(response => {
      console.log(response.data); // 서버의 응답
    })
    .catch(error => {
      console.error(error);
    });
};

  useEffect(()=> {
    resultDate();
  },[isStopped]);
  


  // // 위치 이동 함수
  // const moveByDistance = (lat, lon, distance) => {
  //   const earthRadius = 6371000; // 지구 반지름 (미터)

  //   const latRad = (lat * Math.PI) / 180;
  //   const lonRad = (lon * Math.PI) / 180;

  //   const deltaLat = distance / earthRadius;
  //   const deltaLon = distance / (earthRadius * Math.cos(latRad));

  //   const newLat = lat + (deltaLat * 180) / Math.PI;
  //   const newLon = lon + (deltaLon * 180) / Math.PI;

  //   return { newLat, newLon };
  // };

  // // 자동 이동 시작
  // const startAutoMove = () => {
  //   if (autoMoveInterval) {
  //     // 이전 인터벌이 이미 존재하면, 새로 시작하지 않음
  //     return;
  //   }

  //   // 1초마다 10m씩 이동하는 interval 설정
  //   const interval = setInterval(() => {
  //     const { newLat, newLon } = moveByDistance(location.latitude, location.longitude, 100);

  //     // 이동한 거리 계산
  //     const distance = calculateDistance(location.latitude, location.longitude, newLat, newLon);

  //     // 총 이동 거리 업데이트
  //     setTotalDistance((prevDistance) => prevDistance + distance);

  //     // 위치 업데이트
  //     setLocation({ latitude: newLat, longitude: newLon });

  //     // 위치에 맞는 네이버 지도 및 마커 업데이트
  //     setUserProfileData((prevData) => ({
  //       ...prevData,
  //       position: new naver.maps.LatLng(newLat, newLon),
  //     }));
  //     console.log(newLat, newLon);

  //     // 맵과 마커 업데이트
  //     updateMapAndMarker(newLat, newLon);
  //   }, 1000); // 1초마다 100m씩 이동

  //   setAutoMoveInterval(interval); // 인터벌 ID를 상태로 저장
  // };

  // // 자동 이동 멈추기
  // const stopAutoMove = () => {
  //   if (autoMoveInterval) {
  //     clearInterval(autoMoveInterval); // 인터벌 멈추기
  //     setAutoMoveInterval(null); // 상태 초기화
  //   }
  // };


    // 내 위치로 가기
  
  //   const goMyLocation = (e) => {
  //   e.preventDefault();

  //   if (mapRef.current) {
  //     const jeju = new naver.maps.LatLng(location.latitude, location.longitude);
  //     mapRef.current.setCenter(jeju);
  //   } else {
  //     console.error("Map instance is not initialized.");
  //   }
  // };


  const goMyWaklPage = () => {
    navigate(`${PATHS.MAP.WALK}`);
  }

  return (
    <>



     {/* { isWalkStart ? 
      <MapWalkDisplay3 
      isWalking={isWalking}
      isPaused={isPaused}
      walkStart = {walkStart}
      walkPaused = {walkPaused}
      walkStop = {walkStop}
      formatTime = {formatTime} 
      elapsedTime = {elapsedTime}
      distance = {distance}
      setDistance={setDistance}
      />
      :      
        <MapWalkDisplay2
        isDogSelect = {isDogSelect}
        DogList={DogList}
        setDogList={setDogList}
        setIsDogSelect={setIsDogSelect}
        setIsWalkStart={setIsWalkStart}
        /> }

        <MapWalkDisplay 
        distance = {distance}
        elapsedTime = {elapsedTime}
        formatTime = {formatTime}
        /> */}


        {/* 내 위치 바로가기 */}
        {/* <div className='map-my-location'> 
            <button onClick={goMyWaklPage}> (임시) 산책 기록 </button>
        </div> */}
        
          {/* 지도 영역 */}
          <div
            ref={mapContainer}
            className='naver-map'
        ></div>


    </>
  );
}

export default MapAPI3;
