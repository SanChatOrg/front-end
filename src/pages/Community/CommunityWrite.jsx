/* src/pages/Community/CommunityWrite.jsx */
import { data, useNavigate } from "react-router-dom";
import "./CommunityWrite.css";
import { PATHS } from "../../routes/paths";
import Header from "../../components/Community/jsx/Header";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function CommunityWrite() {

  const [communityContent, setCommunityContent] = useState(''); // 글 본문
  const [files, setFiles] = useState([]); // 사진
  const [imagePreviews, setImagePreviews] = useState([]); // 사진 미리보기
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

  // 글 본문 내용 
  const handleContent = (e) => {
    setCommunityContent(e.target.value);
    // console.log(communityContent);
  };

  // 사진 첨부
  const handleImage = (e) => {
    const selectedFiles = Array.from(e.target.files);

    setFiles(prevFiles => {
      let plusFiles = [...prevFiles, ...selectedFiles];

      if (selectedFiles.length > 10) {
        alert("최대 10개까지만 선택 가능합니다.");
        plusFiles = plusFiles.slice(0, 10);
      }
      return plusFiles;
    });

    setImagePreviews(prevPreviews => {
      const newPreviews = selectedFiles.map(files => URL.createObjectURL(files));
      const plusPreviews = [...prevPreviews, ...newPreviews];

      if (plusPreviews.length > 10) {
        plusPreviews = plusPreviews.slice(0, 10);
      }
      return plusPreviews;
    });
  };

  // 사진 첨부 취소
  const handleRemoveImage = (index) => {
    const updatedFile = [...files];
    const updatedPreview = [...imagePreviews];
    updatedFile.splice(index, 1);
    updatedPreview.splice(index, 1);
    setFiles(updatedFile);
    setImagePreviews(updatedPreview);
  };

  // 업로드 버튼
  const handlePost = () => {
    if (!communityContent.trim()) {
      alert("본문을 입력해주세요.");
      return;
    }
    if (files.length === 0) {
      alert("사진을 최소 1장 이상 추가해주세요.");
      return;
    }

    // FormData 생성
    const formData = new FormData();
    formData.append("communityContent", communityContent);
    files.forEach((files) => {
      formData.append("files", files);
    });

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
      });
  };

  // 파일 기존에 추가 버튼
  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <Header pageName="산책 글쓰기" />

      <div className="mid">
        <div className="upload-container">

          {imagePreviews.length > 0 ? (
            <>
              {/* 파일이 있을 경우 */}
              <Swiper
                className="custom-swiper"
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                  bulletClass: "default-pagination-color",
                  bulletActiveClass: "active-pagination-color",
                }}
                slidesPerView={1}
                loop={imagePreviews.length > 1}
              >
                {imagePreviews.map((preview, index) => (
                  <SwiperSlide key={index}>
                    <div className="image-container">
                      <img
                        src={preview}
                        alt={`preview-${index}`}
                        className="image-preview"
                      />
                      <button className="remove-btn" onClick={() => handleRemoveImage(index)}>
                        ✖
                      </button>

                      {files.length < 10 && (
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
                onChange={handleImage}
                ref={fileInputRef}
              />
            </>
          ) : (
            <>
              {/* 사진이 없을 경우 */}
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
                  onChange={handleImage}
                />
              </button>
              <div className="image-text">사진 등록</div>
            </>
          )}

        </div>

        <div className="content-container">
          <textarea
            type="text"
            placeholder="내용을 입력해주세요"
            onChange={handleContent}
          ></textarea>
        </div>

      </div>

      <div className="bottom">
        <button className="share-btn" onClick={handlePost}>
          공유
        </button>
      </div>

    </div>
  );
}

export default CommunityWrite;

