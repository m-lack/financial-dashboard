import ReExt from "@sencha/reext";
import React, { useState, useEffect } from "react";

export const Analytics = (props) => {
  const [transactionData, setTransactionData] = useState([
    {
      date: "2025-04-10",
      category: "Salary",
      description: "Monthly Salary",
      amount: 5000,
      type: "Income",
    },
    {
      date: "2025-04-08",
      category: "Groceries",
      description: "Weekly groceries",
      amount: -120,
      type: "Expense",
    },
    {
      date: "2025-04-05",
      category: "Utilities",
      description: "Electricity bill",
      amount: -85,
      type: "Expense",
    },
    {
      date: "2025-04-03",
      category: "Dining",
      description: "Restaurant dinner",
      amount: -75,
      type: "Expense",
    },
    {
      date: "2025-04-01",
      category: "Rental",
      description: "Rental Income",
      amount: 1200,
      type: "Income",
    },
    {
      date: "2025-03-28",
      category: "Shopping",
      description: "New laptop",
      amount: -1200,
      type: "Expense",
    },
    {
      date: "2025-03-25",
      category: "Transport",
      description: "Gas refill",
      amount: -45,
      type: "Expense",
    },
    {
      date: "2025-03-22",
      category: "Healthcare",
      description: "Doctor visit",
      amount: -150,
      type: "Expense",
    },
    {
      date: "2025-03-20",
      category: "Entertainment",
      description: "Movie tickets",
      amount: -30,
      type: "Expense",
    },
    {
      date: "2025-03-15",
      category: "Education",
      description: "Online course",
      amount: -199,
      type: "Expense",
    },
    {
      date: "2025-03-10",
      category: "Salary",
      description: "Monthly Salary",
      amount: 5000,
      type: "Income",
    },
    {
      date: "2025-02-28",
      category: "Utilities",
      description: "Internet bill",
      amount: -65,
      type: "Expense",
    },
    {
      date: "2025-02-25",
      category: "Groceries",
      description: "Supermarket shopping",
      amount: -135,
      type: "Expense",
    },
    {
      date: "2025-02-20",
      category: "Transport",
      description: "Car maintenance",
      amount: -350,
      type: "Expense",
    },
    {
      date: "2025-02-15",
      category: "Dining",
      description: "Family dinner",
      amount: -120,
      type: "Expense",
    },
    {
      date: "2025-02-10",
      category: "Salary",
      description: "Monthly Salary",
      amount: 5000,
      type: "Income",
    },
    {
      date: "2025-02-05",
      category: "Investment",
      description: "Stock dividends",
      amount: 350,
      type: "Income",
    },
    {
      date: "2025-01-30",
      category: "Shopping",
      description: "Winter clothing",
      amount: -220,
      type: "Expense",
    },
    {
      date: "2025-01-25",
      category: "Healthcare",
      description: "Annual checkup",
      amount: -200,
      type: "Expense",
    },
    {
      date: "2025-01-20",
      category: "Entertainment",
      description: "Concert tickets",
      amount: -180,
      type: "Expense",
    },
    {
      date: "2025-01-15",
      category: "Utilities",
      description: "Electricity and water",
      amount: -110,
      type: "Expense",
    },
    {
      date: "2025-01-10",
      category: "Salary",
      description: "Monthly Salary",
      amount: 5000,
      type: "Income",
    },
    {
      date: "2025-01-05",
      category: "Rental",
      description: "Rental Income",
      amount: 1200,
      type: "Income",
    },
  ]);

  const [dateRange, setDateRange] = useState("thisMonth");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const uniqueCategories = [
    ...new Set(transactionData.map((item) => item.category)),
  ];

  const [filteredData, setFilteredData] = useState([]);
  const [summaryData, setSummaryData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    expenseCategoryData: [],
  });

  const getDateRangeName = (rangeValue) => {
    const dateRangeMap = {
      thisMonth: "This Month",
      last30days: "Last 30 Days",
      last3months: "Last 3 Months",
      thisYear: "This Year",
      allTime: "All Time",
    };
    return dateRangeMap[rangeValue] || rangeValue;
  };

  useEffect(() => {
    let newFilteredData = [...transactionData];

    const now = new Date();
    let startDate;

    switch (dateRange) {
      case "thisMonth":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "last30days":
        startDate = new Date();
        startDate.setDate(now.getDate() - 30);
        break;
      case "thisYear":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case "last3months":
        startDate = new Date();
        startDate.setMonth(now.getMonth() - 3);
        break;
      case "allTime":
      default:
        startDate = new Date(0);
    }

    newFilteredData = newFilteredData.filter((transaction) => {
      const transDate = new Date(transaction.date);
      return transDate >= startDate && transDate <= now;
    });

    if (categoryFilter !== "all") {
      newFilteredData = newFilteredData.filter((transaction) => {
        return transaction.category === categoryFilter;
      });
    }

    setFilteredData(newFilteredData);

    const totalIncome = newFilteredData
      .filter((t) => t.type === "Income")
      .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = newFilteredData
      .filter((t) => t.type === "Expense")
      .reduce((acc, t) => acc + Math.abs(t.amount), 0);

    const expensesByCategory = newFilteredData
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

    setSummaryData({
      totalIncome,
      totalExpense,
      expenseCategoryData,
    });
  }, [dateRange, categoryFilter, transactionData]);

  const incomeVsExpenseData = [
    { type: "Income", amount: summaryData.totalIncome },
    { type: "Expense", amount: summaryData.totalExpense },
  ];

  const showFilterInfo = () => {
    const dateRangeName = getDateRangeName(dateRange);
    const categoryName =
      categoryFilter === "all" ? "All Categories" : categoryFilter;

    if (window.Ext) {
      Ext.Msg.show({
        title: "Current Filter Settings",
        message: `
          <div style="font-size: 14px; padding: 10px;">
            <div style="margin-bottom: 10px;"><b>Date Range:</b> ${dateRangeName}</div>
            <div><b>Category:</b> ${categoryName}</div>
            <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee;">
              <div><b>Total Income:</b> <span style="color:#34a853;">$${summaryData.totalIncome.toFixed(
                2
              )}</span></div>
              <div><b>Total Expenses:</b> <span style="color:#ea4335;">$${summaryData.totalExpense.toFixed(
                2
              )}</span></div>
              <div><b>Net Balance:</b> <span style="color:${
                summaryData.totalIncome - summaryData.totalExpense >= 0
                  ? "#34a853"
                  : "#ea4335"
              };">$${(
          summaryData.totalIncome - summaryData.totalExpense
        ).toFixed(2)}</span></div>
            </div>
          </div>
        `,
        buttons: Ext.Msg.OK,
        icon: Ext.Msg.INFO,
      });
    }
  };

  return (
    <ReExt
      xtype="panel"
      ref={(ref) => {
        if (ref && ref.cmp && window.Ext) {
          console.log("ReExt panel initialized successfully");
        }
      }}
      config={{
        title: props.title || "Financial Analytics",
        layout: "border",
        height: 600,
        width: "100%",
        renderTo: document.body,
        style: {
          background: "#f5f7fa",
        },
        items: [
          {
            region: "north",
            xtype: "panel",
            height: 70,
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
                width: 200,
              },
              {
                xtype: "combobox",
                fieldLabel: "Time Period",
                labelWidth: 80,
                width: 220,
                margin: "0 10 0 0",
                store: {
                  fields: ["value", "display"],
                  data: [
                    { value: "thisMonth", display: "This Month" },
                    { value: "last30days", display: "Last 30 Days" },
                    { value: "last3months", display: "Last 3 Months" },
                    { value: "thisYear", display: "This Year" },
                    { value: "allTime", display: "All Time" },
                  ],
                },
                displayField: "display",
                valueField: "value",
                value: dateRange,
                editable: false,
                listeners: {
                  select: function (combo, record) {
                    setDateRange(record.get("value"));
                  },
                },
              },
              {
                xtype: "combobox",
                fieldLabel: "Category",
                labelWidth: 60,
                width: 200,
                store: {
                  fields: ["value", "display"],
                  data: [
                    { value: "all", display: "All Categories" },
                    ...uniqueCategories.map((cat) => ({
                      value: cat,
                      display: cat,
                    })),
                  ],
                },
                displayField: "display",
                valueField: "value",
                value: categoryFilter,
                editable: false,
                listeners: {
                  select: function (combo, record) {
                    setCategoryFilter(record.get("value"));
                  },
                },
              },
              {
                xtype: "button",
                text: "Show Filters",
                margin: "0 10 0 10",
                style: {
                  backgroundColor: "#4285f4",
                  color: "#fff",
                  borderRadius: "4px",
                },
                handler: function () {
                  showFilterInfo();
                },
              },
              {
                xtype: "component",
                flex: 1,
              },
              {
                xtype: "component",
                html: `<div style="text-align:right;padding:5px;background:#f0f8ff;border-radius:4px;font-size:13px;">
                        <div>Showing <b>${
                          filteredData.length
                        }</b> transactions</div>
                        <div style="color:#666;font-size:11px;">
                          Net Balance: <span style="color:${
                            summaryData.totalIncome -
                              summaryData.totalExpense >=
                            0
                              ? "#34a853"
                              : "#ea4335"
                          };font-weight:bold;">$${(
                  summaryData.totalIncome - summaryData.totalExpense
                ).toFixed(2)}</span>
                        </div>
                      </div>`,
                width: 180,
                listeners: {
                  afterrender: function (cmp) {
                    const updateHtml = function () {
                      const netBalance =
                        summaryData.totalIncome - summaryData.totalExpense;
                      cmp.setHtml(`<div style="text-align:right;padding:5px;background:#f0f8ff;border-radius:4px;font-size:13px;">
                        <div>Showing <b>${
                          filteredData.length
                        }</b> transactions</div>
                        <div style="color:#666;font-size:11px;">
                          Net Balance: <span style="color:${
                            netBalance >= 0 ? "#34a853" : "#ea4335"
                          };font-weight:bold;">$${netBalance.toFixed(2)}</span>
                        </div>
                      </div>`);
                    };

                    const intervalId = setInterval(updateHtml, 300);

                    cmp.on("destroy", function () {
                      clearInterval(intervalId);
                    });
                  },
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
                title: "Dashboard",
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
                    layout: {
                      type: "hbox",
                      align: "stretch",
                    },
                    height: 100,
                    style: {
                      background: "transparent",
                      border: "none",
                    },
                    defaults: {
                      flex: 1,
                      style: {
                        background: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        padding: "15px",
                        textAlign: "center",
                      },
                    },
                    items: [
                      {
                        xtype: "component",
                        margin: "0 5 0 0",
                        itemId: "incomeCard",
                        html: `
                          <div>
                            <div style="font-size:14px;color:#666;">Total Income</div>
                            <div style="font-size:24px;font-weight:600;color:#34a853;margin-top:5px;">$${summaryData.totalIncome.toFixed(
                              2
                            )}</div>
                          </div>
                        `,
                        listeners: {
                          afterrender: function (cmp) {
                            const updateHtml = function () {
                              cmp.setHtml(`
                                <div>
                                  <div style="font-size:14px;color:#666;">Total Income</div>
                                  <div style="font-size:24px;font-weight:600;color:#34a853;margin-top:5px;">$${summaryData.totalIncome.toFixed(
                                    2
                                  )}</div>
                                </div>
                              `);
                            };

                            const intervalId = setInterval(updateHtml, 300);

                            cmp.on("destroy", function () {
                              clearInterval(intervalId);
                            });
                          },
                        },
                      },
                      {
                        xtype: "component",
                        margin: "0 5 0 5",
                        itemId: "expenseCard",
                        html: `
                          <div>
                            <div style="font-size:14px;color:#666;">Total Expenses</div>
                            <div style="font-size:24px;font-weight:600;color:#ea4335;margin-top:5px;">$${summaryData.totalExpense.toFixed(
                              2
                            )}</div>
                          </div>
                        `,
                        listeners: {
                          afterrender: function (cmp) {
                            const updateHtml = function () {
                              cmp.setHtml(`
                                <div>
                                  <div style="font-size:14px;color:#666;">Total Expenses</div>
                                  <div style="font-size:24px;font-weight:600;color:#ea4335;margin-top:5px;">$${summaryData.totalExpense.toFixed(
                                    2
                                  )}</div>
                                </div>
                              `);
                            };

                            const intervalId = setInterval(updateHtml, 300);

                            cmp.on("destroy", function () {
                              clearInterval(intervalId);
                            });
                          },
                        },
                      },
                      {
                        xtype: "component",
                        margin: "0 0 0 5",
                        itemId: "netCashCard",
                        html: `
                          <div>
                            <div style="font-size:14px;color:#666;">Net Cash Flow</div>
                            <div style="font-size:24px;font-weight:600;color:${
                              summaryData.totalIncome -
                                summaryData.totalExpense >=
                              0
                                ? "#34a853"
                                : "#ea4335"
                            };margin-top:5px;">$${(
                          summaryData.totalIncome - summaryData.totalExpense
                        ).toFixed(2)}</div>
                          </div>
                        `,
                        listeners: {
                          afterrender: function (cmp) {
                            const updateHtml = function () {
                              const netCashFlow =
                                summaryData.totalIncome -
                                summaryData.totalExpense;
                              cmp.setHtml(`
                                <div>
                                  <div style="font-size:14px;color:#666;">Net Cash Flow</div>
                                  <div style="font-size:24px;font-weight:600;color:${
                                    netCashFlow >= 0 ? "#34a853" : "#ea4335"
                                  };margin-top:5px;">$${netCashFlow.toFixed(
                                2
                              )}</div>
                                </div>
                              `);
                            };

                            const intervalId = setInterval(updateHtml, 300);

                            cmp.on("destroy", function () {
                              clearInterval(intervalId);
                            });
                          },
                        },
                      },
                    ],
                  },

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
                      marginTop: "10px",
                    },
                    items: [
                      {
                        xtype: "polar",
                        flex: 1,
                        margin: "0 5 10 0",
                        height: 300,
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
                          fields: ["type", "amount"],
                          data: incomeVsExpenseData,
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
                            donut: 30,
                            colors: ["#34a853", "#ea4335"],
                          },
                        ],
                        listeners: {
                          afterrender: function (chart) {
                            const intervalId = setInterval(function () {
                              const store = chart.getStore();
                              store.removeAll();
                              store.add([
                                {
                                  type: "Income",
                                  amount: summaryData.totalIncome,
                                },
                                {
                                  type: "Expense",
                                  amount: summaryData.totalExpense,
                                },
                              ]);
                            }, 300);

                            chart.on("destroy", function () {
                              clearInterval(intervalId);
                            });
                          },
                        },
                      },

                      {
                        xtype: "cartesian",
                        flex: 1,
                        margin: "0 0 10 5",
                        height: 300,
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
                          fields: ["category", "amount"],
                          data: summaryData.expenseCategoryData,
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
                        listeners: {
                          afterrender: function (chart) {
                            const intervalId = setInterval(function () {
                              const store = chart.getStore();
                              store.removeAll();
                              store.add(summaryData.expenseCategoryData);
                            }, 300);

                            chart.on("destroy", function () {
                              clearInterval(intervalId);
                            });
                          },
                        },
                      },
                    ],
                  },
                ],
              },

              {
                title: "Transactions",
                layout: "fit",
                items: [
                  {
                    xtype: "grid",
                    store: {
                      fields: [
                        "date",
                        "category",
                        "description",
                        "amount",
                        "type",
                      ],
                      data: filteredData,
                      sorters: [{ property: "date", direction: "DESC" }],
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
                            return `<span style='color:green;'>$${value.toFixed(
                              2
                            )}</span>`;
                          } else {
                            return `<span style='color:red;'>$${Math.abs(
                              value
                            ).toFixed(2)}</span>`;
                          }
                        },
                      },
                      { text: "Type", dataIndex: "type", width: 100 },
                    ],
                    features: [
                      {
                        ftype: "grouping",
                        groupHeaderTpl:
                          "{name} ({rows.length} Item{[values.rows.length > 1 ? 's' : '']})",
                        startCollapsed: false,
                      },
                    ],
                    listeners: {
                      afterrender: function (grid) {
                        const intervalId = setInterval(function () {
                          const store = grid.getStore();
                          store.removeAll();
                          store.add(filteredData);
                        }, 300);

                        grid.on("destroy", function () {
                          clearInterval(intervalId);
                        });
                      },
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
