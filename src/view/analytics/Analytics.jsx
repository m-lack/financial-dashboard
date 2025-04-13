import ReExt from "@sencha/reext";
import React, { useState } from "react";

export const Analytics = (props) => {
  const transactionData = [
    {
      date: "2025-04-10",
      category: "Salary",
      description: "Monthly Salary",
      amount: 5000,
      type: "Income",
      balance: 8500,
    },
    {
      date: "2025-04-08",
      category: "Groceries",
      description: "Weekly groceries",
      amount: -120,
      type: "Expense",
      balance: 3500,
    },
    {
      date: "2025-04-05",
      category: "Utilities",
      description: "Electricity bill",
      amount: -85,
      type: "Expense",
      balance: 3620,
    },
    {
      date: "2025-04-03",
      category: "Dining",
      description: "Restaurant dinner",
      amount: -75,
      type: "Expense",
      balance: 3705,
    },
    {
      date: "2025-04-01",
      category: "Rental",
      description: "Rental Income",
      amount: 1200,
      type: "Income",
      balance: 3780,
    },
    {
      date: "2025-03-28",
      category: "Shopping",
      description: "New laptop",
      amount: -1200,
      type: "Expense",
      balance: 2580,
    },
    {
      date: "2025-03-25",
      category: "Transport",
      description: "Gas refill",
      amount: -45,
      type: "Expense",
      balance: 3780,
    },
    {
      date: "2025-03-22",
      category: "Healthcare",
      description: "Doctor visit",
      amount: -150,
      type: "Expense",
      balance: 3825,
    },
    {
      date: "2025-03-20",
      category: "Entertainment",
      description: "Movie tickets",
      amount: -30,
      type: "Expense",
      balance: 3975,
    },
    {
      date: "2025-03-15",
      category: "Education",
      description: "Online course",
      amount: -199,
      type: "Expense",
      balance: 4005,
    },
  ];

  const budgetData = [
    {
      category: "Housing",
      budgeted: 1500,
      actual: 1500,
      variance: 0,
      percentUsed: 100,
    },
    {
      category: "Utilities",
      budgeted: 300,
      actual: 285,
      variance: 15,
      percentUsed: 95,
    },
    {
      category: "Groceries",
      budgeted: 500,
      actual: 620,
      variance: -120,
      percentUsed: 124,
    },
    {
      category: "Dining",
      budgeted: 200,
      actual: 350,
      variance: -150,
      percentUsed: 175,
    },
    {
      category: "Transport",
      budgeted: 400,
      actual: 345,
      variance: 55,
      percentUsed: 86,
    },
    {
      category: "Healthcare",
      budgeted: 300,
      actual: 150,
      variance: 150,
      percentUsed: 50,
    },
    {
      category: "Entertainment",
      budgeted: 200,
      actual: 230,
      variance: -30,
      percentUsed: 115,
    },
    {
      category: "Shopping",
      budgeted: 400,
      actual: 1200,
      variance: -800,
      percentUsed: 300,
    },
  ];

  const forecastData = [
    {
      date: "2025-04-15",
      description: "Rent Payment",
      category: "Housing",
      amount: -1500,
      recurring: "Monthly",
      probability: 100,
    },
    {
      date: "2025-04-20",
      description: "Utility Bills",
      category: "Utilities",
      amount: -300,
      recurring: "Monthly",
      probability: 100,
    },
    {
      date: "2025-04-30",
      description: "Car Insurance",
      category: "Insurance",
      amount: -125,
      recurring: "Monthly",
      probability: 100,
    },
    {
      date: "2025-05-01",
      description: "Gym Membership",
      category: "Health",
      amount: -75,
      recurring: "Monthly",
      probability: 100,
    },
    {
      date: "2025-05-10",
      description: "Monthly Salary",
      category: "Income",
      amount: 5000,
      recurring: "Monthly",
      probability: 100,
    },
    {
      date: "2025-05-15",
      description: "Potential Client Payment",
      category: "Income",
      amount: 2500,
      recurring: "No",
      probability: 75,
    },
  ];

  const totalIncome = transactionData
    .filter((t) => t.type === "Income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactionData
    .filter((t) => t.type === "Expense")
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const expensesByCategory = transactionData
    .filter((t) => t.type === "Expense")
    .reduce((acc, t) => {
      const category = t.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += Math.abs(t.amount);
      return acc;
    }, {});

  const expenseCategoryData = Object.keys(expensesByCategory).map(
    (category) => ({
      category,
      amount: expensesByCategory[category],
    })
  );

  return (
    <ReExt
      xtype="panel"
      config={{
        title: props.title || "Analytics",
        layout: "border",
        style: {
          background: "#f5f7fa",
        },
        items: [
          {
            region: "north",
            xtype: "panel",
            height: 60,
            bodyStyle: "padding: 10px",
            layout: "hbox",
            style: {
              background: "#fff",
              borderBottom: "1px solid #e0e0e0",
            },
            items: [
              {
                xtype: "component",
                html: "<h2 style='margin:0;font-size:20px;'>Financial Analytics</h2>",
                flex: 1,
              },
            ],
          },

          {
            region: "west",
            xtype: "panel",
            title: "Filters",
            width: 300,
            collapsible: true,
            split: true,
            layout: "anchor",
            bodyPadding: 10,
            style: {
              background: "#fff",
              borderRight: "1px solid #e0e0e0",
            },
            defaults: {
              anchor: "100%",
              labelWidth: 120,
              margin: "0 0 10 0",
            },
            items: [
              {
                xtype: "fieldset",
                title: "Date Range",
                collapsible: true,
                style: {
                  borderRadius: "8px",
                },
                defaults: {
                  anchor: "100%",
                  labelWidth: 80,
                },
                items: [
                  {
                    xtype: "datefield",
                    fieldLabel: "From",
                    name: "startDate",
                    value: new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      1
                    ),
                  },
                  {
                    xtype: "datefield",
                    fieldLabel: "To",
                    name: "endDate",
                    value: new Date(),
                  },
                  {
                    xtype: "combo",
                    fieldLabel: "Preset",
                    name: "presetRange",
                    store: [
                      ["today", "Today"],
                      ["yesterday", "Yesterday"],
                      ["thisWeek", "This Week"],
                      ["lastWeek", "Last Week"],
                      ["thisMonth", "This Month"],
                      ["lastMonth", "Last Month"],
                      ["thisQuarter", "This Quarter"],
                      ["lastQuarter", "Last Quarter"],
                    ],
                    value: "thisMonth",
                    listeners: {
                      select: function (combo, records) {
                        alert("Date range updated to: " + combo.getValue());
                      },
                    },
                  },
                ],
              },

              {
                xtype: "fieldset",
                title: "Categories",
                collapsible: true,
                style: {
                  borderRadius: "8px",
                },
                defaults: {
                  anchor: "100%",
                },
                items: [
                  {
                    xtype: "tagfield",
                    fieldLabel: "Transaction Types",
                    name: "transactionTypes",
                    store: [
                      ["income", "Income"],
                      ["expense", "Expense"],
                      ["transfer", "Transfer"],
                    ],
                    value: ["income", "expense"],
                    queryMode: "local",
                    filterPickList: true,
                  },
                  {
                    xtype: "tagfield",
                    fieldLabel: "Categories",
                    name: "categories",
                    store: [
                      ["salary", "Salary"],
                      ["rental", "Rental Income"],
                      ["utilities", "Utilities"],
                      ["groceries", "Groceries"],
                      ["dining", "Dining"],
                      ["entertainment", "Entertainment"],
                      ["transport", "Transport"],
                      ["healthcare", "Healthcare"],
                      ["education", "Education"],
                      ["shopping", "Shopping"],
                    ],
                    queryMode: "local",
                    filterPickList: true,
                  },
                ],
              },

              {
                xtype: "fieldset",
                title: "Amount Range",
                collapsible: true,
                style: {
                  borderRadius: "8px",
                },
                defaults: {
                  anchor: "100%",
                  labelWidth: 80,
                },
                items: [
                  {
                    xtype: "numberfield",
                    fieldLabel: "Min Amount",
                    name: "minAmount",
                    value: 0,
                  },
                  {
                    xtype: "numberfield",
                    fieldLabel: "Max Amount",
                    name: "maxAmount",
                    value: 10000,
                  },
                ],
              },

              {
                xtype: "button",
                text: "Apply Filters",
                scale: "medium",
                style: {
                  background: "#4285f4",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  marginBottom: "10px",
                },
                handler: function () {
                  alert("Filters Applied: Data updated with selected filters");
                },
              },
              {
                xtype: "button",
                text: "Reset Filters",
                style: {
                  background: "#f1f3f4",
                  color: "#3c4043",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px 16px",
                },
                handler: function () {
                  alert("All filters have been reset to default values");
                },
              },
            ],
          },

          {
            region: "center",
            xtype: "tabpanel",
            style: {
              background: "#f5f7fa",
            },
            items: [
              {
                title: "Summary",
                layout: {
                  type: "vbox",
                  align: "stretch",
                },
                bodyPadding: 10,
                style: {
                  background: "#f5f7fa",
                },
                defaults: {
                  margin: "0 0 10 0",
                },
                items: [
                  {
                    xtype: "panel",
                    flex: 1,
                    layout: {
                      type: "hbox",
                      align: "stretch",
                    },
                    style: {
                      background: "transparent",
                      border: "none",
                    },
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
                          text: "Income vs Expenses",
                          style: {
                            fontSize: "16px",
                            fontWeight: "600",
                            padding: "10px",
                          },
                        },
                        store: {
                          data: [
                            { type: "Income", amount: totalIncome },
                            { type: "Expense", amount: totalExpense },
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
                            colors: ["#34a853", "#ea4335"],
                          },
                        ],
                      },

                      {
                        xtype: "cartesian",
                        flex: 1,
                        margin: "0 0 0 5",
                        style: {
                          background: "#fff",
                          borderRadius: "8px",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        },
                        title: {
                          text: "Expense Breakdown",
                          style: {
                            fontSize: "16px",
                            fontWeight: "600",
                            padding: "10px",
                          },
                        },
                        store: {
                          data: expenseCategoryData,
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
                    xtype: "panel",
                    flex: 1,
                    style: {
                      background: "#fff",
                      borderRadius: "8px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    },
                    layout: "fit",
                    title: "Monthly Trends",
                    items: [
                      {
                        xtype: "cartesian",
                        store: {
                          data: [
                            { month: "Jan", income: 4500, expense: 3800 },
                            { month: "Feb", income: 4800, expense: 3500 },
                            { month: "Mar", income: 5200, expense: 4200 },
                            { month: "Apr", income: 6200, expense: 4500 },
                          ],
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
                            title: "Month",
                          },
                        ],
                        series: [
                          {
                            type: "line",
                            xField: "month",
                            yField: "income",
                            title: "Income",
                            marker: {
                              type: "circle",
                              radius: 4,
                            },
                            style: {
                              lineWidth: 2,
                              strokeStyle: "#34a853",
                            },
                            tooltip: {
                              trackMouse: true,
                              renderer: function (tooltip, record, item) {
                                tooltip.setHtml(
                                  "Income: $" + record.get("income")
                                );
                              },
                            },
                          },
                          {
                            type: "line",
                            xField: "month",
                            yField: "expense",
                            title: "Expense",
                            marker: {
                              type: "circle",
                              radius: 4,
                            },
                            style: {
                              lineWidth: 2,
                              strokeStyle: "#ea4335",
                            },
                            tooltip: {
                              trackMouse: true,
                              renderer: function (tooltip, record, item) {
                                tooltip.setHtml(
                                  "Expense: $" + record.get("expense")
                                );
                              },
                            },
                          },
                        ],
                        legend: {
                          docked: "bottom",
                        },
                      },
                    ],
                  },
                ],
              },

              {
                title: "Detailed Analysis",
                layout: "fit",
                items: [
                  {
                    xtype: "grid",
                    store: {
                      data: transactionData,
                      groupField: "category",
                    },
                    style: {
                      background: "#fff",
                      borderRadius: "8px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    },
                    columns: [
                      { text: "Date", dataIndex: "date", width: 110 },
                      { text: "Category", dataIndex: "category", width: 120 },
                      {
                        text: "Description",
                        dataIndex: "description",
                        flex: 1,
                      },
                      {
                        text: "Amount",
                        dataIndex: "amount",
                        width: 120,
                        renderer: function (value) {
                          if (value > 0) {
                            return (
                              "<span style='color:green;'>$" +
                              value.toFixed(2) +
                              "</span>"
                            );
                          } else {
                            return (
                              "<span style='color:red;'>$" +
                              Math.abs(value).toFixed(2) +
                              "</span>"
                            );
                          }
                        },
                      },
                      { text: "Type", dataIndex: "type", width: 100 },
                      {
                        text: "Balance",
                        dataIndex: "balance",
                        width: 120,
                        renderer: function (value) {
                          return "$" + value.toFixed(2);
                        },
                      },
                    ],
                    features: [
                      {
                        ftype: "grouping",
                        groupHeaderTpl:
                          "{name} ({rows.length} Item{[values.rows.length > 1 ? 's' : '']})",
                        startCollapsed: false,
                      },
                    ],
                    bbar: {
                      xtype: "pagingtoolbar",
                      displayInfo: true,
                    },
                  },
                ],
              },

              {
                title: "Budget Analysis",
                layout: "fit",
                items: [
                  {
                    xtype: "grid",
                    store: {
                      data: budgetData,
                    },
                    style: {
                      background: "#fff",
                      borderRadius: "8px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    },
                    columns: [
                      { text: "Category", dataIndex: "category", flex: 1 },
                      {
                        text: "Budgeted",
                        dataIndex: "budgeted",
                        width: 120,
                        renderer: function (value) {
                          return "$" + value.toFixed(2);
                        },
                      },
                      {
                        text: "Actual",
                        dataIndex: "actual",
                        width: 120,
                        renderer: function (value) {
                          return "$" + value.toFixed(2);
                        },
                      },
                      {
                        text: "Variance",
                        dataIndex: "variance",
                        width: 120,
                        renderer: function (value) {
                          if (value >= 0) {
                            return (
                              "<span style='color:green;'>$" +
                              value.toFixed(2) +
                              "</span>"
                            );
                          } else {
                            return (
                              "<span style='color:red;'>$" +
                              Math.abs(value).toFixed(2) +
                              "</span>"
                            );
                          }
                        },
                      },
                      {
                        text: "% Used",
                        dataIndex: "percentUsed",
                        width: 120,
                        renderer: function (value) {
                          let color = "green";
                          if (value > 100) {
                            color = "red";
                          } else if (value > 90) {
                            color = "orange";
                          }
                          return (
                            "<span style='color:" +
                            color +
                            ";'>" +
                            value +
                            "%</span>"
                          );
                        },
                      },
                    ],
                    viewConfig: {
                      getRowClass: function (record) {
                        if (record.get("percentUsed") > 100) {
                          return "over-budget-row";
                        }
                        return "";
                      },
                    },
                  },
                ],
              },

              {
                title: "Forecast",
                layout: {
                  type: "vbox",
                  align: "stretch",
                },
                bodyPadding: 10,
                style: {
                  background: "#f5f7fa",
                },
                items: [
                  {
                    xtype: "panel",
                    flex: 1,
                    style: {
                      background: "#fff",
                      borderRadius: "8px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      marginBottom: "10px",
                    },
                    title: "Cash Flow Projection",
                    layout: "fit",
                    items: [
                      {
                        xtype: "cartesian",
                        store: {
                          data: [
                            { month: "Apr", balance: 3500 },
                            { month: "May", balance: 4200 },
                            { month: "Jun", balance: 5000 },
                            { month: "Jul", balance: 4800 },
                            { month: "Aug", balance: 5500 },
                            { month: "Sep", balance: 6200 },
                          ],
                        },
                        axes: [
                          {
                            type: "numeric",
                            position: "left",
                            title: "Balance",
                            grid: true,
                          },
                          {
                            type: "category",
                            position: "bottom",
                            title: "Month",
                          },
                        ],
                        series: [
                          {
                            type: "line",
                            xField: "month",
                            yField: "balance",
                            marker: {
                              type: "circle",
                              radius: 4,
                            },
                            style: {
                              lineWidth: 2,
                              strokeStyle: "#4285f4",
                            },
                            tooltip: {
                              trackMouse: true,
                              renderer: function (tooltip, record, item) {
                                tooltip.setHtml(
                                  "Projected Balance: $" + record.get("balance")
                                );
                              },
                            },
                          },
                        ],
                      },
                    ],
                  },

                  {
                    xtype: "grid",
                    flex: 1,
                    title: "Upcoming Transactions",
                    store: {
                      data: forecastData,
                    },
                    style: {
                      background: "#fff",
                      borderRadius: "8px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    },
                    columns: [
                      { text: "Date", dataIndex: "date", width: 110 },
                      {
                        text: "Description",
                        dataIndex: "description",
                        flex: 1,
                      },
                      { text: "Category", dataIndex: "category", width: 120 },
                      {
                        text: "Amount",
                        dataIndex: "amount",
                        width: 120,
                        renderer: function (value) {
                          if (value > 0) {
                            return (
                              "<span style='color:green;'>$" +
                              value.toFixed(2) +
                              "</span>"
                            );
                          } else {
                            return (
                              "<span style='color:red;'>$" +
                              Math.abs(value).toFixed(2) +
                              "</span>"
                            );
                          }
                        },
                      },
                      { text: "Recurring", dataIndex: "recurring", width: 100 },
                      {
                        text: "Probability",
                        dataIndex: "probability",
                        width: 100,
                        renderer: function (value) {
                          return value + "%";
                        },
                      },
                    ],
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
