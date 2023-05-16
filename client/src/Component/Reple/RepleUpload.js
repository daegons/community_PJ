import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const RepleUpload = (props) => {
  const [reple, setReple] = useState("");
  const user = useSelector((state) => state.user);
  console.log(user);
  const submitHandler = (e) => {
    e.preventDefault();

    if (reple === null) {
      return alert("댓글 내용을 채워주세요.");
    }

    let body = {
      reple: reple,
      uid: user.uid,
      postId: props.postId,
    };

    axios
      .post("/api/reple/submit", body)
      .then((res) => {
        if (res.data.success) {
          alert("댓글 작성이 완료되었습니다.");
        } else {
          alert("댓글 작성에 실패하였습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form action="">
        <input
          type="text"
          value={reple}
          onChange={(e) => {
            setReple(e.currentTarget.value);
          }}
        />
        <button onClick={submitHandler}>댓글 등록</button>
      </form>
    </div>
  );
};

export default RepleUpload;
