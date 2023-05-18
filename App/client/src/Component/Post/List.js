import { ListDiv, ListItem } from "../../Style/ListCSS";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import moment from "moment";
//한국어 설정 안되면 아래 주석 사용
import "moment/locale/ko";

const List = (props) => {
  // console.log(postList);

  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do h:mm a") + " (수정완료)";
    } else {
      return moment(a).format("YYYY년 MMMM Do h:mm a");
    }
  };

  return (
    <ListDiv>
      {props.postList.map((post, i) => {
        return (
          <ListItem key={i}>
            {/* post 클릭시 고유의 num page로 이동 */}
            <Link to={`/post/${post.postNum}`}>
              <p className="title" style={{ fontFamily: "Nanum Pen Script" }}>
                {post.title}
              </p>
              <div className="author">
                <div>
                  <Avatar
                    style={{
                      background: "rgb(232, 232, 232)",
                      border: "1px solid rgb(210, 210, 210)",
                    }}
                    size="40"
                    round={true}
                    src={post.author.photoURL}
                  />
                  <p className="author">{post.author.displayName}</p>
                </div>
                {/* 참조 https://momentjs.com/ */}
                <p className="time">
                  {SetTime(post.createdAt, post.updatedAt)}
                </p>
              </div>
              <p style={{ fontFamily: "Nanum Pen Script" }}>{post.content}</p>
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
  );
};

export default List;
