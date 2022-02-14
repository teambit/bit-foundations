import {
  WebpackConfigMutator,
  WebpackConfigTransformer,
} from '@teambit/webpack';

/* A Webpack config with 'output' configured for the umd module type */
export const umdWebpackConfig = {
  output: {
    filename: 'umd-target.js',
    chunkFilename: 'umd-target.chunk.js',
    library: {
      name: 'umdTargetExample',
      type: 'umd',
    },
  },
};

/* remove hashes from the output css file names for constant and predictable names */
const removeCssNameHash = (configMutator: WebpackConfigMutator) => {
  if (!configMutator.raw.plugins) return;
  for (let plugin of configMutator.raw.plugins) {
    if (plugin.constructor.name === 'MiniCssExtractPlugin') {
      // @ts-ignore
      plugin.options = {
        filename: 'umd-target.css',
        chunkFilename: 'umd-target.chunk.css',
      };
      break;
    }
  }
};

/*
 * this function creates a Webpack Transformer that merges the above 'umdWebpackConfig'
 * with other config mutators used by the consuming webpack configuration.
 * to learn more, see: https://bit.dev/teambit/webpack/content/configure-webpack/~compositions
 */
export const umdWebpackTransformer: WebpackConfigTransformer = (
  configMutator: WebpackConfigMutator
) => {
  /* 'merge' utilizes the 'webpack-merge' library */
  configMutator.merge([umdWebpackConfig]);
  removeCssNameHash(configMutator);
  /**
   * uncomment the below code to remove react and react-dom from the bundle.
   * this option is preferable when react/react-dom (version ^17.0.0) are dependencies
   * of other modules in the hosting app (i.e, 'shared dependencies')
   * for performance optimization, shared dependencies should be loaded only once.
   * to load react using script tags, see here: https://reactjs.org/docs/add-react-to-a-website.html#step-2-add-the-script-tags
   */
  // configMutator.addExternals({
  //   react: 'react',
  //   'react-dom': 'reactDOM',
  // });
  return configMutator;
};
