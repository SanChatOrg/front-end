import React, { useState } from 'react';
import './ProfileTabMenu.css'; // CSS 파일 import

const ProfileTabMenu = ({ onTabSelection, isPhoto, isActivate}) => {
    const handleSelectTab = (tab) => {
        if (onTabSelection) {
            onTabSelection(tab);
        }
    }

    return ( isActivate &&
            <div className="tab-container">
                {/* 탭 메뉴 */}
                <button
                    className={`tab-button ${isPhoto ? 'active' : ''}`}
                    onClick={() => handleSelectTab(true)}
                >
                    사진
                </button>
                <button
                    className={`tab-button ${!isPhoto ? 'active' : ''}`}
                    onClick={() => handleSelectTab(false)}
                >
                    뱃지
                </button>
            </div>
    );
};

export default ProfileTabMenu;