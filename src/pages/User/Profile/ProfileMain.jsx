
import {useLocation , useParams , useNavigate} from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileImageList from './ProfileImageList';
import ProfilePetList from './ProfilePetList';
import ProfileFollow from './ProfileFollow';
import ProfileFollowList from './ProfileFollowList';
import ProfilePetInfo from './ProfilePetInfo';
import axios from "axios";
import {act, useEffect, useState} from "react";
import ProfileTabMenu from './ProfileTabMenu';
import { PATHS } from '../../../routes/paths';

function ProfileMain() {
    const [userProfileData, setUserProfileData] = useState({});
    const [selectedPet, setSelectedPet] = useState(0); // 선택된 pet
    const [imageList, setImageList] = useState([]); // pet Image list
    const [badgeList, setBadgeList] = useState([]);
    const [dogList, setDogList] = useState([]);
    const [followList, setfollowList] = useState([]);
    const [followerList, setfollowerList] = useState([]);
    const [session , setSession] = useState("brown1234");

    // 클릭한 userId 값 받아오기
    const {state} = useLocation();
    console.log(state);


    const { username } = useParams();

    useEffect(() => {
        setData();
        getFollowList();
        getFollowerList();
        setIsFollowList(false);
        getDogList();
        getPhotoList();
        // getUserNoTest();
    }, [username]);


    // 조회 하기
    const setData = async () => {
        try {
            let {data} = await axios.get('http://localhost:8181/user/getUser?userId=' + username);
            console.log(data);
            setUserProfileData(data);
            setDogList(data.dogList);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const getFollowList = async () => {
        try {
            let {data} = await axios.get('http://localhost:8181/follow/getFollowList?userId=' + username);
            console.log("팔로우리스트" , data);
            setfollowList(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const getFollowerList = async () => {
        try {
            let {data} = await axios.get('http://localhost:8181/follow/getFollowerList?userId=' + username);
            console.log("팔로워리스트" , data);
            setfollowerList(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const getUserNoTest = async () => {
        try {
            let {data} = await axios.get('http://localhost:8181/user/test?userId='+ username );
            console.log("이거 userNo 테스트 " + data);
        }catch(error) {

        }
    }

    const getDogList = async () => {
        try {
            let {data} = await axios.get('http://localhost:8181/user/getDogList?userId='+ username );
            setDogList(data);
            console.log("강아지리스트-----------------" , data);
        }catch(error) {

        }
    }

    const getPhotoList = async () => {
        try {
            let {data} = await axios.get('http://localhost:8181/user/getPhotoList?userId='+ username );
            setImageList(data);
            console.log("피드 포토 리스트-----------------" , data);
        }catch(error) {

        }
    }




    const navigate = useNavigate();

    // 프로필 가기 (네비게이트)
    const goUserProflie = (userId) => { 
      navigate(`${PATHS.USER.PROFILE}/${userId}`, {state : { userId } });
    };

    const [followUserNo, setFollowUserNo] = useState(0);

    const followUserBtnClick = (userNo) => {
        goFollowUser(userNo);
    }

    const UnfollowUserBtnClick = (userNo) => {
        goUnFollowUser(userNo);
    }

    useEffect(()=> {
        console.log("------------- 음하하핰 dㅋㅋ");
        console.log("팔로우한 user " + followUserNo);
    },[followUserNo])



    const goFollowUser = async (userNo) => {
        console.log(userNo)

        try {
            const payload = {
                followerNo: 1, // 팔로워 ID
                followeeNo: userNo, // 팔로우할 유저 ID
            };
    
            let {data} = await axios.post('http://localhost:8181/follow/followUser',payload);
            console.log("팔로우 완료");
            getFollowList();
            getFollowerList();
            
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };


    const goUnFollowUser = async (userNo) => {
        console.log(userNo)

        try {
            const payload = {
                followerNo: 1, // 팔로워 ID
                followeeNo: userNo, // 언팔로우할 유저 ID
            };
    
            let {data} = await axios.post('http://localhost:8181/follow/unfollowUser',payload);
            console.log("언팔로우 완료");
            getFollowList();
            getFollowerList();
            
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };




    useEffect(() => {
        if (dogList.length === 1) setSelectedPet(dogList[0].dogNo);
    }, [dogList]);



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

    // 뱃지 리스트
    // const getBadgeList = async () => {
    //     let {data} = await axios.get('http://localhost:8181/badge/getBadgeList?type='
    //         + (
    //             checkIsMyPet()
    //                 ? 'dog&id=' + selectedPet : 'user&id=' + userProfileData.userNo));
    //     setBadgeList(data);
    //     console.log(data);
    // }

    useEffect(() => {
        console.log("selectedPet" , selectedPet);
        if (userProfileData.userNo === undefined) return;
        // getImageList();
        // getBadgeList();
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
        setIsFollow(true);
        setIsFollowList(true);
    }
    const followerBtnClick = () => {
     
        setIsFollow(false);
        setIsFollowList(true);
    }
    const followBackBtnClick = () => {
        setIsFollowList(false);
        console.log("뒤로가자");
        setSelectedPet('');
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
                session = {session}
            />

           <ProfileFollow 
                isFollowList = {isFollowList}
                followBackBtnClick = {followBackBtnClick}
                isFollow = {isFollow}
                setIsFollow = {setIsFollow}
                followBtnClick = {followBtnClick}
                followerBtnClick = {followerBtnClick}
                followList = {followList}
                followerList = {followerList}
                username = {username}
                
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
                followUserBtnClick = {followUserBtnClick}
                UnfollowUserBtnClick = {UnfollowUserBtnClick}
                goUserProflie = {goUserProflie} 
            /> 
            </>
           
            :

            <>

         
        
            <ProfilePetList
                userName={userProfileData.userName || ''}
                dogList={dogList || []}
                onPetSelection={handlePetSelection}
                selectedPet = {selectedPet}


            />

     
            <ProfilePetInfo 
                dogList = {dogList}
                selectedPet = {selectedPet}
            />


            <ProfileImageList
                 imageList={imageList || []}
               
             />

            </>
         

            }
            
          


        </div>);
}

export default ProfileMain;
