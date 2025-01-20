import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PATHS } from '../../routes/paths';
import axios from 'axios';
import "./Walk.css"
import { use } from 'react';

function Walk() {

  // 산책 정보 리스트
  const [walkData, setWalkDate] = useState([]);
  const [userId , setUserId] = useState("hyejux");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8181/walk/getWalkList");
        setWalkDate(response.data); 
        console.log(response); 
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); 
  }, []); 
  


  return (
    <div>
      <h1> 이거 산책 기록임 </h1>

      {walkData.map ((data,index) => (
        <ul>
          <li key={index}> {data.walkNo} | {data.walkTimeStart} 
            | {data.walkTimeEnd} | {data.walkDistance} | {data.walkDate} </li>
        </ul>
      ))}
    </div>
  );
}

export default Walk;

