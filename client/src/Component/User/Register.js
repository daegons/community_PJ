import React, { useState } from 'react';
import { LoginDiv } from '../../Style/UserCSS';

import firbase from '../../firebase';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCF, setPasswordCF] = useState('');

  const registerFunc = (e) => {
    e.preventDefault();
    if (!(name && email && password && passwordCF)) {
      return alert('빠진 부분이 없나 확인해주세요.');
    }
    if (password !== passwordCF) {
      return alert('비밀번호 확인 불일치');
    }
    //파이어 베이스 인증시간이 걸려서.. 위에 async await 걸어줌
    const createdUser = firbase
      .auth()
      .createUserWithEmailAndPassword(email, password);
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
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <label htmlFor="">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <label htmlFor="">비밀번호확인</label>
        <input
          type="password"
          value={passwordCF}
          onChange={(e) => {
            setPasswordCF(e.currentTarget.value);
          }}
        />
        <button onClick={registerFunc}>가입신청</button>
      </form>
    </LoginDiv>
  );
};

export default Register;
