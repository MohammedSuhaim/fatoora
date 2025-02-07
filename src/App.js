import React, { useEffect } from "react";
import AppRoutes from "./Components/AppRouters/AppRouter";
import "./App.css";
import { generateAuthToken } from "./Components/Usersetting/Basicapi";

export default function App() {
  const HandleGenarateTOken = () => {
    generateAuthToken()
      .then((res) => {
        localStorage.setItem("generate_token", res.data.access_token);
      })
      .catch((e) => console.log(e.message, "error"));
    console.log("HIT YTOKEN resresresresresres1234567890");
  };

  useEffect(() => {
    HandleGenarateTOken();
  }, []);

  return (
    <div>
      {" "}
      <AppRoutes />
    </div>
  );
}
