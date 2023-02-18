const fs = require("fs");
// add additional files
fs.copyFileSync("README.md", "dist/rx-service/README.md");
