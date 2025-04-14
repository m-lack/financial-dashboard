import ReExt from "@sencha/reext";

export const Reports = (props) => {
  const transactionData = [
    {
      category: "Food",
      amount: 320,
      type: "Expense",
      date: "2025-04-01",
      description: "Grocery shopping",
    },
    {
      category: "Rent",
      amount: 1200,
      type: "Expense",
      date: "2025-04-01",
      description: "Monthly rent",
    },
    {
      category: "Salary",
      amount: 3000,
      type: "Income",
      date: "2025-04-02",
      description: "Monthly salary",
    },
    {
      category: "Transport",
      amount: 150,
      type: "Expense",
      date: "2025-04-03",
      description: "Fuel and public transit",
    },
    {
      category: "Freelance",
      amount: 800,
      type: "Income",
      date: "2025-04-05",
      description: "Design project",
    },
    {
      category: "Entertainment",
      amount: 250,
      type: "Expense",
      date: "2025-04-07",
      description: "Movies and dining",
    },
    {
      category: "Utilities",
      amount: 180,
      type: "Expense",
      date: "2025-04-10",
      description: "Electricity and water",
    },
    {
      category: "Internet",
      amount: 75,
      type: "Expense",
      date: "2025-04-10",
      description: "Monthly subscription",
    },
    {
      category: "Bonus",
      amount: 500,
      type: "Income",
      date: "2025-04-12",
      description: "Performance bonus",
    },
    {
      category: "Health",
      amount: 120,
      type: "Expense",
      date: "2025-04-15",
      description: "Gym membership",
    },
  ];

  const totalExpense = transactionData
    .filter((t) => t.type === "Expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalIncome = transactionData
    .filter((t) => t.type === "Income")
    .reduce((acc, t) => acc + t.amount, 0);

  const netBalance = totalIncome - totalExpense;
  const categories = [...new Set(transactionData.map((item) => item.category))];

  const monthlyData = [
    { month: "Jan", income: 3800, expense: 2100 },
    { month: "Feb", income: 3900, expense: 2300 },
    { month: "Mar", income: 4200, expense: 2200 },
    { month: "Apr", income: 4300, expense: 2175 },
  ];

  return (
    <ReExt
      xtype="panel"
      config={{
        title: props.title || "Financial Reports Dashboard",
        layout: {
          type: "vbox",
          align: "stretch",
        },
        bodyPadding: 15,
        style: {
          background: "#f5f7fa",
        },
        tools: [
          {
            type: "refresh",
            tooltip: "Refresh Reports",
            handler: function () {
              Ext.toast("Reports refreshed", "Success");
            },
          },
        ],
        tbar: {
          items: [
            {
              xtype: "datefield",
              fieldLabel: "From",
              labelWidth: 40,
              width: 160,
              format: "Y-m-d",
              value: "2025-03-01",
            },
            {
              xtype: "datefield",
              fieldLabel: "To",
              labelWidth: 30,
              width: 150,
              format: "Y-m-d",
              value: "2025-04-30",
            },
            {
              xtype: "button",
              text: "Apply Filter",
              margin: "0 0 0 10",
              handler: function () {
                Ext.toast("Filter applied", "Success");
              },
            },
          ],
        },
        defaults: {
          xtype: "panel",
          margin: "0 0 15 0",
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
            height: 100,
            layout: {
              type: "hbox",
              align: "stretch",
            },
            items: [
              {
                xtype: "panel",
                flex: 1,
                margin: "0 5 0 0",
                style: {
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  padding: "15px",
                  textAlign: "center",
                },
                items: [
                  {
                    xtype: "component",
                    html: `<div>
                      <div style="font-size:14px;color:#666;">Total Income</div>
                      <div style="font-size:24px;font-weight:bold;color:#34a853;">$${totalIncome}</div>
                      <div style="font-size:12px;color:#888;">This period</div>
                    </div>`,
                  },
                ],
              },
              {
                xtype: "panel",
                flex: 1,
                margin: "0 5 0 5",
                style: {
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  padding: "15px",
                  textAlign: "center",
                },
                items: [
                  {
                    xtype: "component",
                    html: `<div>
                      <div style="font-size:14px;color:#666;">Total Expenses</div>
                      <div style="font-size:24px;font-weight:bold;color:#ea4335;">$${totalExpense}</div>
                      <div style="font-size:12px;color:#888;">This period</div>
                    </div>`,
                  },
                ],
              },
              {
                xtype: "panel",
                flex: 1,
                margin: "0 0 0 5",
                style: {
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  padding: "15px",
                  textAlign: "center",
                },
                items: [
                  {
                    xtype: "component",
                    html: `<div>
                      <div style="font-size:14px;color:#666;">Net Balance</div>
                      <div style="font-size:24px;font-weight:bold;color:${
                        netBalance >= 0 ? "#34a853" : "#ea4335"
                      }">$${netBalance}</div>
                      <div style="font-size:12px;color:#888;">This period</div>
                    </div>`,
                  },
                ],
              },
            ],
          },

          {
            flex: 1,
            items: [
              {
                xtype: "polar",
                flex: 1,
                margin: "0 7 0 0",
                style: {
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                },
                title: {
                  text: "Income vs Expenses",
                  style: {
                    fontSize: "16px",
                    fontWeight: "600",
                    padding: "10px",
                  },
                },
                store: {
                  data: [
                    {
                      type: "Expenses",
                      amount: totalExpense,
                      percentage: Math.round(
                        (totalExpense / (totalExpense + totalIncome)) * 100
                      ),
                    },
                    {
                      type: "Income",
                      amount: totalIncome,
                      percentage: Math.round(
                        (totalIncome / (totalExpense + totalIncome)) * 100
                      ),
                    },
                  ],
                },
                insetPadding: 30,
                legend: {
                  docked: "bottom",
                },
                interactions: ["rotate", "itemhighlight"],
                series: [
                  {
                    type: "pie",
                    angleField: "amount",
                    label: {
                      field: "percentage",
                      display: "rotate",
                      font: "12px Arial",
                      renderer: function (
                        text,
                        sprite,
                        config,
                        renderData,
                        index
                      ) {
                        return text + "%";
                      },
                    },
                    tooltip: {
                      trackMouse: true,
                      renderer: function (tooltip, record, item) {
                        tooltip.setHtml(
                          record.get("type") + ": $" + record.get("amount")
                        );
                      },
                    },
                    highlight: true,
                    donut: 45,
                    colors: ["#ea4335", "#34a853"],
                  },
                ],
              },

              {
                xtype: "cartesian",
                flex: 1,
                margin: "0 0 0 7",
                style: {
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                },
                title: {
                  text: "Monthly Trends",
                  style: {
                    fontSize: "16px",
                    fontWeight: "600",
                    padding: "10px",
                  },
                },
                store: {
                  data: monthlyData,
                },
                legend: {
                  docked: "bottom",
                },
                axes: [
                  {
                    type: "numeric",
                    position: "left",
                    title: "Amount ($)",
                    grid: true,
                    minimum: 0,
                  },
                  {
                    type: "category",
                    position: "bottom",
                    title: "Month",
                    grid: true,
                  },
                ],
                series: [
                  {
                    type: "line",
                    title: "Income",
                    xField: "month",
                    yField: "income",
                    marker: {
                      type: "circle",
                      radius: 4,
                    },
                    style: {
                      lineWidth: 2,
                      strokeStyle: "#34a853",
                    },
                    highlight: {
                      fillStyle: "#000",
                      radius: 5,
                      lineWidth: 2,
                      strokeStyle: "#fff",
                    },
                    tooltip: {
                      trackMouse: true,
                      renderer: function (tooltip, record, item) {
                        tooltip.setHtml(
                          "Income in " +
                            record.get("month") +
                            ": $" +
                            record.get("income")
                        );
                      },
                    },
                  },
                  {
                    type: "line",
                    title: "Expenses",
                    xField: "month",
                    yField: "expense",
                    marker: {
                      type: "circle",
                      radius: 4,
                    },
                    style: {
                      lineWidth: 2,
                      strokeStyle: "#ea4335",
                    },
                    highlight: {
                      fillStyle: "#000",
                      radius: 5,
                      lineWidth: 2,
                      strokeStyle: "#fff",
                    },
                    tooltip: {
                      trackMouse: true,
                      renderer: function (tooltip, record, item) {
                        tooltip.setHtml(
                          "Expenses in " +
                            record.get("month") +
                            ": $" +
                            record.get("expense")
                        );
                      },
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
                xtype: "cartesian",
                flex: 1,
                margin: "0 7 0 0",
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
                interactions: ["itemhighlight"],
                axes: [
                  {
                    type: "numeric",
                    position: "left",
                    title: "Amount ($)",
                    grid: true,
                    minimum: 0,
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
                    highlight: {
                      fillStyle: "#1a73e8",
                    },
                    tooltip: {
                      trackMouse: true,
                      renderer: function (tooltip, record, item) {
                        tooltip.setHtml(
                          record.get("category") +
                            ": $" +
                            record.get("amount") +
                            "<br>" +
                            record.get("description")
                        );
                      },
                    },
                  },
                ],
              },

              {
                xtype: "grid",
                flex: 1,
                margin: "0 0 0 7",
                style: {
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                },
                title: {
                  text: "Transaction Details",
                  style: {
                    fontSize: "16px",
                    fontWeight: "600",
                    padding: "10px",
                  },
                },
                store: {
                  data: transactionData,
                  sorters: [
                    {
                      property: "date",
                      direction: "DESC",
                    },
                  ],
                },
                features: [
                  {
                    ftype: "grouping",
                    groupHeaderTpl: "{name}",
                    hideGroupedHeader: false,
                    enableGroupingMenu: true,
                  },
                ],
                columns: [
                  {
                    text: "Date",
                    dataIndex: "date",
                    width: 100,
                    sortable: true,
                    formatter: 'date("Y-m-d")',
                  },
                  {
                    text: "Category",
                    dataIndex: "category",
                    width: 120,
                    sortable: true,
                    filter: {
                      type: "list",
                      options: categories,
                    },
                  },
                  {
                    text: "Description",
                    dataIndex: "description",
                    flex: 1,
                    sortable: true,
                  },
                  {
                    text: "Amount",
                    dataIndex: "amount",
                    width: 100,
                    sortable: true,
                    align: "right",
                    renderer: function (value) {
                      return "$" + value;
                    },
                  },
                  {
                    text: "Type",
                    dataIndex: "type",
                    width: 100,
                    sortable: true,
                    renderer: function (value) {
                      return value === "Income"
                        ? '<span style="color:#34a853;">' + value + "</span>"
                        : '<span style="color:#ea4335;">' + value + "</span>";
                    },
                    filter: {
                      type: "list",
                      options: ["Income", "Expense"],
                    },
                  },
                ],
                viewConfig: {
                  enableTextSelection: true,
                  stripeRows: true,
                },
                selModel: {
                  selType: "rowmodel",
                  mode: "MULTI",
                },
                bbar: {
                  xtype: "pagingtoolbar",
                  displayInfo: true,
                },
              },
            ],
          },

          {
            height: 250,
            items: [
              {
                xtype: "tabpanel",
                flex: 1,
                style: {
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                },
                tabBar: {
                  layout: {
                    pack: "center",
                  },
                },
                items: [
                  {
                    title: "Summary",
                    bodyPadding: 15,
                    items: [
                      {
                        xtype: "component",
                        html: `
                          <div style="font-size:14px;">
                            <h3 style="margin-top:0">Financial Overview</h3>
                            <p>Your current financial status shows a net balance of <strong style="color:${
                              netBalance >= 0 ? "#34a853" : "#ea4335"
                            }">$${netBalance}</strong>.</p>
                            <p>Largest expense category: <strong>Rent</strong> at $1200 (${Math.round(
                              (1200 / totalExpense) * 100
                            )}% of total expenses)</p>
                            <p>Main income source: <strong>Salary</strong> at $3000 (${Math.round(
                              (3000 / totalIncome) * 100
                            )}% of total income)</p>
                          </div>
                        `,
                      },
                    ],
                  },
                  {
                    title: "Insights",
                    bodyPadding: 15,
                    items: [
                      {
                        xtype: "component",
                        html: `
                          <div style="font-size:14px;">
                            <h3 style="margin-top:0">Financial Insights</h3>
                            <ul>
                              <li>Your income is ${Math.round(
                                (totalIncome / totalExpense) * 100
                              )}% of your expenses</li>
                              <li>Monthly income is trending ${
                                monthlyData[3].income > monthlyData[2].income
                                  ? "up"
                                  : "down"
                              } compared to last month</li>
                              <li>Monthly expenses are trending ${
                                monthlyData[3].expense > monthlyData[2].expense
                                  ? "up"
                                  : "down"
                              } compared to last month</li>
                              <li>Your savings rate is approximately ${Math.round(
                                ((totalIncome - totalExpense) / totalIncome) *
                                  100
                              )}% of income</li>
                            </ul>
                          </div>
                        `,
                      },
                    ],
                  },
                  {
                    title: "Recommendations",
                    bodyPadding: 15,
                    items: [
                      {
                        xtype: "component",
                        html: `
                          <div style="font-size:14px;">
                            <h3 style="margin-top:0">Personalized Recommendations</h3>
                            <ul>
                              <li>${
                                netBalance >= 0
                                  ? "Consider increasing your savings or investments"
                                  : "Focus on reducing non-essential expenses"
                              }</li>
                              <li>Review your Entertainment spending which makes up ${Math.round(
                                (250 / totalExpense) * 100
                              )}% of your expenses</li>
                              <li>Monitor your utility bills which account for ${Math.round(
                                (180 / totalExpense) * 100
                              )}% of monthly expenses</li>
                              <li>${
                                totalIncome > 4000
                                  ? "Consider tax optimization strategies for your income level"
                                  : "Look for additional income sources to boost your earnings"
                              }</li>
                            </ul>
                          </div>
                        `,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        bbar: {
          xtype: "toolbar",
          items: [
            {
              xtype: "component",
              html: '<div style="color:#888;">Last updated: April 14, 2025</div>',
            },
            "->",
            {
              xtype: "button",
              text: "Save Report",
              iconCls: "x-fa fa-save",
              handler: function () {
                Ext.toast("Report saved successfully", "Success");
              },
            },
          ],
        },
      }}
    />
  );
};
