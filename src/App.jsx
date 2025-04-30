import ReExt from "@sencha/reext";
import { useState } from "react";
import { supabase } from "./supabaseClient";

import { Navigation } from "./view/main/Navigation";
import { LoginPanel } from "./login/LoginPanel";

import "./App.css";

const Samp = () => {
  const [isAuth, setIsAuth] = useState(false);

  const handleLogin = (params) => {
    if (params.success) {
      let dataString = Ext.util.Base64.encode(Ext.encode(params));
      sessionStorage.setItem("authData", dataString);
    }
    setIsAuth(params.success);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();

    let dataString = Ext.util.Base64.encode(Ext.encode({}));
    sessionStorage.setItem("authData", dataString);
    setIsAuth(false);
  };

  const getLoginData = () => {
    let sessionData = sessionStorage.getItem("authData");
    if (sessionData !== null) {
      return Ext.decode(Ext.util.Base64.decode(sessionData));
    } else {
      return {
        id_user: 0,
        token: "",
        success: false,
      };
    }
  };

  const renderView = () => {
    let data = getLoginData();
    if (isAuth || data.success) {
      return <Navigation logoutMethod={handleLogout} />;
    } else {
      return <LoginPanel loginMethod={handleLogin} />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>{renderView()}</div>
  );
};

export default Samp;
