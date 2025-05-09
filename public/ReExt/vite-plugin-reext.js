import { spawnSync as i } from "child_process";
function d() {
  var r = !1,
    s = "";
  function u(t, e) {
    var c = i(
        "java",
        [
          "-jar",
          `${t}/node_modules/@sencha/reext/dist/ReExt/utils.jar`,
          "-product",
          e.product,
          "-productVersion",
          e.productVersion,
          "-eventType",
          e.eventType,
          "-trigger",
          e.trigger,
          "-licensedTo",
          e.licensedTo,
          "-mode",
          e.mode,
          "-licenseExpiryDate",
          e.licenseExpiryDate,
          "-custom1",
          e.custom1,
          "-custom2",
          e.custom2,
          "-custom3",
          e.custom3,
          "-custom4",
          e.custom4,
          "-validLicenseInfo",
          e.validLicenseInfo,
        ],
        { encoding: "utf8", shell: !0 }
      ),
      o = c.stdout.replace(/\t/g, "    "),
      a = o
        .split(
          `
`
        )
        .filter((n) => n.trim() !== "");
    return a;
  }
  async function g() {
    try {
      let t = await fetch("http://localhost:1977/?product=ReExt");
      if (!t.ok) throw new Error("Network response was not ok " + t.statusText);
      let e = await t.json();
      console.log(e.result[e.result.length - 1], "http smartflow"),
        (r = !0),
        (s = e.k);
    } catch (t) {
      console.error("Fetch error:", t.toString()), (r = !1);
    }
  }
  return {
    name: "reextplugin",
    async config(t, { mode: e, command: c }) {
      console.log("who:", "vite"),
        console.log("command:", c),
        console.log("mode:", e),
        console.log("cwd:", process.cwd());
      var o = new Date(),
        a = (o.getMonth() + 1).toString().padStart(2, "0"),
        n = o.getDate().toString().padStart(2, "0"),
        l = o.getFullYear() + "-" + a + "-" + n,
        m = {
          product: "ReExt",
          productVersion: "1.0",
          eventType: "N/A",
          trigger: "N/A",
          licensedTo: "a@a.com",
          mode: "testing",
          licenseExpiryDate: l,
          custom1: "licenseType=Enterprise",
          custom2: "isValid=true",
          custom3: "isTrial=false",
          custom4: "isExpired=false",
          validLicenseInfo: "validLicenseInfo",
        };
      let p = process.cwd();
      (r = !0),
        r === !0 &&
          (console.log("key:", s.toString()),
          (t.define = {
            ...t.define,
            __IS_REEXT_RUNNING__: JSON.stringify(s),
          }));
    },
  };
}
export { d as default };
