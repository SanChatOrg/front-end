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
    const [name, setName] = useState("brown1234");
    const [chatt, setChatt] = useState([]);
    const [chkLog, setChkLog] = useState(false);
    const [socketData, setSocketData] = useState();
    const ws = useRef(null);    //webSocket을 담는 변수, 

    // 초기 위치 설정 (예시: 서울의 위도, 경도)
    const navigate = useNavigate();

      // 마커용 데이터 
      // 마커에 찍는 이미지는 따로 원형으로 마커용 이미지를 생성해야할 것 같음.
    
    const [UserProfileData, setUserProfileData] = useState([{
      photo: '',
      userName: '',
      userIntro: '입력한 정보가 없습니다.',
      dogList: [""],
      walkStatus: true,
      userId: '',
      position: null, // 초기 위치를 null로 설정
      location: { latitude: null, longitude: null }
    }]);

    const [myProfileData, setMyProfileData] = useState({
      photo: '',
      userName: '',
      userIntro: '입력한 정보가 없습니다.',
      dogList: [""],
      walkStatus: true,
      userId: '',
      position: null, // 초기 위치를 null로 설정
    });

    const [test, setTest] = useState(null);
    
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

            setMyProfileData({
              ...data,
              photo: photoUrl,
              dogList : dogNames
            });
      } catch (error) {
          console.error("Error fetching user data:", error);
      }
  };
  
  const socketList = async () => {
    try {
      const response = await axios.get('http://localhost:8181/user/socketList');
      console.log("소켓 접속 리스트 " , response.data ); // 서버에서 받은 데이터를 콘솔에 출력
      // JSON 데이터를 Map으로 변환
      const userMap = new Map(
        Object.entries(response.data).map(([key, value]) => [
          key,
          {
            ...value,
            position: new naver.maps.LatLng(
              value.latitude,
              value.longitude
            ),
            photo : value.photo.photoUrl,
            dogList: value.dogList ? value.dogList.map(dog => dog.dogName) : [],

          },
        ])
      );

      setTest(userMap); // map 으로 관리 
      
    } catch (error) {
      console.error('Error fetching socket list:', error); // 에러가 있을 경우 콘솔에 출력
    }
  }

    // 첫 데이터 가져오기, 위치 정보 가져오기
    useEffect(() => {

      setData();

      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setMyProfileData((prevData) => ({
            ...prevData,
            position: new naver.maps.LatLng(position.coords.latitude, position.coords.longitude),
            location: {latitude : position.coords.latitude, longitude :position.coords.longitude}
          }));

          console.log(position.coords.latitude, position.coords.longitude);
        
        },
        (error) => {
          console.error("위치 에러 : ", error.message);
        }
      );
      return () => navigator.geolocation.clearWatch(watchId);
      
    }, []);


    // 로그 확인
    useEffect(()=> {
      console.log("myProfileData--------" , myProfileData);
    },[myProfileData])

    useEffect(() => {
      console.log("test--------" , test);
  
    },[test])
    
    // 소켓 로그
      useEffect(() => {
          if(socketData !== undefined) {

              const tempData = chatt.concat(socketData);
              console.log("chatt------" , tempData);
              setChatt(tempData);

          }
      }, [socketData]);
  
      // 소켓 닫기
      const end = useCallback(() => {
     
        const data = {
          name: myProfileData.userId, // 사용자 아이디 (예시)
          date: new Date().toLocaleString(), // 현재 날짜 및 시간

          type: "CLOSE", // 종료 타입
        };
    
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          // 데이터 전송
          ws.current.send(JSON.stringify(data));
          console.log("Close request sent:", data);
    
         
          ws.current.close(); // 소켓 닫기
          setUserProfileData([]); // 마커 초기화 
        }
  
  
      });
  
      //소켓 접속
      const send = useCallback(() => {
          if(!chkLog) {
              // if(name === "") {
              //     alert("이름을 입력하세요.");
              //     document.getElementById("name").focus();
              //     return;
              // }
              webSocketLogin();
              setChkLog(true);
              console.log("웹소켓 연결 중");
          }
              const data = {
                userId: myProfileData.userId, // 사용자 아이디 (예시)
                date: new Date().toLocaleString(), // 현재 날짜 및 시간
                latitude: myProfileData.location.latitude, // 위도
                longitude: myProfileData.location.longitude, // 경도
                dogList: myProfileData.dogList,
                userIntro : myProfileData.userIntro,
                type : 'LOCATION'
              };  //전송 데이터(JSON)
  
              const temp = JSON.stringify(data);
              
              if(ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
                  ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
                      console.log(ws.current.readyState);
                      console.log("웹소켓 연결 상태");
                      ws.current.send(temp);
                      socketList(); // 소켓 접속 리스트 
                  }
                  
              }else {
                  ws.current.send(temp);
              }
      });

   // 주기적으로 위치를 전송하는 타이머 설정
    //   useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         if (
    //             myProfileData.location &&
    //             myProfileData.userId &&
    //             myProfileData.location.latitude &&
    //             myProfileData.location.longitude
    //         ) {
    //             send(); // 위치 공유 함수 호출
    //         }
    //     }, 3000); // 10초 간격으로 실행
    
    //     // 컴포넌트 언마운트 시 타이머 정리
    //     return () => clearInterval(intervalId);
    // });
    
      const webSocketLogin = useCallback(() => {
        ws.current = new WebSocket("ws://localhost:8181/tracking");
  
        ws.current.onmessage = (message) => {
            const dataSet = JSON.parse(message.data);
            setSocketData(dataSet);
            console.log(dataSet, "data set");
        }
      });
  
      //webSocket
      //webSocket
      //webSocket
      //webSocket
      //webSocket
      //webSocket



      // 마커 데이터 관리   
      //   useEffect(() => {

      //    // 새로운 프로필 데이터를 기본값으로 설정
      //    let updatedData = [{
      //     image: '',
      //     name: '',
      //     info: '입력한 정보가 없습니다.',
      //     dogList: [""],
      //     walkStatus: true,
      //     userId: '',
      //     position: new naver.maps.LatLng(null, null)
      //   }];


      //     // chatt 데이터를 순회하면서 UserProfileData를 업데이트
      //     chatt.forEach((chat) => {
      //         const existingUser = updatedData.find((user) => user.name === chat.name);

      //         if (existingUser) {
      //             // 기존 데이터의 위치만 업데이트
      //             existingUser.position = new naver.maps.LatLng(chat.latitude, chat.longitude);
      //         } else {
      //             // 소켓 데이터들 
      //             updatedData.push({
      //                 image: 'src/assets/img/user/ex_user_profile_03.png',
      //                 name: chat.name,
      //                 info: '입력한 정보가 없습니다.',
      //                 dogList: [""],
      //                 walkStatus: true,
      //                 userId: chat.name,
      //                 position: new naver.maps.LatLng(chat.latitude, chat.longitude),
      //             });
      //         }
      //     });

      //     // 상태가 변경되었을 때만 업데이트
      //     if (JSON.stringify(UserProfileData) !== JSON.stringify(updatedData)) {
      //         setUserProfileData(updatedData);
      //     } 

      // }, [test]);

    // map 으로 변환 예정 ------------------ 
    // 지도 불러오기
    
    // useEffect(() => {
    //   if (myProfileData.position) {
    //   // 네이버 지도 API가 로드된 후 실행
    //   const { naver } = window;

    //   if (naver) {
    //     console.log("지도 기본 위치 -------" , myProfileData.position);
    //     // 지도 객체 생성하기
    //     const mapOptions = {
    //       center: myProfileData.position, // 내 위치
    //       zoom: 10,
    //       minZoom: 18,
    //       useStyleMap: false,
    //       mapTypeControl: false,
    //       mapTypeControlOptions: {
    //         style: naver.maps.MapTypeControlStyle.BUTTON,
    //         position: naver.maps.Position.TOP_LEFT,
    //       },
    //       zoomControl: false,
    //       zoomControlOptions: {
    //         position: naver.maps.Position.TOP_RIGHT,
    //       },
    //     };

    //     // 네이버 지도 객체 생성
    //     mapRef.current = new naver.maps.Map(mapContainer.current, mapOptions);        

    //     // // 정보창 컴포넌트 HTML 문자열로 변환
    //     const contentString = [];
    //     const myContentString = ReactDOMServer.renderToString(
    //       <ProfileModal      
    //       image={myProfileData.photo} 
    //       name={myProfileData.userName} 
    //       info={myProfileData.userIntro} 
    //       dogList={myProfileData.dogList}  
    //       walkStatus={myProfileData.walkStatus}
    //       goToProfile={goUserProflie}
    //     />
         
    //     );


    //     // // 정보창 생성
    //     const infowindow = [];
    //     const myInfowindow = new naver.maps.InfoWindow({
    //       content: myContentString,
    //       anchorSize: new naver.maps.Size(15, 5),
    //       pixelOffset: new naver.maps.Point(0, -10),
    //     });

    //     // // 마커 옵션
    //     const markerOptions = [];
    //     const myMarkerOptions = {
    //       position: myProfileData.position.destinationPoint(0, 0), // 90도 방향으로 15m 떨어진 위치
    //       map: mapRef.current,
    //       icon: {
    //         url: myProfileData.photo,
    //         size: new naver.maps.Size(50, 50),
    //         origin: new naver.maps.Point(50, 50),
    //         anchor: new naver.maps.Point(25, 26),
    //       }
    //     };
    //     // 


    //     // // 마커 배열
    //     const marker = [];
    //     const myMarker = new naver.maps.Marker(myMarkerOptions);


    //     naver.maps.Event.addListener(myMarker, "click", () => {
    //       if (myInfowindow.getMap()) {
    //         myInfowindow.close();
    //       } else {
    //         myInfowindow.open(mapRef.current, myMarker); // 정보창 열기
    //         const profileButton = document.querySelector('.click-btn'); 
    //         if (profileButton) {
    //           profileButton.addEventListener('click', () => {  // 프로필 가기 이벤트
    //             goUserProflie(myProfileData.userId);
    //           });
    //         }
    //       }
    //     });

    //     for(let n = 0 ; n < UserProfileData.length; n++){

    //       // 마커 옵션 만들기
    //       markerOptions[n] = {
    //         position: UserProfileData[n].position.destinationPoint(0, 0), // 90도 방향으로 15m 떨어진 위치
    //         map: mapRef.current,
    //         icon: {
    //           url: `/image${n}.png`,
    //           size: new naver.maps.Size(100, 100),
    //           origin: new naver.maps.Point(0, 0),
    //           // anchor: new naver.maps.Point(25, 26),
    //         },
    //       };

    //       // 마커 추가하기
    //       marker[n] =  new naver.maps.Marker(markerOptions[n]);
      

    //       // info 데이터 
    //       contentString[n] = ReactDOMServer.renderToString(      
    //         <ProfileModal      
    //           image={UserProfileData[n].image} 
    //           name={UserProfileData[n].name} 
    //           info={UserProfileData[n].info} 
    //           dogList={UserProfileData[n].dogList}  
    //           walkStatus={UserProfileData[n].walkStatus}
    //           goToProfile={goUserProflie}
    //         />      
    //       );

          
    //       // info 맵에 추가 
    //      infowindow[n] = new naver.maps.InfoWindow({
    //       content: contentString[n],
    //       anchorSize: new naver.maps.Size(15, 5),
    //       pixelOffset: new naver.maps.Point(0, -10),
    //     });


    //      // 마커 클릭 시 정보창 열기 이벤트
    //     naver.maps.Event.addListener(marker[n], "click", () => {
    //       if (infowindow[n].getMap()) {
    //         infowindow[n].close();
    //       } else {
    //         infowindow[n].open(mapRef.current, marker[n]); // 정보창 열기
    //         const profileButton = document.querySelector('.click-btn'); 
    //         if (profileButton) {
    //           profileButton.addEventListener('click', () => {  // 프로필 가기 이벤트
    //             goUserProflie(UserProfileData[n].userId);
    //           });
    //         }
    //       }
    //     });


    //     }
   
    //     // // 정보창 처음에 열기
    //     // infowindow.open(mapRef.current, marker);
    //   }
    // }
    // }, [UserProfileData, myProfileData]);
  
    // useEffect(() => {
    //   if (myProfileData.position) {
    //     // 네이버 지도 API가 로드된 후 실행
    //     const { naver } = window;
    
    //     if (naver) {
    //       console.log("지도 기본 위치 -------", myProfileData.position);
    //       // 지도 객체 생성하기
    //       const mapOptions = {
    //         center: myProfileData.position, // 내 위치
    //         zoom: 10,
    //         minZoom: 18,
    //         useStyleMap: false,
    //         mapTypeControl: false,
    //         mapTypeControlOptions: {
    //           style: naver.maps.MapTypeControlStyle.BUTTON,
    //           position: naver.maps.Position.TOP_LEFT,
    //         },
    //         zoomControl: false,
    //         zoomControlOptions: {
    //           position: naver.maps.Position.TOP_RIGHT,
    //         },
    //       };
    
    //       // 네이버 지도 객체 생성
    //       mapRef.current = new naver.maps.Map(mapContainer.current, mapOptions);
    
    //       // 정보창 생성
    //       const contentString = [];
    //       const myContentString = ReactDOMServer.renderToString(
    //         <ProfileModal
    //           image={myProfileData.photo}
    //           name={myProfileData.userName}
    //           info={myProfileData.userIntro}
    //           dogList={myProfileData.dogList}
    //           walkStatus={myProfileData.walkStatus}
    //           goToProfile={goUserProflie}
    //         />
    //       );
    
    //       // 정보창 객체 생성
    //       const infowindow = [];
    //       const myInfowindow = new naver.maps.InfoWindow({
    //         content: myContentString,
    //         anchorSize: new naver.maps.Size(15, 5),
    //         pixelOffset: new naver.maps.Point(0, -10),
    //       });
    
    //       // 마커 옵션
    //       const markerOptions = [];
    //       const myMarkerOptions = {
    //         position: myProfileData.position.destinationPoint(0, 0), // 90도 방향으로 15m 떨어진 위치
    //         map: mapRef.current,
    //         icon: {
    //           url: myProfileData.photo,
    //           size: new naver.maps.Size(50, 50),
    //           origin: new naver.maps.Point(50, 50),
    //           anchor: new naver.maps.Point(25, 26),
    //         },
    //       };
    
    //       // 마커 생성
    //       const myMarker = new naver.maps.Marker(myMarkerOptions);
    
    //       // 마커 클릭 이벤트
    //       naver.maps.Event.addListener(myMarker, "click", () => {
    //         if (myInfowindow.getMap()) {
    //           myInfowindow.close();
    //         } else {
    //           myInfowindow.open(mapRef.current, myMarker); // 정보창 열기
    //           const profileButton = document.querySelector('.click-btn');
    //           if (profileButton) {
    //             profileButton.addEventListener('click', () => {
    //               goUserProflie(myProfileData.userId);
    //             });
    //           }
    //         }
    //       });
    
    //     }
    //   }
    // }, [myProfileData]);
    


    // 
    useEffect(() => {
      if (myProfileData.position) {
        // 네이버 지도 API가 로드된 후 실행
        const { naver } = window;
    
        if (naver) {
          console.log("지도 기본 위치 -------", myProfileData.position);
          // 지도 객체 생성하기
          const mapOptions = {
            center: myProfileData.position, // 내 위치
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
    
          // 정보창 생성
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
    
          // 정보창 객체 생성
          const infowindow = [];
          const myInfowindow = new naver.maps.InfoWindow({
            content: myContentString,
            anchorSize: new naver.maps.Size(15, 5),
            pixelOffset: new naver.maps.Point(0, -10),
          });
    
          // 마커 옵션
          const markerOptions = [];
          const myMarkerOptions = {
            position: myProfileData.position.destinationPoint(0, 0), // 90도 방향으로 15m 떨어진 위치
            map: mapRef.current,
            icon: {
              url: myProfileData.photo,
              size: new naver.maps.Size(50, 50),
              origin: new naver.maps.Point(50, 50),
              anchor: new naver.maps.Point(25, 26),
            },
          };
    
          // 마커 생성
          const myMarker = new naver.maps.Marker(myMarkerOptions);
    
          // 마커 클릭 이벤트
          naver.maps.Event.addListener(myMarker, "click", () => {
            if (myInfowindow.getMap()) {
              myInfowindow.close();
            } else {
              myInfowindow.open(mapRef.current, myMarker); // 정보창 열기
              const profileButton = document.querySelector('.click-btn');
              if (profileButton) {
                profileButton.addEventListener('click', () => {
                  goUserProflie(myProfileData.userId);
                });
              }
            }
          });
    


          if (test) {
            console.log('zz');
            test.forEach((value, key) => {
            console.log(value ,value.latitude, value.longitude);
            

            // 왜 안됨 ?? 마커  
            const markerOption = {
              position: value.position, // 위치 설정
              map: mapRef.current,
              icon: {
                url: `/image1.png`, // URL 동적으로 처리
                size: new naver.maps.Size(100, 100),
                origin: new naver.maps.Point(0, 0),
                // anchor: new naver.maps.Point(50, 50), // 위치 조정
              },
              
            };
  
            // 마커 추가하기
            const marker = new naver.maps.Marker(markerOption);
        
            
              
              // 정보창 생성
              const contentString = ReactDOMServer.renderToString(
                <ProfileModal
                  image={value.photoUrl}
                  name={value.userId}
                  info={value.userIntro}
                  dogList={value.dogList}
                  walkStatus={value.walkStatus}
                  goToProfile={goUserProflie}
                />
              );
            
              // 정보창 맵에 추가
              const infowindow = new naver.maps.InfoWindow({
                content: contentString,
                anchorSize: new naver.maps.Size(15, 5),
                pixelOffset: new naver.maps.Point(0, -10),
              });
            
              // 마커 클릭 시 정보창 열기 이벤트
              naver.maps.Event.addListener(marker, 'click', () => {
                if (infowindow.getMap()) {
                  infowindow.close();
                } else {
                  infowindow.open(mapRef.current, marker); // 정보창 열기
                  const profileButton = document.querySelector('.click-btn');
                  if (profileButton) {
                    profileButton.addEventListener('click', () => {
                      goUserProflie(value.userId);
                    });
                  }
                }
              });
              
             });
          }
        
          
        }
      }
    }, [user, myProfileData]);


  return (
    <>
      <div className='map-box'>
      <input type='button' value='산책 시작' id='btnSend' onClick={send}/>
      <input type='button' value='산책 종료' id='end' onClick={end}/>
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
