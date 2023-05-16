import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
//reduce
import { useDispatch } from "react-redux";
import { clearUser, loginUser } from "./Reducer/userSlice";
//firebase
import firebase from "./firebase";

import Heading from "./Component/Heading";
import Upload from "./Component/Post/Upload";
import List from "./Component/Post/List";
import Edit from "./Component/Post/Edit";
import Login from "./Component/User/Login";
import Register from "./Component/User/Register";
import PostArea from "./Component/Post/PostArea";

function App() {
  const dispatch = useDispatch();
  // console.log(user.displayName);
  useEffect(() => {
    //onAuthStateChanged 사용자의 상태 변화에 따라 추적 함수..
    firebase.auth().onAuthStateChanged((userInfo) => {
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
        <Route path="/" element={<List />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/post/:postNum" element={<PostArea />} />
        <Route path="/edit/:postNum" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
