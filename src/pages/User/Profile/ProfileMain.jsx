import './ProfileMain.css';
import {useLocation} from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileImageList from './ProfileImageList';
import ProfilePetList from './ProfilePetList';
import ProfileFollow from './ProfileFollow';
import ProfileFollowList from './ProfileFollowList';
import ProfilePetInfo from './ProfilePetInfo';
import axios from "axios";
import {useEffect, useState} from "react";

function ProfileMain() {
    const [userProfileData, setUserProfileData] = useState({});
    const [selectedPet, setSelectedPet] = useState(111); // 선택된 pet
    const [imageList, setImageList] = useState([]); // pet list
    const [dogList, setDogList] = useState([]);
    const [followList, setfollowList] = useState([]);
    const [followerList, setfollowerList] = useState([]);
    
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

    const setFollowList = async () => {
        try {
            let {data} = await axios.get('http://localhost:8181/follow/getFollowList?userNo=' + 1);
            console.log("팔로우리스트" , data);
            setfollowList(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const setFollowerList = async () => {
        try {
            let {data} = await axios.get('http://localhost:8181/follow/getFollowerList?userNo=' + 1);
            console.log("팔로워리스트" , data);
            setfollowerList(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };


    useEffect(() => {
        setData();
      
    }, []);

    // pet 선택 함수
    const handlePetSelection = (pet) => {
        setSelectedPet(pet === selectedPet ? '' : pet);
    };

    // pet image list 조회 함수
    const getImageList = async () => {
        let {data} = await axios.get('http://localhost:8181/photo/getImageList?type='
            + (
                selectedPet !== '' && dogList.map(dog => dog.dogNo).indexOf(selectedPet) >= 0
                    ? 'dog&id=' + selectedPet : 'user&id=' + userProfileData.userNo));
        setImageList(data);
     
            const selectedDog = dogList.find(dog => dog.dogNo === selectedPet);

           
            setSelectedDogData(selectedDog || {});
        console.log(JSON.stringify(data)+ "눌렸을때 넘어갈 값" , selectedDog);
    }

    useEffect(() => {
        console.log("selectedPet" , selectedPet);
        if (userProfileData.userNo === undefined) return;
        getImageList();
    }, [userProfileData, selectedPet]);


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




    const [isFollow, setIsFollow] = useState(false);
    const [isFollowList, setIsFollowList] = useState(false);
  
    const followBtnClick = () => {
        setFollowList();
        setIsFollow(true);
        setIsFollowList(true);
    }
    const followerBtnClick = () => {
        setFollowerList();
        setIsFollow(false);
        setIsFollowList(true);
    }
    const followBackBtnClick = () => {
        setIsFollowList(false);
        console.log("뒤로가자");
    }

    const [selectedDogData, setSelectedDogData] = useState({});

    // pet 선택
    const petStateClick = (pet) => {
        console.log("상위로올라온 pet " , pet);
        setPetState(pet);
    }

    return (

        <div>
            <ProfileHeader
                userId={userProfileData.userId || ''}
                userName={userProfileData.userName || ''}
                userInfo={userProfileData.userIntro || ''}
                userImage={userProfileData.photo || '#'}
            />

            <ProfileFollow 
                isFollowList = {isFollowList}
                followBackBtnClick = {followBackBtnClick}
                isFollow = {isFollow}
                setIsFollow = {setIsFollow}
                followBtnClick = {followBtnClick}
                followerBtnClick = {followerBtnClick}
          />


            {isFollowList ? 
            <> 
  

            <ProfileFollowList
                isFollowList = {isFollowList}
                isFollow = {isFollow}
                setIsFollow = {setIsFollow}
                followBtnClick = {followBtnClick}
                followerBtnClick = {followerBtnClick}
                followList = {followList}
                followerList = {followerList}
            /> 
            </>
           
            :

            <>

         
        
            <ProfilePetList
                userName={userProfileData.userName || ''}
                dogList={dogList || []}
                onPetSelection={handlePetSelection}

            />

     
            <ProfilePetInfo 
                selectedDogData = {selectedDogData}
            />


            <ProfileImageList
                 imageList={imageList || []}
               
             />

            </>
         

            }
            
          


        </div>);
}

export default ProfileMain;
