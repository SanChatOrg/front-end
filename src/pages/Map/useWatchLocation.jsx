import { useState, useEffect, useRef } from "react";

const useWatchLocation = (options = {} ) => {
 
    
        const [location, setLocation] = useState({latitude : null , longitude : null}); // 내 위치
        const [error, setError] = useState(); // 에러 메세지
        const locationWatchId = useRef(null); //watchPosition 에서 반환된 ID 저장
    
    
    
        const handleSuccess = (pos) => {
          const {latitude, longitude} = pos.coords;
    
          setLocation({latitude,longitude});
        };
    
        const handleError = (error) => {
          setError(error.message);
        }
    
        const cancelLocationWatch = () => {
          const { geolocation } = navigator;
    
          if(locationWatchId.current && geolocation){
            geolocation.clearWatch(locationWatchId.current);
          }
    
        }
    
        useEffect(() => {
          const { geolocation } = navigator;
    
          if(!geolocation){
            setError("위치를 찾을 수 없습니다");
            return;
          }
    
          locationWatchId.current = geolocation.watchPosition(handleSuccess,handleError,options);
    
          return cancelLocationWatch;
        },[options])
    

    return {location, cancelLocationWatch, error};
};

export default useWatchLocation;