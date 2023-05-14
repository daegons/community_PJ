import React, { useState } from 'react';
import { LoginDiv } from '../../Style/UserCSS';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCF, setPasswordCF] = useState('');
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
        <button>가입신청</button>
      </form>
    </LoginDiv>
  );
};

export default Register;
