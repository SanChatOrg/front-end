/* src/pages/Community/CommunityEdit.jsx */
import { useNavigate } from "react-router-dom";
import "./CommunityWriteEdit.css";
import { PATHS } from "../../routes/paths";
import Header from "../../components/Community/jsx/Header";

function CommunityEdit() {

  const navigate = useNavigate();

  const handleOnClickPost = () => {
    setTimeout(() => {
      navigate(PATHS.COMMUNITY.MAIN);
    }, 200);
  };

  return (
    <div>

    <Header pageName="글 수정"/>

      <div className="mid">
        <div className="upload-container">
          <button className="img-btn">
            {/* 사진업로드 아이콘 넣기*/}
            <input type="file" accept="image/*" className="file-input" />
          </button>
          <div className="image-text">사진 등록</div>
        </div>

        <div className="content-container">
          <textarea type="text" placeholder="내용을 입력해주세요"></textarea>
        </div>

      </div>

      <div className="bottom">
        <button className="share-btn" onClick={handleOnClickPost}>공유</button>
      </div>

    </div>
  );
}

export default CommunityEdit;

