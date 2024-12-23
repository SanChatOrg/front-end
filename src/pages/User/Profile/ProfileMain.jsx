import './ProfileMain.css';
import ProfileHeader from '../../../components/User/Profile/ProfileHeader';
import ProfileImageList from '../../../components/User/Profile/ProfileImageList';
import ProfilePetList from '../../../components/User/Profile/ProfilePetList';

function ProfileMain() {

  return (

    <div>
 
        <ProfileHeader />
        <ProfilePetList />
        <ProfileImageList />


    </div>
  );
}

export default ProfileMain;