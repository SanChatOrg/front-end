import './ProfileMain.css';
import { useLocation } from 'react-router-dom';
import ProfileHeader from '../../../components/User/Profile/ProfileHeader';
import ProfileImageList from '../../../components/User/Profile/ProfileImageList';
import ProfilePetList from '../../../components/User/Profile/ProfilePetList';

function ProfileMain() {


  // 클릭한 userId 값 받아오기
  const {state} = useLocation();
  console.log(state);

  // 조회 하기 
  // 조회해왔다고 치고.. 

  const UserProfileData = 
  {  image : '/src/assets/img/user/ex_user_profile_02.png',
  name : '마루콩콩콩',
  info : ' 마루 멍챗 맞팔 해요 ~',
  dogList : ["마루","콩콩"],
  walkStatus : true,
  userId : 'maru123',
  position : new naver.maps.LatLng(37.5799, 127.200564),
  imageList : ['/src/assets/profile-image-001.png','/src/assets/profile-image-002.png','/src/assets/profile-image-003.png']
};



  return (

    <div>
        
        <ProfileHeader 
        userId = {UserProfileData.userId}
        userName = {UserProfileData.name}
        userInfo = {UserProfileData.info}
        userImage= {UserProfileData.image}
        />
        <ProfilePetList 
        userName = {UserProfileData.name}
        dogList = {UserProfileData.dogList}
        />
        <ProfileImageList 
        imageList = {UserProfileData.imageList}
        />


    </div>
  );
}

export default ProfileMain;