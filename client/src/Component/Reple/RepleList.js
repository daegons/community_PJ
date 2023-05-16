import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RepleList = (props) => {
  const [repleList, setRepleList] = useState([]);
  useEffect(() => {
    let body = {
      postId: props.postID,
    };

    axios.post('/api/reple/getReple', body).then((res) => {
      if (res.data.success) {
        setRepleList([...res.data.repleList]);
      }
    });
  }, []);

  console.log(repleList);
  return (
    <div>
      {repleList.map((list, i) => {
        return <div key={i}>{list.reple}</div>;
      })}
    </div>
  );
};

export default RepleList;
