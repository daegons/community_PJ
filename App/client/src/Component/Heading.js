import React from "react";
import { Link, useNavigate } from "react-router-dom";
//bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import firebase from "firebase/compat/app";

const Heading = () => {
  const font = { fontFamily: "'Yeon Sung', cursive" };
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const logoutHandler = () => {
    alert(`${user.displayName}님 안녕히가세요.`);
    firebase.auth().signOut();
    navigate("/");
  };
  return (
    <Navbar bg="dark" expand="md" variant="dark">
      <Container>
        <Navbar.Brand href="/" style={font}>
          커뮤니티
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "'Yeon Sung', cursive",
                marginRight: "10px",
              }}
            >
              home
            </Link>
            <Link
              to="/upload"
              style={{
                textDecoration: "none",
                color: "white",
                marginRight: "10px",
                fontFamily: "'Yeon Sung', cursive",
              }}
            >
              upload
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              marginRight: "15px",
              fontFamily: "'Yeon Sung', cursive",
            }}
          >
            {user.displayName
              ? `${user.displayName}님 접속중..`
              : `로그인해주세요.`}
          </Link>
          {user.accessToken ? (
            <>
              <br />
              <Navbar.Text
                onClick={() => {}}
                style={{ color: "white", cursor: "pointer" }}
              >
                <Link
                  to="/mypage"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginRight: "15px",
                    fontFamily: "'Yeon Sung', cursive",
                  }}
                >
                  MyPage
                </Link>
              </Navbar.Text>
              <br />
              <Navbar.Text
                onClick={logoutHandler}
                style={{ color: "white", cursor: "pointer" }}
              >
                logout
              </Navbar.Text>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "'Yeon Sung', cursive",
              }}
            >
              login
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Heading;
