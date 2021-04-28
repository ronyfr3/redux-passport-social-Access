import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { getUser } from "./redux/actions/Auth";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  console.log("user:--->", user);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>Social Login</h2>
      <h2>Welcome {user ? user.username : null}</h2>
      <a
        href="/auth/facebook"
        style={{
          border: "none",
          outline: "none",
          width: "350px",
          margin: "10px",
          backgroundColor: "blue",
          cursor: "pointer",
          textDecoration: "none",
          color: "white",
          fontSize: "20px",
          textAlign: "center",
          padding: "15px",
          borderRadius: "5px",
        }}
      >
        Facebook
      </a>
      <a
        href="/auth/google"
        style={{
          border: "none",
          outline: "none",
          width: "350px",
          margin: "10px",
          backgroundColor: "crimson",
          cursor: "pointer",
          textDecoration: "none",
          color: "white",
          fontSize: "20px",
          textAlign: "center",
          padding: "15px",
          borderRadius: "5px",
        }}
      >
        Google
      </a>
      <a
        href="/profile/logout"
        style={{
          border: "none",
          outline: "none",
          width: "350px",
          margin: "10px",
          backgroundColor: "black",
          cursor: "pointer",
          textDecoration: "none",
          color: "white",
          fontSize: "20px",
          textAlign: "center",
          padding: "15px",
          borderRadius: "5px",
        }}
      >
        Log Out
      </a>
    </div>
  );
}

export default App;
