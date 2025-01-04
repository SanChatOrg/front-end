import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PATHS } from '../../routes/paths';
import { useNavigate } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import './MapWalkDisplay2.css'
import './MapAPI.css';
import ProfileModal from '../../components/User/Profile/ProfileModal';
import MapWalkDisplay from './MapWalkDisplay';
import MapWalkDisplay2 from './MapWalkDisplay2';
import MapWalkDisplay3 from './MapWalkDisplay3';



function MapAPI3() {


  // 자식 컴포넌트에서 사용 됨됨

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
  const [UserProfileData, setUserProfileData] = useState([{
        image: 'src/assets/img/user/ex_user_profile_02.png',
        name: '',
        info: '입력한 정보가 없습니다.',
        dogList: [""],
        walkStatus: true,
        userId: '',
        // position: new naver.maps.LatLng(0, 0),
    }]);


  // 산책 종료 후 최종 기록 데이터import MapWalkDisplay from './MapWalkDisplay';
  const [partDogList, setPartDogList] = useState([]); // 참여한 강아지
  const [walkDate , setWalkDate] = useState(); // 산책 참여 일자 
  const [walkTimeStart, setWalkTimeStart] = useState(); // 산책 시작 시간
  const [walkTimeEnd, setWalkTimeEnd] = useState(); // 산책 종료 시간 
  const [walkTime, setWalkTime] = useState();
  const [walkDistance, setWalkDistance] = useState(); // 산책 거리
  // 산책 시작함 
  const [isWalkStart, setIsWalkStart] = useState(false);



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


  // // 시작, 일시정지 , 종료  함수
  // const walkStart = () => { // 시작 함수 

  // }

  // const walkStop = () => { // 종료 함수

  // }

  // const walkPaused = () => { // 일시정지 함수수

  // }

  const [isWalking, setIsWalking] = useState(false); // 산책 상태
  const [isPaused, setIsPaused] = useState(false); // 일시정지 상태

  const [isStopped, setIsStopped] = useState(false);

  const [elapsedTime, setElapsedTime] = useState(0); // 경과 시간 (초 단위)
  const timerRef = useRef(null); // 타이머 ID 저장


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
  


  const resultDate = () => {
    console.log("최종 데이터 입니다 ---------------------");
    console.log(walkDate, walkTimeStart, walkTimeEnd);
    console.log(walkTime , "최종 산책시간");
    console.log("-------------------------------------");
  }

  // 시작 함수
  const walkStart = () => {
    if (isStopped){
     // 시작할때 초기화 해도 될듯 ㅇㅇ
     setWalkDate(""); // 산책 날짜 초기화
     setWalkTimeStart(""); // 시작 시간 초기화
     setWalkTimeEnd(""); // 종료 시간 초기화
     setWalkTime("");
     setIsStopped(false);
    }

    if (!isWalking) {
      setWalkTimeStart(getLocalTime());
      setWalkDate(getLocalDate());
      setIsWalking(true);
      setIsPaused(false);

      timerRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (isPaused) {
      // 일시정지 상태에서 다시 시작
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  // 일시정지 함수
  const walkPaused = () => {
    if (isWalking && !isPaused) {
      clearInterval(timerRef.current);
      setIsPaused(true);
    }
  };

  // 종료 함수
  const walkStop = () => {
    if (isWalking) {
      // 종료 시간 설정
      setWalkTimeEnd(getLocalTime());
      setWalkTime(formatTime(elapsedTime));
      setIsStopped(true);

      // 타이머 종료 및 상태 업데이트
      clearInterval(timerRef.current);
      setIsWalking(false);
      setIsPaused(false);

        // 상태 초기화
      setElapsedTime(0); // 경과 시간 초기화
    }
  };
   

  useEffect(()=> {
    resultDate();
  },[isStopped]);
  

  return (
    <>
     { isWalkStart ? 
      <MapWalkDisplay3 
      isWalking={isWalking}
      isPaused={isPaused}
      walkStart = {walkStart}
      walkPaused = {walkPaused}
      walkStop = {walkStop}
      formatTime = {formatTime} 
      elapsedTime = {elapsedTime}
      />
      :      
        <MapWalkDisplay2
        isDogSelect = {isDogSelect}
        DogList={DogList}
        setDogList={setDogList}
        setIsDogSelect={setIsDogSelect}
        setIsWalkStart={setIsWalkStart}
        /> }

      


    </>
  );
}

export default MapAPI3;
