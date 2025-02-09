import React from "react";
import styles from "./ProfileModal.module.css";  // CSS 모듈


function ProfileModal({ image, name, info, dogList, walkStatus, goUserProflie }) {

  return (
    <div>
      {/* 프로필 모달 */}
      <div className={styles.ProfileModal}>
        {/* 왼쪽 섹션 */}
        <div className={styles.ProfileModalLeft}>
          <div className={styles.ProfileModalImg}> <img src={image} alt="user-profile" /> </div>
        
          <div className={styles.ProfileModalFollow} >
            <button className='click-btn'> 프로필 보기</button>
          </div>
        </div>

        {/* 오른쪽 섹션 */}
        <div className={styles.ProfileModalRight}>
          <div className={styles.ProfileModalRightTop}>
            <div className={styles.ProfileModalName}>{name}</div>
            <div className={styles.ProfileModalIntro}>{info}</div>
          </div>

          {/* 하단 섹션 */}
          <div className={styles.ProfileModalRightBottom} >
            <div className={styles.ProfileModalDogList}>
              {/* 강아지 목록 */}
              {dogList?.map((dog, index) => (
                  <div key={index}>{dog}</div>
                ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
