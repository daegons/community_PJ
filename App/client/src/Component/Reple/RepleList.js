import axios from "axios";
import React, { useEffect, useState } from "react";

import { RepleListDiv } from "../../Style/RepleCSS.js";
import RepleContent from "./RepleContent";

const RepleList = (props) => {
  const [repleList, setRepleList] = useState([]);
  useEffect(() => {
    let body = {
      postId: props.postId,
    };

    axios.post("/api/reple/getReple", body).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setRepleList(res.data.repleList);
        // setRepleList([...res.data.repleList]);
      }
    });
  }, []);

  console.log(repleList);
  return (
    <RepleListDiv>
      {repleList.map((list, i) => {
        return <RepleContent list={list} key={i} />;
      })}
    </RepleListDiv>
  );
};

export default RepleList;
