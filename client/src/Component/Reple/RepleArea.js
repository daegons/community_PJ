import React from "react";
import RepleUpload from "./RepleUpload";
import RepleList from "./RepleList";

const RepleArea = (props) => {
  //646316440e622de48df366ec 이런식으로 정상 _uid
  // console.log(props.postId);
  return (
    <div>
      <RepleUpload postId={props.postId} />
      <RepleList />
    </div>
  );
};

export default RepleArea;
