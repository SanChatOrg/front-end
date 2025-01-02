import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PATHS } from '../../routes/paths';
import { useNavigate } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';

import './MapAPI.css';
import ProfileModal from '../../components/User/Profile/ProfileModal';



function MapAPI() {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [name, setName] = useState("");
    const [chatt, setChatt] = useState([]);
    const [chkLog, setChkLog] = useState(false);
    const [socketData, setSocketData] = useState();
    const ws = useRef(null);    //webSocket을 담는 변수, 
                                //컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장
    //webSocket
    //webSocket
      
    // 내 위치 가져오기 (1)
    // useEffect(() => {

    //   navigator.geolocation.watchPosition(
    //     (position) => {
    //       setLocation({latitude:position.coords.latitude , longitude : position.coords.longitude}); // 위도 경도 값
    //     },
    //   );
    //   console.log(location); 

    // }, []); 

    // 내 위치 가져오기 (2)
    useEffect(() => {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("위치 정보 가져오기 실패:", error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 } // 위치 정확도 옵션
      );
    
      return () => {
        navigator.geolocation.clearWatch(watchId); // 컴포넌트 언마운트 시 정리
      };
    }, []);

    // 소켓 로그
    // const msgBox = chatt.map((item, idx) => (
    //     <div key={idx} className={item.name === name ? 'me' : 'other'}>
    //         <span><b>{item.name}</b></span> [ {item.date} ]<br/>
    //         <span>{item.latitude} {item.longitude}</span>
    //     </div>
    // ));

    

    useEffect(() => {

        if(socketData !== undefined) {
            const tempData = chatt.concat(socketData);
            console.log(tempData);
            setChatt(tempData);
        }
    }, [socketData]);

    
    const webSocketLogin = useCallback(() => {
        ws.current = new WebSocket("ws://localhost:8181/tracking");

        ws.current.onmessage = (message) => {
            const dataSet = JSON.parse(message.data);
            setSocketData(dataSet);
            console.log(dataSet, "data set");
        }
    });

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
                name,       // user 아이디 
                date: new Date().toLocaleString(), // 날짜
                latitude : location.latitude, // 위도
                longitude : location.longitude // 경도도
            };  //전송 데이터(JSON)

            const temp = JSON.stringify(data);
            
            if(ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
                ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
                    console.log(ws.current.readyState);
                    console.log("웹소켓 연결 상태");
                    ws.current.send(temp);
      
             
                    setUserProfileData([{
                      image: 'src/assets/img/user/ex_user_profile_02.png',
                      name: myName,
                      info: '입력한 정보가 없습니다.',
                      dogList: [""],
                      walkStatus: true,
                      userId: myName,
                      position: new naver.maps.LatLng(location.latitude, location.longitude), // 초기 값
                  }]);
                }
            }else {
                ws.current.send(temp);
            }
    });

    //webSocket
    //webSocket
    //webSocket
    //webSocket
    //webSocket
    //webSocket


    // // 위치 변화를 감지
    // useEffect(() => {
    //     const watchId = navigator.geolocation.watchPosition(
    //         (position) => {
    //             setLocation({
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude,
    //             });
    //             send(); // 위치가 변경될 때마다 WebSocket 전송
    //         },
    //         (error) => console.error("위치 감지 실패:", error),
    //         { enableHighAccuracy: true }
    //     );

    //     return () => {
    //         navigator.geolocation.clearWatch(watchId);
    //     };
    // }, [send]);
    



    const navigate = useNavigate();

      // 프로필 가기 (네비게이트)
      const goUserProflie = (userId) => { 
        navigate(`${PATHS.USER.PROFILE}`,{state : userId});

      };

      const mapContainer = useRef(null); // 네이버 지도
      const mapRef = useRef(null); // 지도 객체 참조


      // 마커용 데이터 
      // 마커에 찍는 이미지는 따로 원형으로 마커용 이미지를 생성해야할 것 같음.
      const [myName , setMyName] = useState('hyeju');
      const [UserProfileData, setUserProfileData] = useState([{
        image: 'src/assets/img/user/ex_user_profile_02.png',
        name: '',
        info: '입력한 정보가 없습니다.',
        dogList: [""],
        walkStatus: true,
        userId: '',
        position: new naver.maps.LatLng(null, null), // 초기 값
    }]);

      // 마커 데이터 관리 
      useEffect(() => {
        // 새로운 프로필 데이터를 생성하기 위한 기본 데이터 복사
        const updatedData = [...UserProfileData];

        // chatt 데이터를 순회하면서 UserProfileData를 업데이트
        chatt.forEach((chat) => {
            const existingUser = updatedData.find((user) => user.name === chat.name);

            if (existingUser) {
                // 기존 데이터의 위치만 업데이트
                existingUser.position = new naver.maps.LatLng(chat.latitude, chat.longitude);
            } else {
                // 새 데이터를 추가
                updatedData.push({
                    image: 'src/assets/img/user/ex_user_profile_03.png',
                    name: chat.name,
                    info: '입력한 정보가 없습니다.',
                    dogList: [""],
                    walkStatus: true,
                    userId: chat.name,
                    position: new naver.maps.LatLng(chat.latitude, chat.longitude),
                });
            }
        });

        // 상태가 변경되었을 때만 업데이트
        if (JSON.stringify(UserProfileData) !== JSON.stringify(updatedData)) {
            setUserProfileData(updatedData);
        }
    }, [chatt]);

    console.log(UserProfileData , "user 프로필 ");

    // 임시 데이터 
    // const UserProfileData = 
    //   [{  image : 'src/assets/img/user/ex_user_profile_03.png',
    //   name : '마루콩콩콩',
    //   info : ' 마루 멍챗 맞팔 해요 ~',
    //   dogList : ["마루"],
    //   walkStatus : true,
    //   userId : 'maru123',
    //   position : new naver.maps.LatLng(37.5799, 127.200564)},
    //   {image : 'src/assets/img/user/ex_user_profile_04.png',
    //   name : '브라운박사',
    //   info : ' 7 강아지 키우고 있는 브라운 박사 ! 입니다.',
    //   dogList : ["레오", "헥토파스칼", "감자"],
    //   walkStatus : true,
    //   userId : 'backbrown',
    //   position : new naver.maps.LatLng(37.5762414, 127.199533)},
    //   {image : 'src/assets/img/user/ex_user_profile_02.png',
    //   name : '시파주인',
    //   info : '입력한 정보가 없습니다.',
    //   dogList : ["모모"],
    //   walkStatus : true,
    //   userId : 'sibamomo22',
    //   position : new naver.maps.LatLng(location.latitude, location.longitude)}
    //   ]
    // ;


    // 지도 불러오기
   

    // 지도 
    useEffect(() => {
      // 네이버 지도 API가 로드된 후 실행
      const { naver } = window;

      if (naver) {

        // 지도 객체 생성하기
        const mapOptions = {
          center: new naver.maps.LatLng(location.latitude, location.longitude), // 내 위치
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

    }, [location,UserProfileData]);
    

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
   
      {/* <div id="chat-wrap">
            <div id='chatt'>
                <h1 id="title">WebSocket Chatting</h1>
                <br/>
                <div id='talk'>
                    <div className='talk-shadow'></div>
                    {msgBox}
                </div>
               
                <div id='sendZone'>
                     <textarea id='msg' value={msg} onChange={onText}
                        onKeyDown={(ev) => {if(ev.keyCode === 13){send();}}}></textarea>
                 
                </div>
            </div>
        </div>  */}
         <input disabled={chkLog}
                    placeholder='이름을 입력하세요.' 
                    type='text' 
                    id='name' 
                    value={name} 
                    onChange={(event => setName(event.target.value))}/>
      <input type='button' value='산책 시작작' id='btnSend' onClick={send}/>
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
