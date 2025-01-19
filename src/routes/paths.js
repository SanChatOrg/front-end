// 라우트 경로를 상수로 관리
// 경로 변경시 paths.js 파일 수정

export const PATHS = {
  // login page
  LOGIN: "/login",

  // 지도 페이지
  MAP: {
    MAP : "/map",
    WALK : "/walk"
  },

  // 커뮤니티 페이지
  COMMUNITY: {
    MAIN: "/community/main",         // 커뮤니티 목록 경로
    DETAIL: "/community/detail",   // 커뮤니티 상세 경로
    WRITE: "/community/write",       // 커뮤니티 작성 경로
    EDIT: "/community/edit",         // 커뮤니티 수정 경로
  },

  // 채팅 페이지
  CHAT: {
    LIST: "/chat/list",           // 채팅 목록 경로
    ROOM: "/chat/room",           // 채팅방 경로
  },

  // 알림 페이지
  NOTI: "/noti",

  // 유저 페이지
  USER: {
    PROFILE: "/user/profile",
    SETTING: "/user/setting",
    LOGIN: "/user/login",
    SIGNUP: "/user/signup",
  },

  

};