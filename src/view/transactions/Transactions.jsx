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
    const win = Ext.create("Ext.window.Window", {
      title: record ? "Edit Transaction" : "Add Transaction",
      modal: true,
      layout: "fit",
      width: 400,
      items: {
        xtype: "form",
        bodyPadding: 10,
        defaults: { anchor: "100%" },
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
            fieldLabel: "Estimated Time (hours)",
            minValue: 0,
            value: 0,
          },
          {
            xtype: "numberfield",
            name: "elapsed_time",
            fieldLabel: "Elapsed Time (hours)",
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
            inputValue: true,
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

                values.estimated_time = parseFloat(values.estimated_time) || 0;
                values.elapsed_time = parseFloat(values.elapsed_time) || 0;
                values.invoiced_amount =
                  parseFloat(values.invoiced_amount) || 0;
                values.active =
                  values.active === "on" || values.active === true;

                if (values.deadline_date) {
                  values.deadline_date = new Date(values.deadline_date);
                }

                if (record) {
                  const updatedTransactions = transactions.map((t) =>
                    t.task_id === record.get("task_id")
                      ? { ...values, task_id: record.get("task_id") }
                      : t
                  );
                  setTransactions(updatedTransactions);
                } else {
                  const newTransaction = {
                    ...values,
                    task_id: Date.now(),
                  };

                  setTransactions((prevTransactions) => [
                    ...prevTransactions,
                    newTransaction,
                  ]);
                }

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
      listeners: {
        afterrender: () => {
          if (record) {
            const formValues = {};
            record.fields.each((field) => {
              formValues[field.name] = record.get(field.name);
            });
            win.down("form").getForm().setValues(formValues);
          }
        },
      },
    });

    win.show();
  };

  const handleDelete = () => {
    const grid = gridRef.current?.cmp;
    const store = storeRef.current;

    if (!grid || !store) {
      Ext.Msg.alert("Error", "Grid or store not initialized.");
      return;
    }

    const selModel = grid.getSelectionModel();
    if (!selModel.hasSelection()) {
      Ext.Msg.alert("Warning", "Please select a transaction to delete.");
      return;
    }

    const selectedRecord = selModel.getSelection()[0];
    const taskId = selectedRecord.get("task_id");
    const clientName = selectedRecord.get("fullname");

    Ext.Msg.confirm(
      "Confirm Delete",
      `Are you sure you want to delete the transaction for "${clientName}"?`,
      function (btn) {
        if (btn === "yes") {
          try {
            store.remove(selectedRecord);

            setTransactions((prevState) =>
              prevState.filter((t) => t.task_id !== taskId)
            );

            Ext.toast({
              html: `Transaction for "${clientName}" deleted successfully`,
              align: "tr",
              minWidth: 200,
            });
          } catch (err) {
            console.error("Delete error:", err);
            Ext.Msg.alert(
              "Error",
              "Failed to delete the record: " + err.message
            );
          }
        }
      }
    );
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
            text: "Add Transaction",
            iconCls: "x-fa fa-plus",
            handler: () => openForm(),
          },
          {
            text: "Edit Selected",
            iconCls: "x-fa fa-edit",
            handler: function () {
              const grid = Ext.ComponentQuery.query(
                'grid[title="Transactions"]'
              )[0];

              if (!grid) {
                Ext.Msg.alert("Error", "Grid not available");
                return;
              }

              const selection = grid.getSelectionModel().getSelection();
              if (!selection.length) {
                Ext.Msg.alert(
                  "Warning",
                  "Please select a transaction to edit."
                );
                return;
              }

              const selectedRecord = selection[0];
              openForm(selectedRecord);
            },
          },
          {
            text: "Delete Selected",
            iconCls: "x-fa fa-trash",
            handler: handleDelete,
          },
        ],
        columns: [
          { text: "ID", dataIndex: "task_id", width: 80 },
          { text: "Client", dataIndex: "fullname", flex: 1 },
          { text: "Activity", dataIndex: "activity", flex: 1 },
          { text: "Status", dataIndex: "status_id", width: 120 },
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
      }}
    />
  );
};
