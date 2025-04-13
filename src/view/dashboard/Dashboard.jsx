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

  return (
    <ReExt
      xtype="panel"
      config={{
        title: props.title,
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
            height: 100,
            items: [
              {
                xtype: "panel",
                flex: 1,
                margin: "0 5 0 0",
                bodyPadding: 15,
                style: {
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                },
                html: `
                  <div style="text-align: center;">
                    <div style="font-size: 14px; color: #666;">Total Hours</div>
                    <div style="font-size: 24px; font-weight: 600; color: #333; margin-top: 5px;">${totalHours}</div>
                    <div style="color: #28a745; font-size: 13px; margin-top: 5px;">↑ 8.2% from last month</div>
                  </div>
                `,
              },
              {
                xtype: "panel",
                flex: 1,
                margin: "0 5 0 5",
                bodyPadding: 15,
                style: {
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                },
                html: `
                  <div style="text-align: center;">
                    <div style="font-size: 14px; color: #666;">Budget Utilization</div>
                    <div style="font-size: 24px; font-weight: 600; color: #333; margin-top: 5px;">94.2%</div>
                    <div style="color: #28a745; font-size: 13px; margin-top: 5px;">↑ 2.3% efficiency</div>
                  </div>
                `,
              },
              {
                xtype: "panel",
                flex: 1,
                margin: "0 5 0 5",
                bodyPadding: 15,
                style: {
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                },
                html: `
                  <div style="text-align: center;">
                    <div style="font-size: 14px; color: #666;">Avg. Completion</div>
                    <div style="font-size: 24px; font-weight: 600; color: #333; margin-top: 5px;">71%</div>
                    <div style="color: #dc3545; font-size: 13px; margin-top: 5px;">↓ 3.5% from target</div>
                  </div>
                `,
              },
              {
                xtype: "panel",
                flex: 1,
                margin: "0 0 0 5",
                bodyPadding: 15,
                style: {
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                },
                html: `
                  <div style="text-align: center;">
                    <div style="font-size: 14px; color: #666;">Active Projects</div>
                    <div style="font-size: 24px; font-weight: 600; color: #333; margin-top: 5px;">5</div>
                    <div style="color: #28a745; font-size: 13px; margin-top: 5px;">↑ 1 new project</div>
                  </div>
                `,
              },
            ],
          },

          {
            flex: 1,
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
                  },
                ],
              },
            ],
          },

          {
            height: 200,
            items: [
              {
                xtype: "grid",
                flex: 1,
                style: {
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                },
                title: "Recent Time Entries",
                columns: [
                  { text: "Date", dataIndex: "date", flex: 1 },
                  { text: "Project", dataIndex: "project", flex: 1 },
                  { text: "Task", dataIndex: "task", flex: 2 },
                  { text: "Hours", dataIndex: "hours", flex: 1 },
                  {
                    text: "Status",
                    dataIndex: "status",
                    flex: 1,
                    renderer: function (value) {
                      let color = "#28a745";
                      let bgColor = "rgba(40, 167, 69, 0.1)";

                      if (value === "Pending") {
                        color = "#fbbc05";
                        bgColor = "rgba(251, 188, 5, 0.1)";
                      }
                      if (value === "Overdue") {
                        color = "#ea4335";
                        bgColor = "rgba(234, 67, 53, 0.1)";
                      }

                      return `<div style="display: inline-block; padding: 4px 12px; border-radius: 16px; 
                        background-color: ${bgColor}; color: ${color}; font-weight: 500; font-size: 12px;">
                        ${value}
                      </div>`;
                    },
                  },
                ],
                store: {
                  data: [
                    {
                      date: "2025-04-05",
                      project: "Project A",
                      task: "UI Design",
                      hours: 4.5,
                      status: "Complete",
                    },
                    {
                      date: "2025-04-05",
                      project: "Project C",
                      task: "Backend Development",
                      hours: 6.0,
                      status: "Complete",
                    },
                    {
                      date: "2025-04-04",
                      project: "Project B",
                      task: "API Integration",
                      hours: 3.5,
                      status: "Complete",
                    },
                    {
                      date: "2025-04-04",
                      project: "Project D",
                      task: "User Testing",
                      hours: 2.0,
                      status: "Pending",
                    },
                    {
                      date: "2025-04-03",
                      project: "Project E",
                      task: "Documentation",
                      hours: 5.0,
                      status: "Overdue",
                    },
                  ],
                },
              },
            ],
          },
        ],
      }}
    />
  );
};

export default Dashboard;
