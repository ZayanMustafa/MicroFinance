import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/error/notfound";
import MainPage from "./pages/user/main";
import LoanCards from "./components/loancards";
import Loader from "./components/loader";
import UserApplications from "./pages/user/application";
import AdminMain from "./pages/admin/adminmain";

export default function App() {
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);  
    }, 800);  

    return () => clearTimeout(timer);  
  }, []);

  if (loading) {
    return < Loader />;  
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/admin"} element={<AdminMain/>} ></Route>
        <Route path={"/app"} element={ <LoanCards/> } ></Route>
        <Route path={"/application"} element={< UserApplications/>} ></Route>
        <Route  path={"/"} element={< MainPage/>} ></Route>
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
