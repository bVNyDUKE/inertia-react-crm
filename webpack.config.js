const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve("resources/js"),
    },
    modules: [__dirname, "node_modules", "resources/js", "vendor"],
  },
};
