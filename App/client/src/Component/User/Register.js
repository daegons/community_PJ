import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginDiv } from "../../Style/UserCSS";

import firebase from "../../firebase";

import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCF, setPasswordCF] = useState("");
  // const [loaded, setLoaded] = useState(false);
  const [nameCheck, setNameCheck] = useState(false);
  const [nameInfo, setNameInfo] = useState("");

  const navigate = useNavigate();

  const RegisterFunc = async (e) => {
    // setLoaded(true);
    e.preventDefault();
    if (!nameCheck) {
      return alert("닉네임 중복검사를 진행해 주세요.");
    }
    if (password !== passwordCF) {
      return alert("비밀번호 확인 불일치");
    }
    if (!(name && email && password && passwordCF)) {
      return alert("빠진 부분이 없나 확인해주세요.");
    }

    //파이어 베이스 인증시간이 걸려서.. 위에 promise로 async await 걸어줌
    const createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await createdUser.user.updateProfile({
      displayName: name,
      //user 프로필 이미지추가
      photoURL:
        "https://kr.object.ncloudstorage.com/react-project/post/1684304602196.png",
    });
    // console.log(createdUser.user);

    let body = {
      displayName: createdUser.user.multiFactor.user.displayName,
      email: createdUser.user.multiFactor.user.email,
      uid: createdUser.user.multiFactor.user.uid,
      //user 프로필 이미지추가
      photoURL:
        "https://kr.object.ncloudstorage.com/react-project/post/1684304602196.png",
    };
    axios.post("/api/user/register", body).then((res) => {
      if (res.data.success) {
        //회원가입 성공시
        navigate("/login");
      } else {
        //회원가입 실패시
        return alert("회원가입 실패했어요..");
      }
    });
  };

  const nameCheckHandler = (e) => {
    e.preventDefault();
    if (name === null) {
      return alert("닉네임을 입력해주세요");
    }
    let body = {
      displayName: name,
    };
    axios.post("/api/user/namecheck", body).then((res) => {
      if (res.data.success) {
        if (res.data.check) {
          setNameCheck(true);
          setNameInfo(
            <div
              style={{
                fontWeight: "bold",
                fontFamily: "Yeon Sung",
              }}
            >
              사용<span style={{ color: "green" }}> 가능한 </span>
              닉네임입니다.
            </div>
          );
        } else {
          setNameInfo(
            <div
              style={{
                fontWeight: "bold",
                fontFamily: "Yeon Sung",
              }}
            >
              사용
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                불가한{" "}
              </span>
              닉네임입니다.
            </div>
          );
        }
      }
    });
  };
  return (
    <LoginDiv>
      <form action="">
        <label htmlFor="">닉네임</label>
        <input
          type="name"
          value={name}
          disabled={nameCheck} //nameCheck가 true로 되면 input값 고정
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
        {nameInfo}
        <button onClick={nameCheckHandler}>닉네임 중복검사</button>
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
        {/* disabled={loaded} */}
        <button onClick={RegisterFunc}>가입신청</button>
      </form>
    </LoginDiv>
  );
};

export default Register;
