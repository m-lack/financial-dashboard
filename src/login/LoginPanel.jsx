import ReExt from "@sencha/reext";
import { supabase } from "../supabaseClient";

export const LoginPanel = (props) => {
  const handleLogin = (result) => {
    props.loginMethod(result);
  };

  return (
    <ReExt
      xtype="panel"
      config={{
        bodyStyle: {
          background: "url(/background.jpg)",
          backgroundSize: "cover",
        },
        layout: {
          type: "center",
        },
      }}
    >
      <ReExt
        xtype="form"
        style={{
          width: 300,
          height: 400,
        }}
        config={{
          title: "Financial App",
          bodyPadding: 16,
          defaults: {
            xtype: "textfield",
            width: "100%",
            labelAlign: "top",
            allowBlank: false,
            msgTarget: "side",
            minLength: 4,
            maxLength: 50,
            enforceMaxLength: true,
          },
          items: [
            {
              xtype: "image",
              src: "/logo.png",
              height: 98,
            },
            {
              name: "username",
              fieldLabel: "Email",
              vtype: "email",
            },
            {
              name: "password",
              fieldLabel: "Password",
              inputType: "password",
              maxLength: 12,
            },
            {
              xtype: "checkboxfield",
              name: "pwdvisible",
              boxLabel: "View Password",
              handler: function () {
                let pwdField = this.previousSibling();
                pwdField.inputEl.dom.type = this.checked ? "text" : "password";
              },
            },
            {
              xtype: "button",
              text: "Login",
              handler: async function () {
                let form = this.up("form").getForm();

                if (form.isValid()) {
                  const values = form.getValues();

                  const { data, error } =
                    await supabase.auth.signInWithPassword({
                      email: values.username,
                      password: values.password,
                    });

                  if (error) {
                    Ext.Msg.alert("Couldn't Login", error.message);
                    console.log("Login Response", { data, error });
                  } else {
                    handleLogin({
                      success: true,
                      token: data.session.access_token,
                      id_user: data.user.id,
                      email: data.user.email,
                    });
                  }
                } else {
                  Ext.Msg.alert(
                    "Missing Credentials",
                    "Make Sure You Enter a Valid Email And Password"
                  );
                }
              },
            },
          ],
        }}
      ></ReExt>
    </ReExt>
  );
};
