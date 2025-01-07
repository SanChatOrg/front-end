import './ProfileMain.css';
import {useLocation} from 'react-router-dom';
import ProfileHeader from '../../../components/User/Profile/ProfileHeader';
import ProfileImageList from '../../../components/User/Profile/ProfileImageList';
import ProfilePetList from '../../../components/User/Profile/ProfilePetList';
import axios from "axios";
import {useEffect, useState} from "react";
import ProfileTabMenu from "../../../components/User/Profile/ProfileTabMenu.jsx";

function ProfileMain() {
    const [userProfileData, setUserProfileData] = useState({});
    const [selectedPet, setSelectedPet] = useState(111); // 선택된 pet
    const [imageList, setImageList] = useState([]); // pet Image list
    const [badgeList, setBadgeList] = useState([]);
    const [dogList, setDogList] = useState([]);
    const [isPhoto, setIsPhoto] = useState(true);

    // 클릭한 userId 값 받아오기
    const {state} = useLocation();
    console.log(state);

    // 조회 하기
    const setData = async () => {
        try {
            let {data} = await axios.get('http://localhost:8181/user/getUser?userNo=' + 1);
            console.log(data);
            setUserProfileData(data);
            setDogList(data.dogList);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        if (dogList.length === 1) setSelectedPet(dogList[0].dogNo);
    }, [dogList]);

    useEffect(() => {
        setData();
    }, []);

    // pet 선택 함수
    const handlePetSelection = (pet) => {
        setSelectedPet(pet === selectedPet ? '' : pet);
    };

    const handleTabSelection = (tab) => {
        setIsPhoto(tab);
    }

    const checkIsMyPet = () => {
        return selectedPet !== '' && dogList.map(dog => dog.dogNo).indexOf(selectedPet) >= 0;
    }

    // pet image list 조회 함수
    const getImageList = async () => {
        let {data} = await axios.get('http://localhost:8181/photo/getImageList?type='
            + (
                checkIsMyPet()
                    ? 'dog&id=' + selectedPet : 'user&id=' + userProfileData.userNo));
        setImageList(data);
        console.log(data);
    }



    const getBadgeList = async () => {
        let {data} = await axios.get('http://localhost:8181/badge/getBadgeList?type='
            + (
                checkIsMyPet()
                    ? 'dog&id=' + selectedPet : 'user&id=' + userProfileData.userNo));
        setBadgeList(data);
        console.log(data);
    }

    useEffect(() => {
        console.log(selectedPet);
        if (userProfileData.userNo === undefined) return;
        getImageList();
        // getBadgeList();
    }, [userProfileData, selectedPet]);

    // 조회해왔다고 치고..

    const UserProfileData = {
        image: '/src/assets/img/user/ex_user_profile_02.png',
        name: '마루콩콩콩',
        info: ' 마루 멍챗 맞팔 해요 ~',
        dogList: ["마루", "콩콩"],
        walkStatus: true,
        userId: 'maru123',
        position: new naver.maps.LatLng(37.5799, 127.200564),
        imageList: ['/src/assets/profile-image-001.png', '/src/assets/profile-image-002.png', '/src/assets/profile-image-003.png']
    };


    function handleCreateUserTest() {
        let userDTO = {
            userNo: '',
            userBirth: '2000-01-01',
            userName: 'test',
            userId: 'test',
            userPw: 'test',
            createdAt: '',
            updatedAt: '',
            userIntro: 'test'
        };

        // let {data} = axios.post('http://localhost:8181/user/createUser', userDTO);
        // console.log(data);
    }

    return (

        <div>
            <ProfileHeader
                userId={userProfileData.userId || ''}
                userName={userProfileData.userName || ''}
                userInfo={userProfileData.userIntro || ''}
                userImage={userProfileData.photo || '#'}
            />
            <ProfilePetList
                userName={userProfileData.userName || ''}
                dogList={dogList || []}
                onPetSelection={handlePetSelection}
            />
            <ProfileTabMenu onTabSelection={handleTabSelection} isPhoto={isPhoto} isActivate={checkIsMyPet()} />
            <ProfileImageList
                imageList={isPhoto ? imageList : badgeList || ['/src/assets/profile-image-001.png', '/src/assets/profile-image-002.png', '/src/assets/profile-image-003.png']}
            />


        </div>);
}

export default ProfileMain;