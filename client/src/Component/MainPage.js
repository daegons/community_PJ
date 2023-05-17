import React, { useEffect, useState } from 'react';
import List from '../Component/Post/List';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const MainPage = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios
      .post('/api/post/list')
      .then((res) => {
        console.log([...res.data.postList]);
        if (res.data.success) {
          setPostList([...res.data.postList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        <Dropdown.Item>최신순</Dropdown.Item>
        <Dropdown.Item>인기순</Dropdown.Item>
      </DropdownButton>
      <List postList={postList} />
    </div>
  );
};

export default MainPage;
