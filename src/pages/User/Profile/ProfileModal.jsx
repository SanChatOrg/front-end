import "./ProfileModal.css"


function ProfileModal() {

  return (

    <div>
      {/* user-profile-modal :: 프로필 모달 */}
      <div className="user-profile-modal">
        <div className="user-profile-modal-left">
          <div className="user-profile-img" > <img src="public/img_dog.png"/> </div>
          <div className="user-profile-active"> 활성화 </div>
          <div className="user-profile-follow"> <button> 버튼 </button>
        </div>
        </div>
        <div className="user-profile-modal-right"> 
          <div className="user-profile-modal-right-top">
            <div className="user-profile-name"> 웰시코기 123 </div>
            <div className="user-profile-intro"> 소개 글이 없습니다. </div>
          </div>
          <div className="user-profile-modal-right-bottom">
            <div className="user-profile-dog-list">
              
              <div> 이름 </div>
              <div> 이름 </div>
              <div> 이름 </div>
              <div> ... </div>
              
            </div>
          </div>
        

        </div>
      </div>



    </div>
  );
}

export default ProfileModal;

