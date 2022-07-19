const _HtmlWebpackPlugin = require("html-webpack-plugin");
const StandaloneSingleSpaPlugin = require("standalone-single-spa-webpack-plugin");
const SystemJSPublicPathPlugin = require("systemjs-webpack-interop/SystemJSPublicPathWebpackPlugin");
const ExposeRuntimeCssAssetsPlugin = require("single-spa-css/ExposeRuntimeCssAssetsPlugin.cjs");
import {
  WebpackConfigMutator,
  WebpackConfigTransformContext,
  WebpackConfigTransformer,
} from "@teambit/webpack";


export const singleSpaWebpackConfig = (
  opts: any
) => {
  if (typeof opts !== "object") {
    throw Error(`single-spa webpack config requires an opts object`);
  }

  if (typeof opts.orgName !== "string") {
    throw Error(`single-spa webpack config requires an opts.orgName string`);
  }

  if (typeof opts.projectName !== "string") {
    throw Error(
      `single-spa webpack config requires an opts.projectName string`
    );
  }

  if (opts.orgPackagesAsExternal !== false) {
    opts.orgPackagesAsExternal = true;
  }

  let HtmlWebpackPlugin = opts.HtmlWebpackPlugin || _HtmlWebpackPlugin;

  return {
    entry: ``, 
    output: {
      filename: `${opts.orgName}-${opts.projectName}.js`,
      libraryTarget: "system",
      uniqueName: opts.projectName,
      devtoolNamespace: `${opts.projectName}`,
      publicPath: "",
      chunkLoadingGlobal: `${opts.projectName}`
    },
    optimization: {
      minimize: false
    },
    devtool: "source-map",
    externals: opts.orgPackagesAsExternal
      ? ["single-spa", new RegExp(`^@${opts.orgName}/`), "react", "react-dom"]
      : ["single-spa", "react", "react-dom"],
    plugins: [
      new SystemJSPublicPathPlugin({
        systemjsModuleName: `@${opts.orgName}/${opts.projectName}`,
        rootDirectoryLevel: opts.rootDirectoryLevel,
      }),
      new StandaloneSingleSpaPlugin({
        appOrParcelName: `@${opts.orgName}/${opts.projectName}`,
        disabled: !opts.webpackConfigEnv.standalone,
        HtmlWebpackPlugin,
        ...opts.standaloneOptions,
      }),
      new ExposeRuntimeCssAssetsPlugin({
        // The filename here must match the filename for the MiniCssExtractPlugin
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
    ].filter(Boolean)
  };
};

export function singleSpaReactWebpackTransformer(opts: any){

  const singleSpaWebpackTransformer: WebpackConfigTransformer = (
    configMutator: WebpackConfigMutator,
    context: WebpackConfigTransformContext
  ) => {
    const singleSpaConfig = singleSpaWebpackConfig(opts);
    const path = configMutator.raw.output?.path;
    configMutator.raw.output = {...singleSpaConfig.output, path: path };
    configMutator.raw.devtool = singleSpaConfig.devtool;
    configMutator.addExternals(singleSpaConfig.externals);
    const devServer = {...configMutator.raw["devServer"], headers: {["Access-Control-Allow-Headers"]: "*"}};
    configMutator.raw["devServer"] = devServer;
    singleSpaConfig.plugins.forEach((p) => configMutator.addPlugin(p));
    return configMutator;
  };

  return singleSpaWebpackTransformer;
}
