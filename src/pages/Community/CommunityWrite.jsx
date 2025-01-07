/* src/pages/Community/CommunityWrite.jsx */
import { data, useNavigate } from "react-router-dom";
import "./CommunityWriteEdit.css";
import { PATHS } from "../../routes/paths";
import Header from "../../components/Community/jsx/Header";
import { useEffect, useState } from "react";
import axios from "axios";

function CommunityWrite() {

  const [communityContent, setCommunityContent] = useState(''); // 글 본문
  const [image, setImage] = useState(null); // 사진

  // 서버연결 확인
  useEffect(() => {
    fetch('http://localhost:8181/community/get')
      .then(response => response.text())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error('서버연결 오류', error));
  }, []);

  // 글 본문 내용 
  const handleContent = (e) => {
    setCommunityContent(e.target.value);
    // console.log(communityContent);
  };

  // 사진 선택
  const handleImage = (e) => {
    const image = e.target.files[0];
    console.log(image);
    setImage(image);
  }


  // 글, 사진 업로드
  const handlePost = () => {
    if (!communityContent.trim()) {
      alert("본문을 입력해주세요.");
      return;
    }
    if (!image) {
      alert("사진을 첨부해주세요")
      return;
    }

    // FormData 생성
    const formData = new FormData();
    formData.append("communityContent", communityContent);
    formData.append("file", image);

    axios.post('http://localhost:8181/community/newPost', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(response => {
        console.log('업로드 성공: ', response.data);
      })
      .catch(error => {
        console.error('등록 실패: ', error);
      })
  };



  return (
    <div>
      <Header pageName="산책 글쓰기" />

      <div className="mid">
        <div className="upload-container">
          <button className="img-btn">
            <img src="/icons/ic_commu_addPhoto_btn.svg" className="photo-icon"></img>
            <input type="file" accept="image/*" className="file-input" onChange={handleImage} />
          </button>
          <div className="image-text">사진 등록</div>
        </div>

        <div className="content-container">
          <textarea type="text" placeholder="내용을 입력해주세요" onChange={handleContent}></textarea>
        </div>

      </div>

      <div className="bottom">
        <button className="share-btn" onClick={handlePost}
        >공유</button>
      </div>

    </div>
  );
}

export default CommunityWrite;

