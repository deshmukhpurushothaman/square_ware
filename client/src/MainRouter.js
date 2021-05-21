import React from "react";
import { Route, Switch } from "react-router-dom";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile"
import PrivateRoute from './auth/PrivateRoute'


const MainRouter = () => (
    <div>
    <div style={{ paddingTop: "80px" }} />
        <Switch>
            @HomePage  , @Users Route  @PUBLIC
            <Route exact path="/"           component={Signup} />
            <Route exact path="/signin"           component={Signin} /> 
            <PrivateRoute exact path="/profile"           component={Profile} />                    
        </Switch>
    </div>
);

export default MainRouter;