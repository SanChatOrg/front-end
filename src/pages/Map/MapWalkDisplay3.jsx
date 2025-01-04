
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './MapWalkDisplay3.css'

function MapWalkDisplay3({isWalking, isPaused, walkStart,walkPaused,walkStop,formatTime, elapsedTime }) {

  // 버튼 보이는 거는 나중에 컨트롤

  

  return (
    <>
    <div>
      <h1>산책 시간 측정</h1>
      <p>경과 시간: {formatTime(elapsedTime)}</p>
      <button onClick={walkStart}>
        {isWalking && !isPaused ? "계속" : "시작"}
      </button>
      <button onClick={walkPaused} disabled={!isWalking || isPaused}>
        일시정지
      </button>
      <button onClick={walkStop} disabled={!isWalking}>
        종료
      </button>
    </div>


      <div className='walk-start-box'> 
  
      </div>
    
    </>
  );
}

export default MapWalkDisplay3;
