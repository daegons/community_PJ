import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginDiv } from "../../Style/UserCSS";

import firebase from "../../firebase";

import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCF, setPasswordCF] = useState("");
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  const registerFunc = async (e) => {
    setLoaded(true);
    e.preventDefault();
    if (!(name && email && password && passwordCF)) {
      return alert("빠진 부분이 없나 확인해주세요.");
    }
    if (password !== passwordCF) {
      return alert("비밀번호 확인 불일치");
    }
    //파이어 베이스 인증시간이 걸려서.. 위에 promise로 async await 걸어줌
    const createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await createdUser.user.updateProfile({
      displayName: name,
    });
    console.log(createdUser.user);
    let body = {
      displayName: createdUser.user.multiFactor.user.displayName,
      email: createdUser.user.multiFactor.user.email,
      uid: createdUser.user.multiFactor.user.uid,
    };
    axios.post("/api/user/register", body).then((res) => {
      setLoaded(false);
      if (res.data.success) {
        //회원가입 성공시
        navigate("/login");
      } else {
        //회원가입 실패시
        return alert("회원가입 실패했어요..");
      }
    });
  };
  return (
    <LoginDiv>
      <form action="">
        <label htmlFor="">이름</label>
        <input
          type="name"
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
        <label htmlFor="">이메일</label>
        <input
          type="email"
          value={email}
          placeholder=" ex) daegon***1@na***.com"
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <label htmlFor="">비밀번호</label>
        <input
          type="password"
          value={password}
          minLength={8}
          placeholder=" 8글자 이상 입력하세요."
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <label htmlFor="">비밀번호확인</label>
        <input
          type="password"
          value={passwordCF}
          placeholder=" 8글자 이상 입력하세요."
          minLength={8}
          onChange={(e) => {
            setPasswordCF(e.currentTarget.value);
          }}
        />
        <button disabled={loaded} onClick={registerFunc}>
          가입신청
        </button>
      </form>
    </LoginDiv>
  );
};

export default Register;
