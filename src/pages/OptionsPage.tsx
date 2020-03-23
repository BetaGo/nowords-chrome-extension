import React from "react";
import Login from "../components/Options/Login";

const isLogin = false;

const OptionsPage = () => {
  if (!isLogin) return <Login />;
  return (
    <div>
      <div>配置页</div>
    </div>
  );
};

export default OptionsPage;
