import React, { useEffect } from "react";
import AppRoutes from "./Components/AppRouters/AppRouter";
import "./App.css";
import { generateAuthToken } from "./Components/Usersetting/Basicapi";

export default function App() {
  const HandleGenarateTOken = () => {
    generateAuthToken()
      .then((res) => {
        // console.log(res,'resresresresresres1234567890');
        localStorage.setItem("generate_token", res.data.access_token);
        // console.log(res.data.access_token, "toekn response");
      })
      .catch((e) => console.log(e.message, "error"));
  };

  useEffect(() => {
    HandleGenarateTOken();
    console.log("HIT YTOKEN resresresresresres1234567890");
  }, []);

  return (
    <div>
      {" "}
      <AppRoutes />
    </div>
  );
}
