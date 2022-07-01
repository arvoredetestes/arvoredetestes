const path = require("path");
const fs = require("fs");
const { getLoader, loaderByName, ESLINT_MODES } = require("@craco/craco");
const { getPlugin, pluginByName } = require("@craco/craco/lib/webpack-plugins");

const packages = fs
  .readdirSync(__dirname + "/packages")
  .filter((item) => item !== ".DS_Store");

const absolutePaths = [];

packages.forEach((item) => {
  absolutePaths.push(path.join(__dirname, `packages/${item}/src`));
});

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName("babel-loader")
      );
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];
        match.loader.include = include.concat(absolutePaths);
        console.log("Loading sources from:", match.loader.include);
      }

      const { match: eslintPlugin } = getPlugin(
        webpackConfig,
        pluginByName("ESLintWebpackPlugin")
      );
      eslintPlugin.options["context"] = __dirname;
      eslintPlugin.options["files"] = ["apps", "packages"];

      return webpackConfig;
    },
  },

  eslint: {
    enable: true,
    mode: ESLINT_MODES.extends,
  },
  /*style: {
    postcss: {
      plugins: [
        require("tailwindcss")("./packages/client/tailwind.config.js"),
        require("postcss"),
        require("autoprefixer"),
      ],
    },
  },*/
  /*  jest: {
    configure: {
      setupFilesAfterEnv: ["../../config/jest/setupTests.js"],
    },
  },*/
};
