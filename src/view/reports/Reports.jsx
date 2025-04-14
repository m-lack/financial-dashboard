import ReExt from "@sencha/reext";

export const Reports = (props) => {
  const transactionData = [
    { category: "Food", amount: 320, type: "Expense" },
    { category: "Rent", amount: 1200, type: "Expense" },
    { category: "Salary", amount: 3000, type: "Income" },
    { category: "Transport", amount: 150, type: "Expense" },
    { category: "Freelance", amount: 800, type: "Income" },
    { category: "Entertainment", amount: 250, type: "Expense" },
  ];

  return (
    <ReExt
      xtype="panel"
      config={{
        title: props.title || "Reports",
        layout: {
          type: "vbox",
          align: "stretch",
        },
        bodyPadding: 10,
        style: {
          background: "#f5f7fa",
        },
        defaults: {
          xtype: "panel",
          margin: "0 0 10 0",
          layout: {
            type: "hbox",
            align: "stretch",
          },
          style: {
            background: "transparent",
            border: "none",
          },
        },
        items: [
          {
            flex: 1,
            items: [
              {
                xtype: "polar",
                flex: 1,
                margin: "0 5 0 0",
                style: {
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                },
                title: {
                  text: "Expenses vs Income",
                  style: {
                    fontSize: "16px",
                    fontWeight: "600",
                    padding: "10px",
                  },
                },
                store: {
                  data: [
                    {
                      type: "Expense",
                      amount: transactionData
                        .filter((t) => t.type === "Expense")
                        .reduce((acc, t) => acc + t.amount, 0),
                    },
                    {
                      type: "Income",
                      amount: transactionData
                        .filter((t) => t.type === "Income")
                        .reduce((acc, t) => acc + t.amount, 0),
                    },
                  ],
                },
                insetPadding: 30,
                legend: {
                  docked: "bottom",
                },
                series: [
                  {
                    type: "pie",
                    angleField: "amount",
                    label: {
                      field: "type",
                      display: "rotate",
                      font: "12px Arial",
                    },
                    title: "Type",
                    donut: 30,
                    colors: ["#ea4335", "#34a853"],
                  },
                ],
              },
            ],
          },

          {
            flex: 1,
            items: [
              {
                xtype: "cartesian",
                flex: 1,
                style: {
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                },
                title: {
                  text: "Spending by Category",
                  style: {
                    fontSize: "16px",
                    fontWeight: "600",
                    padding: "10px",
                  },
                },
                store: {
                  data: transactionData.filter((t) => t.type === "Expense"),
                },
                axes: [
                  {
                    type: "numeric",
                    position: "left",
                    title: "Amount",
                    grid: true,
                  },
                  {
                    type: "category",
                    position: "bottom",
                    title: "Category",
                    label: { rotate: { degrees: -45 } },
                  },
                ],
                series: [
                  {
                    type: "bar",
                    xField: "category",
                    yField: "amount",
                    style: {
                      fillStyle: "#4285f4",
                    },
                  },
                ],
              },
            ],
          },

          {
            flex: 1,
            items: [
              {
                xtype: "grid",
                flex: 1,
                style: {
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                },
                title: {
                  text: "Transaction Summary",
                  style: {
                    fontSize: "16px",
                    fontWeight: "600",
                    padding: "10px",
                  },
                },
                store: {
                  data: transactionData,
                },
                columns: [
                  { text: "Category", dataIndex: "category", flex: 1 },
                  { text: "Amount", dataIndex: "amount", flex: 1 },
                  { text: "Type", dataIndex: "type", flex: 1 },
                ],
              },
            ],
          },
        ],
      }}
    />
  );
};
