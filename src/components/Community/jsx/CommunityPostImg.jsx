// 게시물 사진 컴포넌트
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination"; 
import "../css/CommunityPostImg.css";


function CommunityPostImg({ postImg }) {

  const images = Array.isArray(postImg) ? postImg : [postImg];

  return (
    <>
      {images && images.length > 0 && (
        <Swiper
          className="custom-swiper"
          modules={[Pagination]}
          pagination={{
            clickable: true,
            bulletClass: "default-pagination-color",
            bulletActiveClass: "active-pagination-color",
          }}
          slidesPerView={1}
          loop={images.length > 1}
        >
          {images.map((imgUrl, index) => (
            <SwiperSlide key={index}>
              <div className="post-image-container">
                <img
                  src={imgUrl}
                  alt={`게시글 이미지 ${index + 1}`}
                  className="post-image"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
export default CommunityPostImg;