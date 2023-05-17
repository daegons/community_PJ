import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MyPageDiv } from "../../Style/UserCSS.js";
import Avatar from "react-avatar";

const MyPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  //   console.log(user.photoURL);
  useEffect(() => {
    //유저 로그인시에도 Login창 이동되서 user.isLoading 추가
    if (user.isLoading && !user.accessToken) {
      navigate("/login");
    }
  }, [user]);

  return (
    <MyPageDiv style={{ width: "100vw", height: "100vh" }}>
      <form
        style={{
          width: "50%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <label>
          <input type="file" accept="image/*" style={{ display: "none" }} />
          <Avatar
            style={{
              background: "rgb(232, 232, 232)",
              border: "1px solid rgb(210, 210, 210)",
              cursor: "pointer",
            }}
            size="100"
            round={true}
            src={user.photoURL}
          />
        </label>
        <button>저장</button>
      </form>
    </MyPageDiv>
  );
};

export default MyPage;
