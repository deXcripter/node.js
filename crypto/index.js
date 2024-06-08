const crypto = require("node:crypto");

const hash = crypto
  .createHmac("sha256", "some secret")
  .update("who dosnt")
  .digest("hex");

console.log(hash);
