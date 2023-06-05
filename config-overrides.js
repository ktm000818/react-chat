const { alias, configPaths } = require("react-app-rewire-alias");

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  return alias(configPaths("./tsconfig.paths.json"))(config);
};
