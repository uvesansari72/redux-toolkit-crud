import { BrowserRouter, Routes as Routers, Route } from "react-router-dom";
import React from 'react'
import Home from "../components/Home";

const Routes = () => {
  return (
    <BrowserRouter>
        <Routers>
            <Route path="/" element={<Home/>}/>
        </Routers>
    </BrowserRouter>
  )
}

export default Routes