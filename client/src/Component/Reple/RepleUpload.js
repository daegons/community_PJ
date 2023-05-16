import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const RepleUpload = () => {
  const [reple, setReple] = useState("");
  const user = useSelector((state) => state.user);
  console.log(user);
  const submitHandler = (e) => {
    e.preventDefault();

    let body = {
      reple: reple,
      uid: user.uid,
    };

    axios
      .post("/api/reple/submit", body)
      .then(() => {})
      .catch(() => {});
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
