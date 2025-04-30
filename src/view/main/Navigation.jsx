import ReExt from "@sencha/reext";
import { useState } from "react";
import { Dashboard } from "../dashboard/Dashboard";
import { Transactions } from "../transactions/Transactions";
import { Reports } from "../reports/Reports";

export const Navigation = (props) => {
  const [card, setCard] = useState(false);
  return (
    <ReExt
      xtype="tabpanel"
      config={{
        title: "Financial Application",
        tools: [
          {
            xtype: "button",
            text: "Logout",
            margin: "0 10px",
            handler: props.logoutMethod,
          },
        ],
        responsiveConfig: {
          tall: {
            tabPosition: "top",
          },
          wide: {
            tabPosition: "left",
            tabRotation: 0,
          },
        },
      }}
      onTabChange={(tabPanel, newCard, oldCard) => {
        setCard(newCard);
      }}
    >
      <Dashboard title="Dashboard" />
      <Transactions title="Transactions" />
      <Reports title="Reports" />
    </ReExt>
  );
};
