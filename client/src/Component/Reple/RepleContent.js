import React, { useEffect, useRef, useState } from "react";
import { RepleContentDiv, RepleUploadDiv } from "../../Style/RepleCSS.js";
import { useSelector } from "react-redux";
import axios from "axios";

const RepleContent = (props) => {
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [reple, setReple] = useState(props.list.reple);
  const user = useSelector((state) => state.user);
  // console.log(user.uid);
  // console.log(props.list.author.uid);

  //모달 작업
  //useOnClickOutside 반응형 훅
  //1. 불러와서
  const ref = useRef();
  //2 setModal로 변경 후 맨아래 작업
  useOnClickOutside(ref, () => setModal(false));
  //
  const modalHandler = () => {
    setModal(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let body = {
      uid: user.uid,
      reple: reple,
      postId: props.list.postId,
    };
    axios.post("/api/reple/edit", body).then((res) => {
      if (res.data.success) {
        alert("댓글 수정 완료되었습니다.");
      } else {
        alert("댓글 수정 오류..");
      }
      return window.location.reload();
    });
  };

  const editHandler = () => {
    setEdit(true);
    setModal(false);
  };
  const editCancelHandler = (e) => {
    e.preventDefault();
    setEdit(false);
  };
  return (
    <div>
      <RepleContentDiv>
        <div className="author">
          <p>{props.list.author.displayName}</p>
          {props.list.author.uid === user.uid && (
            <div className="modalControl">
              <span onClick={modalHandler}>...</span>
              {modal && (
                //
                <div className="modalDiv" ref={ref}>
                  <p onClick={editHandler}>수정</p>
                  <p className="delete">삭제</p>
                </div>
              )}
            </div>
          )}
        </div>
        {edit ? (
          <RepleUploadDiv>
            <form>
              <input
                type="text"
                value={reple}
                onChange={(e) => {
                  setReple(e.currentTarget.value);
                }}
              />
              <button onClick={submitHandler}>수정 완료</button>
            </form>
            <div className="cancel">
              <button onClick={editCancelHandler}>취소</button>
            </div>
          </RepleUploadDiv>
        ) : (
          <p>{props.list.reple}</p>
        )}
      </RepleContentDiv>
    </div>
  );
};

//후크를 사용하면 지정된 요소 외부의 클릭을 감지합니다.
//참조// https://usehooks.com/useOnClickOutside/
//3
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      console.log(ref);
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    //모바일
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      //모바일
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
export default RepleContent;
