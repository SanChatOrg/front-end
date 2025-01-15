/* src/pages/Community/CommunityEdit.jsx */
import { useNavigate } from "react-router-dom";
import "./CommunityEdit.css";
import { PATHS } from "../../routes/paths";
import Header from "../../components/Community/jsx/Header";
import { useEffect, useState } from "react";
import axios from "axios";

function CommunityEdit() {

  const [post, setPost] = useState({}); // 선택된 글
  const communityContent = post.communityContent; // 선택 글 본문
  const filePath = post.filePath; // 선택 글 사진
  const [newImage, setNewImage] = useState(null); // 새로 선택한 사진
  const [imagePreview, setImagePreview] = useState(null); // 사진 미리보기 URL


  // 서버연결 확인
  useEffect(() => {
    fetch('http://localhost:8181/community/get')
      .then(response => response.text())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error('서버연결 오류', error));
  }, []);

  // 글 조회
  useEffect(() => {
    fetch(`http://localhost:8181/community/getPost/2`) // 추후 선택된 글 ${communityNo} 변경예정
      .then(response => {
        if (!response.ok) {
          throw new Error("글 조회 실패");
        }
        return response.json();
      })
      .then(data => {
        setPost({
          communityContent: data.communityContent,
          filePath: data.filePath,
        });
        console.log(data);
      })
      .catch(error => console.error('글 조회 실패: ', error));
  }, []);

  // 기존 본문 수정
  const handleContentChange = (e) => {
    setPost({ ...post, communityContent: e.target.value });
  };

  // 새 사진 선택 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file)); // 새 사진 미리보기 URL
    }
  };

  // 사진 첨부 취소
  const handleRemoveImage = () => {
    setNewImage(null); // 새로 선택한 사진
    setImagePreview(null); // 사진 미리보기
    setPost({ ...post, filePath: null }); // 기존 글 사진 삭제
  };

  // 업로드 버튼
  const handleUpdatePost = () => {

    if (!post.communityContent) {
      alert("본문을 입력해주세요.");
      return;
    }
    if (!filePath && !newImage) {
      alert("사진을 추가해주세요.");
      return;
    }

    // FormData
    const formData = new FormData();
    formData.append("communityContent", communityContent);

    if (newImage) {
      formData.append("file", newImage);
    }

    axios.put(`http://localhost:8181/community/editPost/2`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(response => {
        console.log('업데이트 성공: ', response.data);
      })
      .catch(error => {
        console.error('업데이트 실패: ', error);
        alert("업데이트에 실패했습니다. 다시 시도해주세요.");
      })
  };

  return (
    <div>

      <Header pageName="글 수정" />

      <div className="mid">
        <div className="upload-container">
          {/* 기존 선택된 사진 */}
          {filePath && !imagePreview && (
            <>
              <img src={filePath} alt="기존 사진" className="img-file" />
              <button className="remove-btn" onClick={handleRemoveImage}>
                ✖
              </button>
            </>
          )}

          {/* 새로 선택된 사진 미리보기 */}
          {imagePreview && (
            <>
              <img src={imagePreview} alt="미리보기" className="image-preview" />
              <button className="remove-btn" onClick={handleRemoveImage}>
                ✖
              </button>
            </>
          )}

          {/* 사진 없을 때 등록 버튼 */}
          {!filePath && !imagePreview && (
            <>
              <button className="img-btn">
                <img
                  src="/icons/ic_commu_addPhoto_btn.svg"
                  className="photo-icon"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="file-input"
                  onChange={handleImageChange}
                />
              </button>
              <div className="image-text">사진 등록</div>
            </>
          )}
        </div>

        <div className="content-container">
          <textarea
            type="text"
            value={communityContent || ""}
            onChange={handleContentChange}
            placeholder="내용을 입력해주세요"
          ></textarea>
        </div>

      </div>

      <div className="bottom">
        <button className="share-btn" onClick={handleUpdatePost}>공유</button>
      </div>

    </div>
  );
}

export default CommunityEdit;

