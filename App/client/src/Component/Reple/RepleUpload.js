import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RepleUploadDiv } from '../../Style/RepleCSS';

const RepleUpload = (props) => {
  const [reple, setReple] = useState('');
  const user = useSelector((state) => state.user);
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(reple); //input 태그 입력값
    if (!reple) {
      return alert('댓글 내용을 채워주세요.');
    }

    // console.log(user.uid);
    // console.log(props.postId);
    let body = {
      //body 전체 정상 입력
      reple: reple, //댓글 입력한 값 정상 입력
      uid: user.uid, //aAyWsFeETnbFMV3k4xB6fsw4c6V2 이런식
      postId: props.postId, //646316440e622de48df366ec이런식
    };
    // console.log(body);
    axios.post('/api/reple/submit', body).then((response) => {
      //통신 끝나면 리플 초기화
      if (response.data.success) {
        alert('댓글 작성이 성공하였습니다.');
        window.location.reload();
      } else {
        alert('댓글 작성에 실패하였습니다.');
      }
    });
  };

  return (
    <RepleUploadDiv>
      <form>
        <input
          type="text"
          value={reple}
          onChange={(e) => {
            setReple(e.currentTarget.value);
          }}
        />
        <button onClick={submitHandler}>댓글 등록</button>
      </form>
    </RepleUploadDiv>
  );
};

export default RepleUpload;
