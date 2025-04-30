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

  const totalExpenses = transactionData
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = transactionData
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  return (
    <ReExt
      xtype="panel"
      config={{
        title: props.title || "Financial Reports",
        scrollable: true,
        layout: {
          type: "vbox",
          align: "stretch",
        },
        flex: 1,
        height: "100%",
        bodyPadding: 15,
        defaults: {
          xtype: "panel",
          layout: {
            type: "hbox",
            align: "stretch",
            pack: "start",
          },
          margin: "0 0 20 0",
          responsiveConfig: {
            "width < 768": {
              layout: {
                type: "vbox",
                align: "stretch",
              },
            },
            "width >= 768": {
              layout: {
                type: "hbox",
                align: "stretch",
              },
            },
          },
          style: {
            background: "transparent",
            border: "none",
          },
        },
        items: [
          {
            items: [
              {
                xtype: "polar",
                // Reduced flex from 2 to 1 to make it smaller relative to other elements
                flex: 1,
                margin: "0 10 0 0",
                // Added height constraint to control the chart size
                height: 240,
                responsiveConfig: {
                  "width < 768": {
                    margin: "0 0 10 0",
                    // Smaller height on mobile
                    height: 200,
                  },
                },
                style: {
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                },
                title: {
                  text: "Income vs Expenses",
                  style: {
                    fontSize: "14px", // Reduced from 16px
                    fontWeight: "600",
                    padding: "8px", // Reduced from 10px
                  },
                },
                store: {
                  data: [
                    { type: "Income", amount: totalIncome },
                    { type: "Expense", amount: totalExpenses },
                  ],
                },
                // Reduced inset padding to make chart smaller
                insetPadding: 20,
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
                      font: "11px Arial", // Reduced from 12px
                    },
                    donut: 30,
                    colors: ["#34a853", "#ea4335"],
                    // Added to make pie chart smaller within its container
                    radiusField: 80,
                    innerPadding: 20,
                  },
                ],
              },
              {
                xtype: "container",
                flex: 1,
                padding: 0,
                style: {
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                },
                layout: {
                  type: "vbox",
                  align: "stretch",
                },
                items: [
                  {
                    xtype: "component",
                    height: 40,
                    html: `<div style="font-size: 16px; font-weight: 600; color: #1e293b; padding: 12px 16px; border-bottom: 1px solid #f1f5f9;">Financial Summary</div>`,
                  },
                  {
                    xtype: "container",
                    padding: "8px 0",
                    items: [
                      {
                        xtype: "component",
                        style: {
                          padding: "12px 16px",
                          borderRadius: "4px",
                          margin: "4px 12px",
                          background:
                            "linear-gradient(135deg, rgba(52,168,83,0.15), rgba(52,168,83,0.05))",
                          borderLeft: "4px solid #34a853",
                        },
                        html: `
                          <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                              <div style="font-size: 13px; color: #64748b; margin-bottom: 4px;">Total Income</div>
                              <div style="font-size: 20px; font-weight: bold; color: #34a853;">${totalIncome}</div>
                            </div>
                            <div style="background: rgba(52,168,83,0.15); border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34a853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="19" x2="12" y2="5"></line>
                                <polyline points="5 12 12 5 19 12"></polyline>
                              </svg>
                            </div>
                          </div>
                        `,
                      },
                      {
                        xtype: "component",
                        style: {
                          padding: "12px 16px",
                          borderRadius: "4px",
                          margin: "4px 12px",
                          background:
                            "linear-gradient(135deg, rgba(234,67,53,0.15), rgba(234,67,53,0.05))",
                          borderLeft: "4px solid #ea4335",
                        },
                        html: `
                          <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                              <div style="font-size: 13px; color: #64748b; margin-bottom: 4px;">Total Expenses</div>
                              <div style="font-size: 20px; font-weight: bold; color: #ea4335;">${totalExpenses}</div>
                            </div>
                            <div style="background: rgba(234,67,53,0.15); border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ea4335" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <polyline points="19 12 12 19 5 12"></polyline>
                              </svg>
                            </div>
                          </div>
                        `,
                      },
                      {
                        xtype: "component",
                        style: {
                          padding: "12px 16px",
                          borderRadius: "4px",
                          margin: "4px 12px",
                          background:
                            netBalance >= 0
                              ? "linear-gradient(135deg, rgba(26,115,232,0.15), rgba(26,115,232,0.05))"
                              : "linear-gradient(135deg, rgba(234,67,53,0.15), rgba(234,67,53,0.05))",
                          borderLeft: `4px solid ${
                            netBalance >= 0 ? "#1a73e8" : "#ea4335"
                          }`,
                        },
                        html: `
                          <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                              <div style="font-size: 13px; color: #64748b; margin-bottom: 4px;">Net Balance</div>
                              <div style="font-size: 20px; font-weight: bold; color: ${
                                netBalance >= 0 ? "#1a73e8" : "#ea4335"
                              };">${netBalance}</div>
                            </div>
                            <div style="background: ${
                              netBalance >= 0
                                ? "rgba(26,115,232,0.15)"
                                : "rgba(234,67,53,0.15)"
                            }; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${
                                netBalance >= 0 ? "#1a73e8" : "#ea4335"
                              }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                <line x1="6" y1="12" x2="18" y2="12"></line>
                              </svg>
                            </div>
                          </div>
                        `,
                      },
                    ],
                  },
                ],
              },
            ],
          },

          {
            items: [
              {
                xtype: "cartesian",
                flex: 1,
                // Added height constraint
                height: 280,
                style: {
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                },
                title: {
                  text: "Spending by Category",
                  style: {
                    fontSize: "14px", // Reduced from 16px
                    fontWeight: "600",
                    padding: "8px", // Reduced from 10px
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
                    highlight: true,
                  },
                ],
              },
            ],
          },

          {
            items: [
              {
                xtype: "grid",
                flex: 1,
                // Added height constraint
                height: 230,
                style: {
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                },
                title: {
                  text: "Transaction Summary",
                  style: {
                    fontSize: "14px", // Reduced from 16px
                    fontWeight: "600",
                    padding: "8px", // Reduced from 10px
                  },
                },
                store: {
                  data: transactionData,
                },
                columns: [
                  { text: "Category", dataIndex: "category", flex: 1 },
                  {
                    text: "Amount",
                    dataIndex: "amount",
                    flex: 1,
                    renderer: (val) => `$${val}`,
                  },
                  {
                    text: "Type",
                    dataIndex: "type",
                    flex: 1,
                    renderer: (val) => {
                      const color = val === "Income" ? "#34a853" : "#ea4335";
                      return `<span style="color:${color}; font-weight:bold;">${val}</span>`;
                    },
                  },
                ],
              },
            ],
          },
        ],
      }}
    />
  );
};
