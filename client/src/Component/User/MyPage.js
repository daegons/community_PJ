import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MyPageDiv } from '../../Style/UserCSS.js';
import Avatar from 'react-avatar';
import axios from 'axios';
import firebase from '../../firebase.js';

const MyPage = () => {
  const user = useSelector((state) => state.user);
  const [currentImage, setCurrentImage] = useState('');
  const navigate = useNavigate();
  //   console.log(user.photoURL);
  useEffect(() => {
    //유저 로그인시에도 Login창 이동되서 user.isLoading 추가
    if (user.isLoading && !user.accessToken) {
      navigate('/login');
    } else {
      setCurrentImage(user.photoURL);
    }
  }, [user]);

  const ImageUpload = (e) => {
    // console.log(e.target.files[0]);
    var formData = new FormData(); //{}
    formData.append('file', e.target.files[0]); //XMLHtpRequest
    //콘솔로 formData 찍으면 빈 오브젝트로 출력// {}
    //for문으로 콘솔 찍어야 보임..
    // for (const keyValu of formData) console.log(keyValu);
    axios
      .post('/api/user/profile/image', formData)
      .then((res) => {
        // console.log(res.data);
        setCurrentImage(res.data.filePath);
      })
      .catch(() => {});
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().currentUser.updateProfile({
        //user 프로필 이미지추가
        photoURL: currentImage,
      });
    } catch (err) {
      return alert('프로필 저장에 실패하였습니다.');
    }
    let body = {
      photoURL: currentImage,
      uid: user.uid,
    };
    axios.post('/api/user/profile/update', body).then((res) => {
      if (res.data.success) {
        alert('프로필 저장에 성공하였습니다.');
        window.location.reload();
      } else {
        alert('프로필 저장에 실패하였습니다.');
      }
    });
  };

  return (
    <MyPageDiv style={{ width: '100vw', height: '100vh' }}>
      <form
        style={{
          width: '50%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '2rem',
        }}
      >
        <label>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={ImageUpload}
          />
          <Avatar
            style={{
              background: 'rgb(232, 232, 232)',
              border: '1px solid rgb(210, 210, 210)',
              cursor: 'pointer',
            }}
            size="100"
            round={true}
            src={currentImage}
          />
        </label>
        <button onClick={saveProfile}>저장</button>
      </form>
    </MyPageDiv>
  );
};

export default MyPage;
