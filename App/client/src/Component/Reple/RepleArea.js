import React from 'react';
import RepleUpload from './RepleUpload';
import RepleList from './RepleList';
import { useSelector } from 'react-redux';

const RepleArea = (props) => {
  const user = useSelector((state) => state.user);
  //646316440e622de48df366ec 이런식으로 정상 _uid
  // console.log(props.postId);
  console.log(user);
  return (
    <div>
      {user.accessToken && <RepleUpload postId={props.postId} />}

      <RepleList postId={props.postId} />
    </div>
  );
};

export default RepleArea;
