import ReExt from "@sencha/reext";

export const Dashboard = (props) => {
  const financialData = [
    { month: "Jan", revenue: 4250, expenses: 3100, profit: 1150 },
    { month: "Feb", revenue: 4800, expenses: 3300, profit: 1500 },
    { month: "Mar", revenue: 5100, expenses: 3450, profit: 1650 },
    { month: "Apr", revenue: 4950, expenses: 3600, profit: 1350 },
    { month: "May", revenue: 5400, expenses: 3750, profit: 1650 },
    { month: "Jun", revenue: 5800, expenses: 3900, profit: 1900 },
  ];

  const timeData = [
    { project: "Project A", hours: 145, budget: 160, completion: 75 },
    { project: "Project B", hours: 87, budget: 120, completion: 60 },
    { project: "Project C", hours: 210, budget: 200, completion: 95 },
    { project: "Project D", hours: 65, budget: 80, completion: 45 },
    { project: "Project E", hours: 112, budget: 100, completion: 80 },
  ];

  const totalHours = timeData.reduce((sum, item) => sum + item.hours, 0);
  const totalBudget = timeData.reduce((sum, item) => sum + item.budget, 0);
  const budgetUtilization = ((totalHours / totalBudget) * 100).toFixed(1);
  const avgCompletion = (
    timeData.reduce((sum, item) => sum + item.completion, 0) / timeData.length
  ).toFixed(0);

  const isMobile = () => {
    return (
      Ext.platformTags.phone ||
      (Ext.platformTags.tablet && window.innerWidth < 768)
    );
  };

  const createMetricCard = (title, value, change, isPositive) => {
    return {
      xtype: "panel",
      flex: 1,
      margin: isMobile() ? "0 0 5 0" : "0 5 0 0",
      bodyPadding: isMobile() ? 10 : 15,
      style: {
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      },
      html: `
        <div style="text-align: center;">
          <div style="font-size: ${
            isMobile() ? "12px" : "14px"
          }; color: #666;">${title}</div>
          <div style="font-size: ${
            isMobile() ? "20px" : "24px"
          }; font-weight: 600; color: #333; margin-top: 5px;">${value}</div>
          <div style="color: ${
            isPositive ? "#28a745" : "#dc3545"
          }; font-size: ${
        isMobile() ? "11px" : "13px"
      }; margin-top: 5px;">${change}</div>
        </div>
      `,
    };
  };

  const createMobileFinancialTable = () => {
    const storeConfig = {
      fields: ["month", "revenue", "expenses", "profit"],
      data: financialData,
    };

    return {
      xtype: "panel",
      margin: "0 0 5 0",
      style: {
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      },
      items: [
        {
          xtype: "grid",
          store: storeConfig,
          hideHeaders: false,
          columnLines: true,
          columns: [
            { text: "Month", dataIndex: "month", width: 80, align: "center" },
            {
              text: "Revenue",
              dataIndex: "revenue",
              width: 80,
              align: "right",
              formatter: "usMoney",
              cell: {
                encodeHtml: false,
                innerCls: "revenue-cell",
              },
            },
            {
              text: "Expenses",
              dataIndex: "expenses",
              width: 80,
              align: "right",
              formatter: "usMoney",
              cell: {
                encodeHtml: false,
                innerCls: "expenses-cell",
              },
            },
            {
              text: "Profit",
              dataIndex: "profit",
              width: 80,
              align: "right",
              formatter: "usMoney",
              cell: {
                encodeHtml: false,
                innerCls: "profit-cell",
                renderer: function (value) {
                  return (
                    '<span style="color:#34a853;font-weight:bold;">$' +
                    value +
                    "</span>"
                  );
                },
              },
            },
          ],
          height: 200,
        },
      ],
      dockedItems: [
        {
          xtype: "toolbar",
          docked: "top",
          items: [
            {
              xtype: "component",
              html: '<div style="text-align:center; font-weight:bold; font-size:12px; width:100%;">Financial Performance</div>',
              flex: 1,
            },
          ],
        },
      ],
    };
  };

  const createMobileProjectTable = () => {
    const storeConfig = {
      fields: ["project", "hours", "budget", "completion"],
      data: timeData,
    };

    return {
      xtype: "panel",
      margin: "0 0 5 0",
      style: {
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      },
      items: [
        {
          xtype: "grid",
          store: storeConfig,
          hideHeaders: false,
          columnLines: true,
          columns: [
            { text: "Project", dataIndex: "project", width: 100 },
            {
              text: "Hours",
              dataIndex: "hours",
              width: 60,
              align: "right",
              cell: {
                encodeHtml: false,
                innerCls: "hours-cell",
                renderer: function (value) {
                  return (
                    '<span style="color:#4285f4;font-weight:bold;">' +
                    value +
                    "</span>"
                  );
                },
              },
            },
            {
              text: "Budget",
              dataIndex: "budget",
              width: 60,
              align: "right",
              cell: {
                encodeHtml: false,
                innerCls: "budget-cell",
                renderer: function (value) {
                  return (
                    '<span style="color:#fbbc05;font-weight:bold;">' +
                    value +
                    "</span>"
                  );
                },
              },
            },
            {
              text: "Completion",
              dataIndex: "completion",
              width: 100,
              align: "center",
              cell: {
                encodeHtml: false,
                renderer: function (value) {
                  let color = "#34a853";
                  if (value < 60) {
                    color = "#ea4335";
                  } else if (value < 80) {
                    color = "#fbbc05";
                  }

                  const barWidth = value;
                  return `
                  <div style="width:100%; background:#e6e6e6; height:18px; border-radius:9px; overflow:hidden;">
                    <div style="width:${barWidth}%; background:${color}; height:18px;"></div>
                    <div style="margin-top:-18px; text-align:center; font-size:11px; color:#333; position:relative;">${value}%</div>
                  </div>
                `;
                },
              },
            },
          ],
          height: 200,
        },
      ],
      dockedItems: [
        {
          xtype: "toolbar",
          docked: "top",
          items: [
            {
              xtype: "component",
              html: '<div style="text-align:center; font-weight:bold; font-size:12px; width:100%;">Project Status</div>',
              flex: 1,
            },
          ],
        },
      ],
    };
  };

  const createMobileHoursByProject = () => {
    const totalHoursSum = timeData.reduce((sum, item) => sum + item.hours, 0);

    let barsHtml = "";
    timeData.forEach((item, index) => {
      const percentage = ((item.hours / totalHoursSum) * 100).toFixed(1);
      const colors = ["#4285f4", "#34a853", "#fbbc05", "#ea4335", "#673ab7"];
      const color = colors[index % colors.length];

      barsHtml += `
        <div style="margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
            <div style="font-size:11px;">${item.project}</div>
            <div style="font-size:11px; font-weight:bold;">${item.hours} hrs (${percentage}%)</div>
          </div>
          <div style="width:100%; background:#e6e6e6; height:12px; border-radius:6px; overflow:hidden;">
            <div style="width:${percentage}%; background:${color}; height:12px;"></div>
          </div>
        </div>
      `;
    });

    return {
      xtype: "panel",
      margin: "0 0 5 0",
      style: {
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      },
      bodyPadding: 10,
      html: `<div>${barsHtml}</div>`,
      dockedItems: [
        {
          xtype: "toolbar",
          docked: "top",
          items: [
            {
              xtype: "component",
              html: '<div style="text-align:center; font-weight:bold; font-size:12px; width:100%;">Hours by Project</div>',
              flex: 1,
            },
          ],
        },
      ],
    };
  };

  return (
    <ReExt
      xtype="panel"
      config={{
        title: props.title,
        layout: {
          type: "vbox",
          align: "stretch",
        },
        bodyPadding: isMobile() ? 5 : 10,
        style: {
          background: "#f5f7fa",
        },
        width: "100%",
        height: "100%",
        scrollable: isMobile() ? "vertical" : false,
        items: [
          {
            height: "auto",
            layout: {
              type: isMobile() ? "vbox" : "hbox",
              align: "stretch",
            },
            defaults: {
              margin: isMobile() ? "0 0 5 0" : "0 5 0 0",
            },
            items: [
              createMetricCard(
                "Total Hours",
                totalHours,
                "↑ 5.2% from last month",
                true
              ),
              createMetricCard(
                "Budget Utilization",
                `${budgetUtilization}%`,
                "↑ 2.3% efficiency",
                true
              ),
              createMetricCard(
                "Avg. Completion",
                `${avgCompletion}%`,
                "↓ 3.5% from target",
                false
              ),
              createMetricCard("Active Projects", "5", "↑ 1 new project", true),
            ],
          },

          ...(isMobile()
            ? [
                createMobileFinancialTable(),
                createMobileProjectTable(),
                createMobileHoursByProject(),
              ]
            : [
                {
                  flex: 1,
                  layout: {
                    type: "hbox",
                    align: "stretch",
                  },
                  items: [
                    {
                      xtype: "cartesian",
                      flex: 1,
                      margin: "0 5 0 0",
                      style: {
                        background: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      },
                      store: {
                        data: financialData,
                      },
                      legend: {
                        docked: "bottom",
                      },
                      axes: [
                        {
                          type: "numeric",
                          position: "left",
                          grid: true,
                          title: "Amount ($)",
                          style: {
                            fontSize: "12px",
                          },
                        },
                        {
                          type: "category",
                          position: "bottom",
                          grid: false,
                          style: {
                            fontSize: "12px",
                          },
                        },
                      ],
                      series: [
                        {
                          type: "line",
                          title: "Revenue",
                          xField: "month",
                          yField: "revenue",
                          marker: {
                            type: "circle",
                            radius: 4,
                          },
                          style: {
                            lineWidth: 2,
                            strokeStyle: "#4285f4",
                          },
                        },
                        {
                          type: "line",
                          title: "Expenses",
                          xField: "month",
                          yField: "expenses",
                          marker: {
                            type: "circle",
                            radius: 4,
                          },
                          style: {
                            lineWidth: 2,
                            strokeStyle: "#ea4335",
                          },
                        },
                        {
                          type: "bar",
                          title: "Profit",
                          xField: "month",
                          yField: "profit",
                          style: {
                            fillStyle: "#34a853",
                          },
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
                      store: {
                        data: timeData,
                      },
                      axes: [
                        {
                          type: "numeric",
                          position: "left",
                          grid: true,
                          title: "Hours",
                          style: {
                            fontSize: "12px",
                          },
                        },
                        {
                          type: "category",
                          position: "bottom",
                          grid: false,
                          style: {
                            fontSize: "12px",
                          },
                        },
                      ],
                      series: [
                        {
                          type: "bar",
                          title: "Hours",
                          xField: "project",
                          yField: "hours",
                          style: {
                            fillStyle: "#4285f4",
                          },
                        },
                        {
                          type: "bar",
                          title: "Budget",
                          xField: "project",
                          yField: "budget",
                          style: {
                            fillStyle: "#fbbc05",
                          },
                        },
                      ],
                    },
                  ],
                },

                {
                  flex: 1,
                  layout: {
                    type: "hbox",
                    align: "stretch",
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
                      store: {
                        data: timeData,
                      },
                      insetPadding: 30,
                      legend: {
                        docked: "bottom",
                      },
                      series: [
                        {
                          type: "pie",
                          angleField: "hours",
                          label: {
                            field: "project",
                            display: "rotate",
                            font: "12px Arial",
                          },
                          title: "Hours by Project",
                          colors: [
                            "#4285f4",
                            "#34a853",
                            "#fbbc05",
                            "#ea4335",
                            "#673ab7",
                          ],
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
                      store: {
                        data: timeData,
                      },
                      axes: [
                        {
                          type: "numeric",
                          position: "left",
                          grid: true,
                          maximum: 100,
                          title: "Completion (%)",
                          style: {
                            fontSize: "12px",
                          },
                        },
                        {
                          type: "category",
                          position: "bottom",
                          grid: false,
                          style: {
                            fontSize: "12px",
                          },
                        },
                      ],
                      series: [
                        {
                          type: "bar",
                          xField: "project",
                          yField: "completion",
                          style: {
                            fillStyle: "#34a853",
                          },
                          renderer: function (sprite, config, data, index) {
                            let color = "#34a853";
                            const value = data.store
                              .getAt(index)
                              .get("completion");

                            if (value < 60) {
                              color = "#ea4335";
                            } else if (value < 80) {
                              color = "#fbbc05";
                            }

                            return {
                              fillStyle: color,
                            };
                          },
                        },
                      ],
                    },
                  ],
                },
              ]),
        ],
        listeners: {
          painted: function () {
            if (isMobile()) {
              if (!Ext.util.CSS.getRule(".mobile-dashboard-styles")) {
                Ext.util.CSS.createStyleSheet(
                  `
                  .x-grid-cell-inner {
                    padding: 5px 3px !important;
                    font-size: 11px !important;
                  }
                  .x-toolbar {
                    background: #f8f9fa !important;
                    border-bottom: 1px solid #e0e0e0 !important;
                  }
                `,
                  "mobile-dashboard-styles"
                );
              }
            }
          },
        },
      }}
    />
  );
};

export default Dashboard;
