import React from "react";
import RepleUpload from "./RepleUpload";
import RepleList from "./RepleList";

const RepleArea = (props) => {
  // console.log(props.postId);
  return (
    <div>
      <RepleUpload postId={props.postId} />
      <RepleList />
    </div>
  );
};

export default RepleArea;
