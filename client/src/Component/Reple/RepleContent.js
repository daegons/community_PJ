import React, { useState } from 'react';
import { RepleContentDiv } from '../../Style/RepleCSS.js';
const RepleContent = (props) => {
  const [modal, setModal] = useState(false);

  const modalHandler = () => {
    setModal(true);
  };

  return (
    <div>
      <RepleContentDiv>
        <div className="author">
          <p>{props.list.author.displayName}</p>
          <div className="modalControl">
            <span onClick={modalHandler}>...</span>
            {modal && (
              <div className="modalDiv">
                <p>수정</p>
                <p className="delete">삭제</p>
              </div>
            )}
          </div>
        </div>
        <p>{props.list.reple}</p>
      </RepleContentDiv>
    </div>
  );
};

export default RepleContent;
