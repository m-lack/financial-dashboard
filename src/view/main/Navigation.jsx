import ReExt from "@sencha/reext";
import { useState } from "react";
import { Dashboard } from "../dashboard/Dashboard";
import { Transactions } from "../transactions/Transactions";
import { Reports } from "../reports/Reports";
import { Analytics } from "../analytics/Analytics";

export const Navigation = (props) => {
  const [card, setCard] = useState(false);
  return (
    <ReExt
      xtype="tabpanel"
      config={{
        title: "Financial Application",
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
      <Analytics title="Analytics" />
    </ReExt>
  );
};
