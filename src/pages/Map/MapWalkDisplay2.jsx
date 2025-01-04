
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './MapWalkDisplay2.css'

function MapWalkDisplay2({ setIsWalkStart  , isDogSelect, setIsDogSelect, DogList, setDogList} ) {


  const handleDogListChange = (e) => {
    if (e.target.value === "선택 안함") {
      setIsDogSelect(true);
    }
    setDogList(e.target.value);
    setIsDogSelect(false);
  }

  // 일단 셀렉트로 테스트하고 1마리 기준으로 작업

  return (
    <>

    <select onChange={handleDogListChange}> 
      <option> 선택 안함 </option>
      <option> 공멍 </option>
      <option> 도레미파솔솔 </option>
    </select>

      <div className='walk-box'> 
        <div className='walk-part-top'> 
          {/* <div className='walk-part-dog-list'> 
            <div className='walk-part-dog-profile' > 
              <img className='walk-part-dog-img' src='src/assets/img/user/ex_user_profile_02.png'/>
              <div className='walk-part-dog-name'> 공멍 </div>
            </div>
            <div className='walk-part-dog-profile'> 
              <img className='walk-part-dog-img' src='src/assets/img/user/ex_user_profile_02.png'/>
              <div className='walk-part-dog-name'> 도레미파솔솔 </div>
            </div>
          </div> */}
        </div>
        <div className='walk-box-bottom'>

          {isDogSelect ? 
            <div className='walk-part-info'> 어떤 강아지와 산책하고 계시나요? </div>
            :
            <div className='walk-part-btn'> <button onClick={() => setIsWalkStart(true)}> 산책 시작하기 </button> </div>
            }

          
        </div>
        
      </div>
    
    </>
  );
}

export default MapWalkDisplay2;
