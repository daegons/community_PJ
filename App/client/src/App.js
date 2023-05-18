import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
//reduce
import { useDispatch } from 'react-redux';
import { clearUser, loginUser } from './Reducer/userSlice';
//firebase
import firebase from './firebase';

import Heading from './Component/Heading';
import Upload from './Component/Post/Upload';
import Edit from './Component/Post/Edit';
import Login from './Component/User/Login';
import Register from './Component/User/Register';
import PostArea from './Component/Post/PostArea';
import MyPage from './Component/User/MyPage';
import MainPage from './Component/MainPage';

function App() {
  const dispatch = useDispatch();
  // console.log(user.displayName);
  useEffect(() => {
    //onAuthStateChanged 사용자의 상태 변화에 따라 추적 함수..
    firebase.auth().onAuthStateChanged((userInfo) => {
      //photoURL로 사용자img 줄수있음..firebase.auth자체기능
      // console.log(userInfo._delegate.photoURL);

      //사용자 로그아웃 or 로그인하지 않은 상태라면 -> null값
      //로그인했다면 로그인한 데이터를 보여줌
      // console.log("유저정보 : ", userInfo);
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser());
      }
    });
  }, []);

  // useEffect(() => {
  //   console.log("user : ", user);
  // }, [user]);

  // useEffect(() => {
  //   //signOut() firebase 로그아웃 시키는 함수
  //   firebase.auth().signOut();
  // }, []);

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* mongoose를 통해 post, Reple 구현 */}
        <Route path="/upload" element={<Upload />} />
        <Route path="/post/:postNum" element={<PostArea />} />
        <Route path="/edit/:postNum" element={<Edit />} />
        {/* firebase Auth(인증)통해서 login구현 */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* 
        Add
        1. 검색기능 -(post관련)
        2. 유저프로필 이미지 & 이미지 변경
        3. 정렬 최신 / 인기 - (post관련)
      */}
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  );
}

export default App;
