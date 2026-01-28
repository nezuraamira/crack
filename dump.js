const fs = require("fs");
const vm = require("vm");

const code = fs.readFileSync("nael.js", "utf8");

let dumped = false;

const context = {
  console,
  require,
  process,
  Buffer,
  setTimeout,
  setInterval,
  clearTimeout,
  clearInterval,
  __dirname,
  __filename,

  eval: (payload) => {
    if (!dumped && typeof payload === "string") {
      fs.writeFileSync("deobf_raw.js", payload);
      dumped = true;
      console.log("[+] Payload berhasil di-dump ke deobf_raw.js");
    }
    return payload;
  }
};

vm.createContext(context);

try {
  vm.runInContext(code, context);
} catch (e) {
  console.log("[!] Error (normal, abaikan):", e.message);
}
