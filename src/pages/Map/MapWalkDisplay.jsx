import React, { useEffect, useRef } from 'react';
import './MapWalkDisplay.css';

function MapWalkDisplay({ distance, elapsedTime, formatTime}) {

  return (
    <>
      {/* 산책 정보 표시 */}
      <div className="map-walk-display">
        <div className="map-walk-display-distance">
          <div> 거리 </div>
          <div> {distance.toFixed(2)} <span>m</span> </div>
        </div>
        <div className="map-walk-display-time">
          <div> 산책 시간 </div>
          <div> {formatTime(elapsedTime)} </div>
        </div>
      </div>
    </>
  );
}

export default MapWalkDisplay;
