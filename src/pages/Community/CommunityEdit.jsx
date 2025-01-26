/* src/pages/Community/CommunityEdit.jsx */
import { useNavigate } from "react-router-dom";
import "./CommunityEdit.css";
import { PATHS } from "../../routes/paths";
import Header from "../../components/Community/jsx/Header";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


function CommunityEdit() {

  const navigate = useNavigate();
  const [post, setPost] = useState({}); // 선택된 글
  const communityContent = post.communityContent; // 선택 글 본문
  const filePath = post.filePath; // 선택 글 사진
  const [newImage, setNewImage] = useState([]); // 새로 선택한 사진
  const [imagePreview, setImagePreview] = useState([]); // 사진 미리보기 URL
  const [photoIdsToDelete, setPhotoIdsToDelete] = useState([]); // 삭제 요청 이미지 ID
  const existingImages = (post.filePath && post.filePath.length > 0) ? post.filePath : [];  // 기존 사진 URL을 배열에 포함
  const allImages = [...existingImages, ...imagePreview];// 기존 이미지와 새 이미지 미리보기 합치기
  const fileInputRef = useRef(null); // 파일 추가 시 사용


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
    fetch(`http://localhost:8181/community/getPost/1`) // 추후 선택된 글 ${communityNo} 변경예정
      .then(response => {
        if (!response.ok) {
          throw new Error("글 조회 실패");
        }
        return response.json();
      })
      .then(data => {
        setPost({
          ...data,
          filePath: data?.photoList && data.photoList.length > 0
            ? data.photoList.map(photo => photo.photoUrl)
            : []
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
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setNewImage(prevImages => [...prevImages, ...files]);

      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreview(prevPreviews => [...prevPreviews, ...newPreviews]);
    }
  };

  // 사진 첨부 취소
  const handleRemoveImage = (index) => {
    // 기존 이미지를 삭제하는 경우
    if (index < existingImages.length) {
      const updatedExisting = [...existingImages];
      const updatedPhotoList = [...post.photoList];

      const photoIdToRemove = updatedPhotoList[index].photoNo; // 삭제할 사진 ID
      setPhotoIdsToDelete((prevIds) => [...prevIds, photoIdToRemove]); 

      updatedExisting.splice(index, 1);
      updatedPhotoList.splice(index, 1);

      setPost({ ...post, filePath: updatedExisting, photoList: updatedPhotoList });
    } else {
      // 새 이미지를 삭제하는 경우
      const newIndex = index - existingImages.length;
      const updatedImages = [...newImage];
      const updatedPreviews = [...imagePreview];

      updatedImages.splice(newIndex, 1);
      updatedPreviews.splice(newIndex, 1);

      setNewImage(updatedImages);
      setImagePreview(updatedPreviews);
    }
  };

  // 업로드 버튼
  const handleUpdatePost = () => {
    if (!post.communityContent.trim()) {
      alert("본문을 입력해주세요.");
      return;
    }
    if (!filePath && !newImage) {
      alert("사진을 최소 1장 이상 추가해주세요.");
      return;
    }

    // FormData
    const formData = new FormData();
    formData.append("communityContent", communityContent);
    newImage.forEach((imageFile) => {
      formData.append("files", imageFile);
    });
    photoIdsToDelete.forEach((photoId) => {
      formData.append("photoIdsToDelete", photoId.toString());
    });

    axios.put(`http://localhost:8181/community/editPost/1`, formData, { // 추후 선택된 글 ${communityNo} 변경예정
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(response => {
        console.log('업데이트 성공: ', response.data);

        // 상태 초기화
        setPhotoIdsToDelete([]);
        setNewImage([]);
        setImagePreview([]);

        navigate(`/community/detail`);
      })
      .catch(error => {
        console.error('업데이트 실패: ', error);
        alert("업데이트에 실패했습니다. 다시 시도해주세요.");
      })
  };

  // 파일 기존에 추가 버튼
  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>

      <Header pageName="글 수정" />

      <div className="mid">
        <div className="upload-container">
          {/* 기존 선택된 사진 */}
          {allImages.length > 0 ? (
            <>
              <Swiper
                className="custom-swiper"
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                  bulletClass: "default-pagination-color",
                  bulletActiveClass: "active-pagination-color",
                }}
                slidesPerView={1}
                loop={allImages.length > 1}  // 슬라이드가 2개 이상일 때만 loop 활성화
              >
                {allImages.map((imgSrc, index) => (
                  <SwiperSlide key={index}>
                    <div className="image-container">
                      <img src={imgSrc} alt={`이미지 ${index}`} className="image-preview" />
                      <button className="remove-btn" onClick={() => handleRemoveImage(index)}>
                        ✖
                      </button>

                      {allImages.length < 10 && (
                        <button className="add-btn" onClick={openFileDialog}>
                          +
                        </button>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <input
                type="file"
                accept="image/*"
                className="file-input"
                multiple
                onChange={handleImageChange}
                ref={fileInputRef}
              />
            </>
          ) : (
            <>
              <button className="img-btn">
                <img
                  src="/icons/ic_commu_addPhoto_btn.svg"
                  className="photo-icon"
                  alt="사진 추가"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="file-input"
                  multiple
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

