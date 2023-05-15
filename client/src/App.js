import { Route, Routes } from "react-router-dom";
import "./App.css";
//reduce
import { useSelector, useDispatch } from "react-redux";
import { clearUser, loginUser } from "./Reducer/userSlice";
//firebase
import firebase from "./firebase";

import Heading from "./Component/Heading";
import Upload from "./Component/Post/Upload";
import Detail from "./Component/Post/Detail";
import List from "./Component/Post/List";
import Edit from "./Component/Post/Edit";
import Login from "./Component/User/Login";
import Register from "./Component/User/Register";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    //onAuthStateChanged 사용자의 상태 변화에 따라 추적 함수..
    firebase.auth.onAuthStateChanged(() => {});
  }, []);
  useEffect(() => {}, []);

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/post/:postNum" element={<Detail />} />
        <Route path="/edit/:postNum" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
