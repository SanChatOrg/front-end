import './ProfilePetList.css';
import { useState } from 'react';

function ProfilePetList({ userName, dogList, onPetSelection }) {
    const [selectedPet, setSelectedPet] = useState(null); // 선택된 펫의 ID를 저장

    const handleSelectPet = (petId) => {
        if (selectedPet === petId) {
            // 이미 선택된 펫을 다시 클릭하면 선택 해제
            setSelectedPet(null);
            if (onPetSelection) onPetSelection(null); // 선택 해제 상태를 상위 컴포넌트로 전달
        } else {
            // 새로운 펫 선택
            setSelectedPet(petId);
            if (onPetSelection) onPetSelection(petId);
        }
    };

    return (
        <div>
            <div className="profile-part2">
                <div className="pet-title">
                    <span>{userName}</span> 님의 반려견
                </div>
                <div className="pet-list">
                    {dogList && dogList.length > 0 &&
                        dogList.map((dog, index) => (
                            <div
                                className={`pet-profile ${
                                    selectedPet === dog.dogNo ? 'selected' : ''
                                }`} // 선택 상태에 따라 클래스 추가
                                key={index}
                                onClick={() => handleSelectPet(dog.dogNo)}
                            >
                                <div className="pet-profile-img">
                                    <img src={dog.photo?.photoUrl} alt="pet" />
                                </div>

                                {dog.dogGender === 'M' ? (
                                    <div className="pet-profile-gender">
                                        <img src="/src/assets/pet-Male.png" alt="male" />
                                    </div>
                                ) : (
                                    <div className="pet-profile-gender">
                                        <img src="/src/assets/pet-Female.png" alt="female" />
                                    </div>
                                )}

                                <div className="pet-profile-name">{dog.dogName}</div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ProfilePetList;
