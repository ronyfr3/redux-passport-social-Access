import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  const Axiosinstance = axios.create({
    withCredentials: true,
  });
  const loginwithfb = () => {
    Axiosinstance.get("http://localhost:5000/auth/facebook").then((res) => {
      const info = res.data;
      setData(info);
    });
  };
  console.log("data:", data);
  return (
    <div className="App">
      <button onClick={loginwithfb}>Facebook</button>
    </div>
  );
}

export default App;
