import { WebpackConfigTransformer, WebpackConfigMutator, WebpackConfigTransformContext } from '@teambit/webpack';
import { generateNodeModulesPattern } from '@teambit/dependencies.modules.packages-excluder';
import { JSONPath } from "jsonpath-plus";

export function gatsbyTransform(config: WebpackConfigMutator){

  const babelLoaders = JSONPath<any[]>({
    json: config.raw,
    path: "$.module.rules..[?(@ && @.test && @.loader && @.loader.includes('babel-loader'))]",
  });
  
  if (babelLoaders.length !== 1 ) {
      throw new Error(
          `gatsby env: failed to add babel-plugin-remove-graphql-queries, didnt find a babel-loader` + 
          ` This probably means the webpack configuration of Bit itself has changed!`
      );
  }

  // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
  const newNodeModulesPattern = RegExp(generateNodeModulesPattern({packages: ['gatsby']}));

  const updatedExcludes = babelLoaders[0].exclude.map(e => {
    if (RegExp(e).test("node_modules")) return newNodeModulesPattern;
    return e;
  })

  babelLoaders[0].exclude = updatedExcludes;

  const babelLoaderPlugins = JSONPath<any[]>({
    json: babelLoaders,
    path: "$..plugins",
  });

  babelLoaderPlugins.push(require.resolve("babel-plugin-remove-graphql-queries"));
}

/**
 * Transformation to apply for both preview and dev server
 * @param config
 * @param _context
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function commonTransformation(config: WebpackConfigMutator, _context: WebpackConfigTransformContext) {
  gatsbyTransform(config);
  return config;
}

/**
 * Transformation for the preview only
 * @param config
 * @param context
 * @returns
 */
export const gatsbyPreviewConfigTransformer: WebpackConfigTransformer = (
  config: WebpackConfigMutator,
  context: WebpackConfigTransformContext
) => {
  const newConfig = commonTransformation(config, context);
  return newConfig;
};

/**
 * Transformation for the dev server only
 * @param config
 * @param context
 * @returns
 */
export const gatsbyDevServerConfigTransformer: WebpackConfigTransformer = (
  config: WebpackConfigMutator,
  context: WebpackConfigTransformContext
) => {
  const newConfig = commonTransformation(config, context);
  return newConfig;
};

