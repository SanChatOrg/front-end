import {Routes, Route, Navigate} from 'react-router-dom';

import {useContext, Suspense, lazy, useEffect} from 'react';
import { PATHS } from './paths';
import Layout from '../common/Layout';


// 산책 화면
const Walk = lazy(() => import('../pages/Walk/Walk.jsx'));

// 지도 화면
const Map = lazy(() => import('../pages/Map/Map.jsx'));

// 채팅 화면
const ChatListPage = lazy(() => import('../pages/Chat/ChatListPage.jsx'));
const ChatRoomPage = lazy(() => import('../pages/Chat/ChatRoomPage.jsx'));

// 프로필 화면
const Profile = lazy(() => import('../pages/User/Profile/ProfileMain.jsx'));

// 커뮤니티 화면
const CommunityMain = lazy(() => import('../pages/Community/CommunityMain.jsx'));
const CommunityWrite = lazy(() => import('../pages/Community/CommunityWrite.jsx'));
const CommunityEdit = lazy(() => import('../pages/Community/CommunityEdit.jsx'));
const CommunityDetail = lazy(() => import('../pages/Community/CommunityDetail.jsx'));


function AppRouter() {
  
  return (
    <Routes>
      {/* 로그인 페이지 */}
      <Route path={PATHS.LOGIN} element=""/>

      {/* 레이아웃 설정 */}
      <Route element={<Layout/>}>

        {/* 지도 페이지 */}
        <Route path={PATHS.MAP.MAP} element={<Map/>}/>
        <Route path={PATHS.MAP.WALK} element={<Walk/>}/>

        {/* 커뮤니티 페이지 */}
        <Route path={PATHS.COMMUNITY.MAIN} element={<CommunityMain/>}/>
        <Route path={PATHS.COMMUNITY.DETAIL} element={<CommunityDetail/>}/>
        <Route path={PATHS.COMMUNITY.WRITE} element={<CommunityWrite/>}/>
        <Route path={PATHS.COMMUNITY.EDIT} element={<CommunityEdit/>}/>

        {/* 채팅 페이지 */}
        <Route path={PATHS.CHAT.LIST} element={<ChatListPage/>}/>
        <Route path={`${PATHS.CHAT.ROOM}/:chatRoomNo?`} element={<ChatRoomPage/>}/>

        {/* 내정보 페이지 */}
        <Route path={PATHS.USER.PROFILE} element={<Profile/>}/>

      </Route>
      
    </Routes>
  );
}

export default AppRouter;