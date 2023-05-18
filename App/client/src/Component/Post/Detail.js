import { Link, useNavigate, useParams } from "react-router-dom";
//아래 두개 스피너
// import Loading from './../assets/Spinner';
import { BtnDiv, Post, PostDiv } from "../../Style/PostDetailCSS";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";
import axios from "axios";

import moment from "moment";
import "moment/locale/ko";

const Detail = (props) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  // console.log(user.photoURL);
  //현재 페이지 id 때문..
  const params = useParams();

  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do hh:mm a") + "(수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do hh:mm a");
    }
  };

  const deleteHandler = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      // console.log(params.postNum); //post id값 ex)1
      let body = {
        //let body =
        postNum: params.postNum,
      };
      axios
        .post("/api/post/delete", body)
        .then((res) => {
          if (res.data.success) {
            alert("게시글이 삭제되었습니다.");
            navigate("/");
          }
        })
        .catch((err) => {
          alert("게시글이 삭제 실패되었습니다.");
        });
    }
  };
  // console.log(props);
  return (
    <PostDiv>
      <Post>
        <h2>{props.postDetil.title}</h2>
        <div className="author">
          <Avatar
            style={{
              background: "rgb(232, 232, 232)",
              border: "1px solid rgb(210, 210, 210)",
            }}
            size="40"
            round={true}
            src={user.photoURL}
          />
          작성자 : {props.postDetil.author.displayName}
          <p className="time">
            {SetTime(props.postDetil.createdAt, props.postDetil.updatedAt)}
          </p>
        </div>
        {props.postDetil.image ? (
          <img
            //배포하면 배포 환경에 맞게 주소 수정해야됨
            // src={`http://localhost:5000/${postDetil.image}`}
            src={props.postDetil.image}
            alt="이미지"
            style={{ width: "100%", height: "auto" }}
          />
        ) : null}

        <p>{props.postDetil.content}</p>
      </Post>
      {/* uid 값이 일치하면 수정 및 삭제 on */}
      {user.uid === props.postDetil.author.uid && (
        <BtnDiv>
          <Link to={`/edit/${props.postDetil.postNum}`}>
            <button className="edit">수정</button>
          </Link>
          <Link>
            <button onClick={deleteHandler} className="delete">
              삭제
            </button>
          </Link>
        </BtnDiv>
      )}
    </PostDiv>
  );
};

export default Detail;
