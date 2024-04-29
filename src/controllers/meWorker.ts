const { parentPort } = require("worker_threads");
const bcrypt = require("bcrypt");
parentPort.on("message", async (value: any) => {
  const pass = await bcrypt.hash(value, 1);
  parentPort.postMessage(pass);
  parentPort.close;
});
