import React from "react";
import ReactDOM from "react-dom/client";
import { Fill, ReExtProvider } from "@sencha/reext";
import App from "./App";

Fill();
window.__IS_REEXT_RUNNING__ = true;
var reactroot = ReactDOM.createRoot(document.getElementById("root"));
var ReExtData = {
  sdkversion: "7.8.0",
  toolkit: "classic",
  theme: "triton",
  packages: {
    charts: true,
    fontawesome: true,
    ux: false,
    calendar: false,
    d3: false,
    exporter: false,
    pivot: false,
    pivotd3: false,
    pivotlocale: false,
    froalaeditor: false,
  },
  rtl: false,
  locale: "en",
  debug: false,
  urlbase: "./",
  location: "remote",
  overrides: false,
};
reactroot.render(
  <React.StrictMode>
    <ReExtProvider
      reextkey={
        "NEN4Tk42aGFNUTN3X2Q2YTNNdWhRb0F5ZTVxU0VRNHpQajFtYVBKM0lIMi45bEROMWd6TnlZRE4zRWpPaUFIZWxKQ0xpZzJhNHBYTW50V01uVjJZMEltYm5abmUzY21NNGhYY3FGRE1mUldhc0ppT2lJV2R6SnllLjlKaU4xSXpVSUppT2ljR2JoSnll"
      }
      ReExtData={ReExtData}
      splash={true}
    >
      <App />
    </ReExtProvider>
  </React.StrictMode>
);
