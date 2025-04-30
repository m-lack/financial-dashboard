import ReExt from "@sencha/reext";
import { supabase } from "../../supabaseClient";
import { useEffect, useRef } from "react";

export const Transactions = () => {
  const storeRef = useRef(null);

  const fetchData = async () => {
    const { data: dbData, error } = await supabase
      .from("admin_financial_records")
      .select();

    if (error) {
      console.error("Supabase fetch error:", error);
      return;
    }

    if (storeRef.current) {
      storeRef.current.loadData(dbData, false);
    }
  };

  const openAddForm = () => {
    const win = Ext.create("Ext.window.Window", {
      title: "Add Transaction",
      modal: true,
      width: 400,
      height: 600,
      layout: "fit",
      scrollable: true,
      items: [
        {
          xtype: "form",
          scrollable: true,
          bodyPadding: 10,
          defaults: {
            anchor: "100%",
            labelAlign: "top",
          },
          items: [
            {
              xtype: "textfield",
              fieldLabel: "Admin Name",
              name: "admin_name",
            },
            { xtype: "textfield", fieldLabel: "User Name", name: "user_name" },
            {
              xtype: "textfield",
              fieldLabel: "Type",
              name: "transaction_type",
            },
            { xtype: "numberfield", fieldLabel: "Amount", name: "amount" },
            { xtype: "textfield", fieldLabel: "Currency", name: "currency" },
            { xtype: "textfield", fieldLabel: "Status", name: "status" },
            {
              xtype: "textfield",
              fieldLabel: "Status Color",
              name: "status_color",
            },
            { xtype: "textfield", fieldLabel: "Method", name: "method" },
            {
              xtype: "datefield",
              fieldLabel: "Due Date",
              name: "due_date",
              format: "Y-m-d",
              submitFormat: "Y-m-d",
            },
            {
              xtype: "datefield",
              fieldLabel: "Paid Date",
              name: "paid_date",
              format: "Y-m-d",
              submitFormat: "Y-m-d",
            },
            { xtype: "textfield", fieldLabel: "Notes", name: "notes" },
          ],
          buttons: [
            {
              text: "Submit",
              handler: async function () {
                const form = this.up("form").getForm();
                if (form.isValid()) {
                  const values = form.getValues();

                  const newTransaction = {
                    ...values,
                    invoice_date: new Date().toISOString(),
                    due_date: values.due_date
                      ? new Date(values.due_date).toISOString()
                      : null,
                    paid_date: values.paid_date
                      ? new Date(values.paid_date).toISOString()
                      : null,
                    amount: parseFloat(values.amount),
                    active: true,
                  };

                  const { error } = await supabase
                    .from("admin_financial_records")
                    .insert([newTransaction]);

                  if (error) {
                    Ext.Msg.alert("Error", error.message);
                  } else {
                    Ext.Msg.alert("Success", "Transaction added.");
                    win.close();
                    fetchData();
                  }
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
    });

    win.show();
  };

  useEffect(() => {
    storeRef.current = Ext.create("Ext.data.Store", {
      fields: [
        "id",
        "admin_name",
        "user_name",
        "transaction_type",
        "amount",
        "currency",
        "status",
        "status_color",
        "method",
        "invoice_date",
        "due_date",
        "paid_date",
        "notes",
        "active",
      ],
      pageSize: 10,
    });

    fetchData();
  }, []);

  return (
    <ReExt
      xtype="grid"
      config={{
        title: "Financial Transactions",
        tbar: [
          {
            text: "Add",
            iconCls: "fa fa-plus",
            handler: openAddForm,
          },
          {
            text: "Refresh",
            iconCls: "fa fa-sync",
            handler: fetchData,
          },
        ],
        bbar: {
          xtype: "pagingtoolbar",
          bind: {
            store: storeRef.current,
          },
        },
        plugins: {
          gridfilters: true,
        },
        viewConfig: {
          getRowClass: function (row) {
            return row.data.active ? "" : "inactive-class";
          },
        },
        store: storeRef.current,
        columns: [
          {
            text: "Admin",
            dataIndex: "admin_name",
            width: 150,
            filter: "string",
          },
          {
            text: "User",
            dataIndex: "user_name",
            width: 150,
            filter: "string",
          },
          {
            text: "Type",
            dataIndex: "transaction_type",
            width: 120,
            filter: "string",
          },
          {
            text: "Amount",
            dataIndex: "amount",
            width: 100,
            renderer: function (value, cell, record) {
              const currency = record.data.currency || "";
              const formatted = Ext.util.Format.number(value, "0.00");
              return `${formatted} ${currency}`;
            },
            filter: "number",
          },
          {
            text: "Status",
            dataIndex: "status",
            width: 100,
            renderer: function (value, cell, record) {
              const color = record.data.status_color || "000000";
              return `<span style="color:#${color}; font-weight: bold;">${value}</span>`;
            },
            filter: "string",
          },
          { text: "Method", dataIndex: "method", width: 120, filter: "string" },
          {
            xtype: "datecolumn",
            text: "Invoice Date",
            dataIndex: "invoice_date",
            format: "Y-m-d",
            width: 120,
            filter: "date",
          },
          {
            xtype: "datecolumn",
            text: "Due Date",
            dataIndex: "due_date",
            format: "Y-m-d",
            width: 120,
            filter: "date",
          },
          {
            xtype: "datecolumn",
            text: "Paid Date",
            dataIndex: "paid_date",
            format: "Y-m-d",
            width: 120,
            filter: "date",
          },
          { text: "Notes", dataIndex: "notes", flex: 1 },
          {
            text: "Active",
            dataIndex: "active",
            width: 80,
            renderer: (val) => (val ? "✅" : "🚫"),
            filter: { type: "boolean" },
          },
        ],
      }}
    />
  );
};
