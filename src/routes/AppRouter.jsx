import {Routes, Route, Navigate} from 'react-router-dom';

import {useContext, Suspense, lazy, useEffect} from 'react';
import { PATHS } from './paths';
import Layout from '../common/Layout';

// 지도 화면
const Map = lazy(() => import('../pages/Map/Map.jsx'));

// 채팅 화면
const ChatListPage = lazy(() => import('../pages/Chat/ChatListPage.jsx'));
const ChatRoomPage = lazy(() => import('../pages/Chat/ChatRoomPage.jsx'));

// 프로필 화면
const Profile = lazy(() => import('../pages/User/Profile/ProfileMain.jsx'));

function AppRouter() {
  
  return (
    <Routes>
      {/* 로그인 페이지 */}
      <Route path={PATHS.LOGIN} element=""/>

      {/* 레이아웃 설정 */}
      <Route element={<Layout/>}>

        {/* 지도 페이지 */}
        <Route path={PATHS.MAP} element={<Map/>}/>

        {/* 커뮤니티 페이지 */}
        <Route path={PATHS.COMMUNITY.LIST} element=""/>
        <Route path={PATHS.COMMUNITY.CONTENT} element=""/>
        <Route path={PATHS.COMMUNITY.WRITE} element=""/>
        <Route path={PATHS.COMMUNITY.EDIT} element=""/>

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