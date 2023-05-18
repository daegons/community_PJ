import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginDiv } from "../../Style/UserCSS";

import firebase from "../../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, seteRrorMsg] = useState("");

  const navigate = useNavigate();

  const singInFunc = async (e) => {
    e.preventDefault();

    if (!(email && password)) {
      return alert("빈칸을 채워주세요.");
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      alert(`환영합니다.`);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        seteRrorMsg("존재하지 않는 이메일 입니다.");
      } else if (err.code === "auth/wrong-password") {
        seteRrorMsg("비밀번호가 일치하지 않습니다.");
      } else {
        seteRrorMsg("로그인이 실패하였습니다.");
      }
    }
  };

  //errorMsg에 변화 있을 때 3초뒤에 에러 메시지 초기화
  useEffect(() => {
    setTimeout(() => {
      seteRrorMsg("");
    }, 3000);
  }, [errorMsg]);

  return (
    <LoginDiv>
      <form action="">
        <label>이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        {errorMsg !== null && <p>{errorMsg}</p>}
        <button onClick={singInFunc}>로그인</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
        >
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
};

export default Login;
