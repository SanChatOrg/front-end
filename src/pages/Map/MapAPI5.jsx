import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PATHS } from '../../routes/paths';
import { useNavigate } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import axios from "axios";
import './MapAPI.css';
import ProfileModal from '../User/Profile/ProfileModal';
import MapWalkDisplay from './MapWalkDisplay';

function MapAPI4() {
  
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [name, setName] = useState("minjun85");
    const [chatt, setChatt] = useState([]);
    const [chkLog, setChkLog] = useState(false);
    const [socketData, setSocketData] = useState();
    const ws = useRef(null);    //webSocket을 담는 변수, 

    // 초기 위치 설정 (예시: 서울의 위도, 경도)
    const navigate = useNavigate();

      // 마커용 데이터 
      // 마커에 찍는 이미지는 따로 원형으로 마커용 이미지를 생성해야할 것 같음.
    
      const imageUrls = [
        // "https://res.cloudinary.com/dtzx9nu3d/image/upload/v1738946069/anime_dog_zdvth5.gif",
        "https://res.cloudinary.com/dtzx9nu3d/image/upload/c_scale,h_136,w_110/nix7m9qwlrazec2kchrm",
        "https://res.cloudinary.com/dtzx9nu3d/image/upload/c_scale,h_90,w_110/v1738947115/zzc0jfsixh3at396xz2y.gif"
      ];
      

    const [UserProfileData, setUserProfileData] = useState([
  ]);

    const [myProfileData, setMyProfileData] = useState({
      photo: '',
      userName: '',
      userIntro: '입력한 정보가 없습니다.',
      dogList: [""],
      walkStatus: true,
      userId: '',
      location: { latitude: 37.551104, longitude: 127.162040 }, // 초기 위치를 null로 설정
      position: null
    });

    const [test, setTest] = useState(null);
    const [userList, setUserList] = useState();
    // 프로필 이동 (네비게이트)
    const goUserProflie = (userId) => { 
      navigate(`${PATHS.USER.PROFILE}/${userId}`, { state: userId });
    };
    
    const mapContainer = useRef(null); // 네이버 지도 컨테이너 참조
    const mapRef = useRef(null); // 지도 객체 참조
  
    const setData = async () => {
      try {
          let {data} = await axios.get('http://localhost:8181/user/getUser?userId=' + name);
          // console.log(data);
           // dogList에서 dogName만 추출하여 새로운 배열로 업데이트
            const dogNames = data.dogList.map(dog => dog.dogName); 
            const photoUrl = data.photo.photoUrl;
            setMyProfileData(prevData => ({
              ...prevData, // 기존 데이터 유지
              ...data, // 새로운 데이터 병합
              photo: photoUrl,
              dogList: dogNames
          }));
      } catch (error) {
          console.error("Error fetching user data:", error);
      }
  };




  
    // 첫 데이터 가져오기, 위치 정보 가져오기
    useEffect(() => {

      setData();
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          if (!position || !position.coords) {
            console.warn("위치 정보를 가져올 수 없습니다.");
            return; // 값이 없으면 함수 종료
          }
      
          const { latitude, longitude } = position.coords;
      
          // 위치가 정상적으로 전달되었을 때만 상태 업데이트
          setMyProfileData((prevData) => ({
            ...prevData, // prevData는 기본값 사용
            position: new naver.maps.LatLng(latitude, longitude), // 위치 객체 생성 (네이버 지도 사용 시)
            location: { latitude, longitude }, // 위치 정보 업데이트
          }));
      
          console.log("위도:", latitude, "경도:", longitude); // 디버깅 로그
        },
        (error) => {
          console.error("위치 정보를 가져오는 데 실패했습니다:", error);
        }
      );
      
      
      return () => navigator.geolocation.clearWatch(watchId);
      
    }, []);


    // 로그 확인
    useEffect(()=> {
      // console.log("myProfileData--------" , myProfileData);
      console.log("UserProfileData--------" , UserProfileData);
      console.log(userList);
    },[ UserProfileData, userList])


  
  


  
      // 소켓 닫기
      const end = useCallback(() => {
     
        const data = {
          userId: myProfileData.userId, // 사용자 아이디 (예시)
          date: new Date().toLocaleString(), // 현재 날짜 및 시간
          type: "CLOSE", // 종료 타입
        };
    
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          // 데이터 전송
          ws.current.send(JSON.stringify(data));
          console.log("Close request sent:", data);
          alert("산책이 종료되었습니다.");
    
         
          ws.current.close(); // 소켓 닫기
          setUserProfileData([]); // 마커 초기화 
        }
  
  
      });



      //소켓 접속
      const send = useCallback(() => {
          if(!chkLog) {1
              webSocketLogin();
              setChkLog(true);
              console.log("웹소켓 연결 중");
          }
              const data = {
                userId: myProfileData.userId, // 사용자 아이디 (예시)
                date: new Date().toLocaleString(), // 현재 날짜 및 시간
                latitude: myProfileData.location.latitude, // 위도
                longitude: myProfileData.location.longitude,
                type : 'LOCATION'
              };  //전송 데이터(JSON)
  
              const temp = JSON.stringify(data);
              
              if(ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
                  ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
                      console.log(ws.current.readyState);
                      console.log("웹소켓 연결 상태");
                      alert("산책이 시작되었습니다.");
                      ws.current.send(temp);
                      // socketList(); // 소켓 접속 리스트 
                   
                  }
                  
              }else {
                  ws.current.send(temp);
              }
      });

      const webSocketLogin = useCallback(() => {
        ws.current = new WebSocket("ws://localhost:8181/tracking");
    
        ws.current.onmessage = (message) => {
            const dataSet = JSON.parse(message.data);
            console.log(dataSet, "data set");
    
            setSocketData(dataSet); // 기존 setSocketData 유지
    
            if (dataSet.type === "USER_LIST" || dataSet.type === "LOCATION") {
                updateUserProfileData(dataSet); // 위치 업데이트를 담당하는 별도의 함수 호출
            }
        };
        
    }, []);
    
    const updateUserProfileData = (dataSet) => {
      console.log("-1 >>>>>>>>>>> ");
  
      setUserProfileData(prevData => {
          let updatedData = prevData.filter(user => user.userId !== ''); // userId가 비어있지 않은 사용자만 유지
          console.log("0 >>>>>>>>>>> ", updatedData);
  
          if (dataSet.type === "USER_LIST" && Array.isArray(dataSet.users)) {
            // USER_LIST 타입이면 기존 데이터를 무시하고 새 배열을 그대로 사용
            return [...dataSet.users];
            
          
          } else if (dataSet.type === "LOCATION") {
              // LOCATION 타입: 개별 값 처리
              const existingUser = updatedData.find(user => user.userId === dataSet.userId);
  
              if (existingUser) {
                  // 기존 유저 위치 업데이트
                  existingUser.position = new naver.maps.LatLng(dataSet.latitude, dataSet.longitude);
                  existingUser.location = { latitude: dataSet.latitude, longitude: dataSet.longitude };
              } else {
                  // 새로운 유저 추가
                  updatedData.push({
                      photo: dataSet.photo || '',
                      userName: dataSet.userName || '',
                      userIntro: dataSet.userIntro || '입력한 정보가 없습니다.',
                      dogList: dataSet.dogList?.length ? dataSet.dogList : [""],
                      walkStatus: dataSet.walkStatus ?? true,
                      userId: dataSet.userId || '',
                      position: new naver.maps.LatLng(dataSet.latitude, dataSet.longitude),
                      latitude: dataSet.latitude, 
                      longitude: dataSet.longitude 
                  });
              }
          }
  
          // 새로운 배열로 반환 (불변성 유지)
          return [...updatedData];
      });
  };
  
    
    
    
  
      //webSocket
      //webSocket
      //webSocket
      //webSocket
      //webSocket
      //webSocket

      

    // map 으로 변환 예정 ------------------ 
    // 지도 불러오기
    
    useEffect(() => {
      if (myProfileData.position) {
      // 네이버 지도 API가 로드된 후 실행
      const { naver } = window;

      if (naver) {
        console.log("지도 기본 위치 -------" , myProfileData.location);
        // 지도 객체 생성하기
        const mapOptions = {
          center: new naver.maps.LatLng(myProfileData.location?.latitude || 37.5665, myProfileData. location?.longitude || 126.9780), // 내 위치
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

        // 네이버 지도 객체 생성
        mapRef.current = new naver.maps.Map(mapContainer.current, mapOptions);        

        // // 정보창 컴포넌트 HTML 문자열로 변환
        const contentString = [];
        const myContentString = ReactDOMServer.renderToString(
          <ProfileModal      
          image={myProfileData.photo} 
          name={myProfileData.userName} 
          info={myProfileData.userIntro} 
          dogList={myProfileData.dogList}  
          walkStatus={myProfileData.walkStatus}
          goToProfile={goUserProflie}
        />
         
        );


        // // 정보창 생성
        const infowindow = [];
        const myInfowindow = new naver.maps.InfoWindow({
          content: myContentString,
          anchorSize: new naver.maps.Size(15, 5),
          pixelOffset: new naver.maps.Point(0, -10),
        });


        // // 마커 옵션
        const markerOptions = [];
        const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
        const myMarkerOptions = {
          position: new naver.maps.LatLng(myProfileData.location?.latitude || 37.5665, myProfileData. location?.longitude || 126.9780), // 내 위치
          map: mapRef.current,
          icon: {
            url: 'https://res.cloudinary.com/dtzx9nu3d/image/upload/v1738946069/anime_dog_zdvth5.gif',
            size: new naver.maps.Size(150, 150),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(75, 75), // 이미지값 /2
          }
        };
        // 


        // // 마커 배열
        const marker = [];
        const myMarker = new naver.maps.Marker(myMarkerOptions);


        naver.maps.Event.addListener(myMarker, "click", () => {
          if (myInfowindow.getMap()) {
            myInfowindow.close();
          } else {
            myInfowindow.open(mapRef.current, myMarker); // 정보창 열기
            const profileButton = document.querySelector('.click-btn'); 
            if (profileButton) {
              profileButton.addEventListener('click', () => {  // 프로필 가기 이벤트
                goUserProflie(myProfileData.userId);
              });
            }
          }
        });

       

        if (Array.isArray(UserProfileData) && UserProfileData.length > 0) {

          for(let n = 0 ; n < UserProfileData.length; n++){
  
            console.log(UserProfileData[n] , "자 들어갑니다다");
            const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
            
            // 마커 옵션 만들기
            markerOptions[n] = {
              position: new naver.maps.LatLng(UserProfileData[n].latitude, UserProfileData[n].longitude), // 90도 방향으로 15m 떨어진 위치
              map: mapRef.current,
              icon: {
                url: randomImage,
                size: new naver.maps.Size(150, 150),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(75, 75), // 이미지값 /2
              },
            };
  
            // 마커 추가하기
            marker[n] =  new naver.maps.Marker(markerOptions[n]);
        
  
            // info 데이터 
            contentString[n] = ReactDOMServer.renderToString(      
              <ProfileModal      
                image={UserProfileData[n].photo} 
                name={UserProfileData[n].userName} 
                info={UserProfileData[n].userIntro} 
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
        }
   
        // // 정보창 처음에 열기
        // infowindow.open(mapRef.current, marker);
      }
    }
    }, [UserProfileData, myProfileData]);
    
    // 내 위치로 가기
    const goMyLocation = (e) => {
      e.preventDefault();
  
      if (mapRef.current) {
        const jeju = new naver.maps.LatLng(myProfileData.location.latitude, myProfileData.location.longitude);
        mapRef.current.setCenter(jeju);
      } else {
        console.error("Map instance is not initialized.");
      }
    };
    
  

  return (
    <>
      <div className='map-box'>
  

              {/* 내 위치 바로가기 */}
              <div className='map-my-location'> 
                  <button onClick={goMyLocation}> 📍 </button>
              </div>

              {/* 보이기 버튼 */}
              <div className='map-view-mode'> 
                  {/* <button onClick={goUserProflie}> 👁️ </button> */}
              </div>

              <div className='walk-box'>
                <input type='button' value='산책 시작' id='btnSend' onClick={send}/>
                <input type='button' value='산책 종료' id='end' onClick={end}/>
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

export default MapAPI4;
