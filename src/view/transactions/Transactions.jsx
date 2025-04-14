import ReExt from "@sencha/reext";
import { useRef, useEffect, useState } from "react";

export const Transactions = () => {
  const gridRef = useRef();
  const storeRef = useRef();
  const [gridReady, setGridReady] = useState(false);

  const [transactions, setTransactions] = useState([
    {
      task_id: 1,
      fullname: "John Doe",
      activity: "Website Development",
      status_id: "In Progress",
      deadline_date: new Date(2025, 4, 15),
      estimated_time: 20,
      elapsed_time: 8,
      invoiced_amount: 800,
      active: true,
    },
    {
      task_id: 2,
      fullname: "Jane Smith",
      activity: "Logo Design",
      status_id: "Completed",
      deadline_date: new Date(2025, 3, 30),
      estimated_time: 10,
      elapsed_time: 12,
      invoiced_amount: 450,
      active: true,
    },
    {
      task_id: 3,
      fullname: "Robert Johnson",
      activity: "SEO Optimization",
      status_id: "Not Started",
      deadline_date: new Date(2025, 5, 20),
      estimated_time: 15,
      elapsed_time: 0,
      invoiced_amount: 550,
      active: false,
    },
    {
      task_id: 4,
      fullname: "Emily Davis",
      activity: "Mobile App Development",
      status_id: "In Progress",
      deadline_date: new Date(2025, 4, 28),
      estimated_time: 40,
      elapsed_time: 15,
      invoiced_amount: 2000,
      active: true,
    },
    {
      task_id: 5,
      fullname: "Michael Wilson",
      activity: "Content Writing",
      status_id: "Completed",
      deadline_date: new Date(2025, 4, 10),
      estimated_time: 8,
      elapsed_time: 7.5,
      invoiced_amount: 375,
      active: true,
    },
    {
      task_id: 6,
      fullname: "Sarah Brown",
      activity: "E-commerce Store Setup",
      status_id: "On Hold",
      deadline_date: new Date(2025, 5, 5),
      estimated_time: 25,
      elapsed_time: 10,
      invoiced_amount: 1200,
      active: true,
    },
    {
      task_id: 7,
      fullname: "David Taylor",
      activity: "Social Media Campaign",
      status_id: "Not Started",
      deadline_date: new Date(2025, 5, 15),
      estimated_time: 12,
      elapsed_time: 0,
      invoiced_amount: 600,
      active: true,
    },
    {
      task_id: 8,
      fullname: "Lisa Anderson",
      activity: "UI/UX Redesign",
      status_id: "In Progress",
      deadline_date: new Date(2025, 4, 22),
      estimated_time: 18,
      elapsed_time: 7,
      invoiced_amount: 900,
      active: true,
    },
    {
      task_id: 9,
      fullname: "James Martinez",
      activity: "WordPress Plugin Development",
      status_id: "Completed",
      deadline_date: new Date(2025, 4, 5),
      estimated_time: 15,
      elapsed_time: 16,
      invoiced_amount: 750,
      active: false,
    },
    {
      task_id: 10,
      fullname: "Jennifer Thomas",
      activity: "Email Newsletter Design",
      status_id: "Completed",
      deadline_date: new Date(2025, 4, 8),
      estimated_time: 6,
      elapsed_time: 5,
      invoiced_amount: 300,
      active: true,
    },
    {
      task_id: 11,
      fullname: "Daniel Garcia",
      activity: "Database Optimization",
      status_id: "In Progress",
      deadline_date: new Date(2025, 5, 1),
      estimated_time: 14,
      elapsed_time: 6,
      invoiced_amount: 850,
      active: true,
    },
    {
      task_id: 12,
      fullname: "Michelle Lewis",
      activity: "Brand Identity Package",
      status_id: "On Hold",
      deadline_date: new Date(2025, 5, 10),
      estimated_time: 30,
      elapsed_time: 12,
      invoiced_amount: 1500,
      active: true,
    },
    {
      task_id: 13,
      fullname: "Christopher Lee",
      activity: "Video Production",
      status_id: "Not Started",
      deadline_date: new Date(2025, 5, 25),
      estimated_time: 22,
      elapsed_time: 0,
      invoiced_amount: 1800,
      active: true,
    },
    {
      task_id: 14,
      fullname: "Jessica Walker",
      activity: "Shopify Theme Customization",
      status_id: "In Progress",
      deadline_date: new Date(2025, 4, 25),
      estimated_time: 16,
      elapsed_time: 9,
      invoiced_amount: 800,
      active: true,
    },
    {
      task_id: 15,
      fullname: "John Doe",
      activity: "SEO Content Audit",
      status_id: "Completed",
      deadline_date: new Date(2025, 4, 12),
      estimated_time: 10,
      elapsed_time: 11,
      invoiced_amount: 500,
      active: true,
    },
    {
      task_id: 16,
      fullname: "Karen White",
      activity: "Landing Page Design",
      status_id: "In Progress",
      deadline_date: new Date(2025, 4, 30),
      estimated_time: 12,
      elapsed_time: 5,
      invoiced_amount: 600,
      active: true,
    },
    {
      task_id: 17,
      fullname: "Robert Johnson",
      activity: "Google Ads Campaign",
      status_id: "On Hold",
      deadline_date: new Date(2025, 5, 8),
      estimated_time: 8,
      elapsed_time: 2,
      invoiced_amount: 700,
      active: true,
    },
    {
      task_id: 18,
      fullname: "Patricia Harris",
      activity: "API Integration",
      status_id: "Not Started",
      deadline_date: new Date(2025, 5, 18),
      estimated_time: 20,
      elapsed_time: 0,
      invoiced_amount: 1000,
      active: true,
    },
    {
      task_id: 19,
      fullname: "Jane Smith",
      activity: "UX Research",
      status_id: "In Progress",
      deadline_date: new Date(2025, 5, 2),
      estimated_time: 15,
      elapsed_time: 4,
      invoiced_amount: 750,
      active: true,
    },
    {
      task_id: 20,
      fullname: "William Clark",
      activity: "Server Migration",
      status_id: "Completed",
      deadline_date: new Date(2025, 4, 3),
      estimated_time: 24,
      elapsed_time: 22,
      invoiced_amount: 1200,
      active: false,
    },
  ]);

  useEffect(() => {
    if (!window.transactionStore) {
      window.transactionStore = Ext.create("Ext.data.Store", {
        storeId: "transactionStore",
        fields: [
          { name: "task_id", type: "int" },
          { name: "fullname", type: "string" },
          { name: "activity", type: "string" },
          { name: "status_id", type: "string" },
          { name: "deadline_date", type: "date" },
          { name: "estimated_time", type: "float" },
          { name: "elapsed_time", type: "float" },
          { name: "invoiced_amount", type: "float" },
          { name: "active", type: "boolean", defaultValue: true },
        ],
        idProperty: "task_id",
      });
    }

    storeRef.current = window.transactionStore;
    window.transactionStore.loadData(transactions);

    return () => {
      if (window.transactionStore) {
        window.transactionStore.destroy();
        window.transactionStore = null;
      }
    };
  }, []);

  useEffect(() => {
    if (window.transactionStore) {
      window.transactionStore.removeAll();
      window.transactionStore.loadData(transactions);

      if (gridRef.current && gridRef.current.cmp) {
        gridRef.current.cmp.getView().refresh();
        if (!gridReady) setGridReady(true);
      }
    }
  }, [transactions, gridReady]);

  const openForm = (record = null) => {
    if (!Ext.ComponentQuery.query("viewport").length) {
      Ext.create("Ext.container.Viewport", {
        layout: "fit",
      });
    }

    const win = Ext.create("Ext.window.Window", {
      title: record ? "Edit Transaction" : "Add Transaction",
      modal: true,
      width: 450,
      height: 450,
      autoScroll: true,
      layout: "anchor",
      resizable: true,
      draggable: true,
      closable: true,
      maximizable: false,
      renderTo: Ext.getBody(),
      x: (Ext.getBody().getViewSize().width - 450) / 2,
      y: 100,
      items: [
        {
          xtype: "form",
          bodyPadding: 10,
          border: false,
          defaults: {
            anchor: "100%",
            labelWidth: 120,
          },
          items: [
            {
              xtype: "textfield",
              name: "fullname",
              fieldLabel: "Client Name",
              allowBlank: false,
            },
            {
              xtype: "textfield",
              name: "activity",
              fieldLabel: "Activity",
              allowBlank: false,
            },
            {
              xtype: "combobox",
              name: "status_id",
              fieldLabel: "Status",
              store: ["Not Started", "In Progress", "Completed", "On Hold"],
              editable: false,
              allowBlank: false,
              value: "Not Started",
            },
            {
              xtype: "datefield",
              name: "deadline_date",
              fieldLabel: "Due Date",
              format: "Y-m-d",
              value: new Date(),
            },
            {
              xtype: "numberfield",
              name: "estimated_time",
              fieldLabel: "Estimated Time (hrs)",
              minValue: 0,
              value: 0,
            },
            {
              xtype: "numberfield",
              name: "elapsed_time",
              fieldLabel: "Elapsed Time (hrs)",
              minValue: 0,
              value: 0,
            },
            {
              xtype: "numberfield",
              name: "invoiced_amount",
              fieldLabel: "Invoiced Amount ($)",
              minValue: 0,
              value: 0,
            },
            {
              xtype: "checkbox",
              name: "active",
              fieldLabel: "Active",
              checked: true,
            },
          ],
          buttons: [
            {
              text: "Save",
              formBind: true,
              handler: function () {
                const form = this.up("form").getForm();
                if (form.isValid()) {
                  const values = form.getValues();

                  values.estimated_time =
                    parseFloat(values.estimated_time) || 0;
                  values.elapsed_time = parseFloat(values.elapsed_time) || 0;
                  values.invoiced_amount =
                    parseFloat(values.invoiced_amount) || 0;
                  values.active =
                    values.active === "on" || values.active === true;

                  if (values.deadline_date) {
                    values.deadline_date = new Date(values.deadline_date);
                  }

                  setTransactions((prevTransactions) => {
                    const newTransaction = {
                      ...values,
                      task_id:
                        prevTransactions[prevTransactions.length - 1].task_id +
                        1,
                    };

                    return [...prevTransactions, newTransaction];
                  });

                  win.close();

                  Ext.toast({
                    html: record
                      ? "Transaction updated successfully"
                      : "Transaction added successfully",
                    align: "tr",
                    minWidth: 200,
                  });
                }
              },
            },
            {
              text: "Cancel",
              handler: function () {
                win.close();
              },
            },
          ],
        },
      ],
      listeners: {
        afterrender: function () {
          if (record) {
            const formValues = {};
            record.fields.each((field) => {
              formValues[field.name] = record.get(field.name);
            });
            this.down("form").getForm().setValues(formValues);
          }

          this.center();
        },
        show: function () {
          this.center();
        },
        close: function () {
          this.destroy();
        },
      },
    });

    win.show();
  };

  const handleSearch = (value) => {
    if (!value || value.trim() === "") {
      if (window.transactionStore) {
        window.transactionStore.clearFilter();
      }
      return;
    }

    const searchTerm = value.toLowerCase();

    if (window.transactionStore) {
      window.transactionStore.filterBy((record) => {
        return (
          record.get("fullname").toLowerCase().includes(searchTerm) ||
          record.get("activity").toLowerCase().includes(searchTerm) ||
          record.get("status_id").toLowerCase().includes(searchTerm)
        );
      });
    }
  };

  return (
    <ReExt
      ref={gridRef}
      xtype="grid"
      config={{
        title: "Transactions",
        width: "100%",
        height: 600,
        tbar: [
          {
            xtype: "textfield",
            emptyText: "Search client or activity...",
            width: 300,
            enableKeyEvents: true,
            listeners: {
              change: function (field, newValue) {
                handleSearch(newValue);
              },
              specialkey: function (field, e) {
                if (e.getKey() === e.ENTER) {
                  handleSearch(field.getValue());
                }
              },
            },
          },
          "->",
          {
            text: "Add Transaction",
            iconCls: "x-fa fa-plus",
            style: {
              backgroundColor: "#4B89DC",
              borderColor: "#4B89DC",
              color: "white",
            },
            handler: () => openForm(),
          },
        ],
        columns: [
          { text: "ID", dataIndex: "task_id", width: 80 },
          { text: "Client", dataIndex: "fullname", flex: 1 },
          { text: "Activity", dataIndex: "activity", flex: 1 },
          {
            text: "Status",
            dataIndex: "status_id",
            width: 120,
            renderer: function (value) {
              let color;
              switch (value) {
                case "Completed":
                  color = "green";
                  break;
                case "In Progress":
                  color = "blue";
                  break;
                case "On Hold":
                  color = "orange";
                  break;
                case "Not Started":
                  color = "gray";
                  break;
                default:
                  color = "black";
              }
              return `<span style="color:${color};font-weight:bold;">${value}</span>`;
            },
          },
          {
            xtype: "datecolumn",
            text: "Due Date",
            dataIndex: "deadline_date",
            format: "Y-m-d",
            width: 120,
          },
          {
            text: "Est. Time",
            dataIndex: "estimated_time",
            width: 100,
            renderer: (value) => `${value} hrs`,
          },
          {
            text: "Elapsed",
            dataIndex: "elapsed_time",
            width: 100,
            renderer: (value) => `${value} hrs`,
          },
          {
            text: "Amount",
            dataIndex: "invoiced_amount",
            width: 100,
            renderer: (value) => `$${(parseFloat(value) || 0).toFixed(2)}`,
            align: "right",
          },
          {
            xtype: "booleancolumn",
            text: "Active",
            dataIndex: "active",
            trueText: "Yes",
            falseText: "No",
            width: 80,
          },
        ],
        listeners: {
          itemdblclick: (_, record) => {
            if (gridReady) {
              openForm(record);
            }
          },
          viewready: (view) => {
            const grid = view.up("grid");
            if (grid && window.transactionStore) {
              grid.setStore(window.transactionStore);
              setGridReady(true);
            }
          },
        },
        selModel: {
          selType: "rowmodel",
          mode: "SINGLE",
        },
        store: window.transactionStore,
        bbar: {
          xtype: "pagingtoolbar",
          displayInfo: true,
          displayMsg: "Displaying transactions {0} - {1} of {2}",
          emptyMsg: "No transactions to display",
        },
      }}
    />
  );
};
