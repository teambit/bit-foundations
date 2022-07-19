import { AngularAppOptions, BrowserOptions, DevServerOptions } from '@teambit/angular-apps';
import {
  WebpackConfigMutator,
  WebpackConfigTransformContext,
  WebpackConfigTransformer,
} from "@teambit/webpack";

const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;

export function singleSpaAngularTranformer(angularOptions: BrowserOptions & DevServerOptions): WebpackConfigTransformer{

  const singleSpaTransformer: WebpackConfigTransformer = (
    configMutator: WebpackConfigMutator,
    context: WebpackConfigTransformContext
  ) => {
    const mergedSingleSpaConfig = singleSpaAngularWebpack(configMutator.raw, angularOptions);
    mergedSingleSpaConfig.output.filename = `main.${angularOptions.customWebpackConfig.libraryName}.js`
    configMutator.raw = mergedSingleSpaConfig;

    return configMutator;
  };

  return singleSpaTransformer;
}