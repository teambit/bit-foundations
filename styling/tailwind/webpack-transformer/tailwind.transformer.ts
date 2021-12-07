import { WebpackConfigTransformer, WebpackConfigMutator } from "@teambit/webpack";
import * as stylesRegexps from "@teambit/webpack.modules.style-regexps";
import tailwindcssPlugin from "tailwindcss";
// import { tailwindConfigPath } from "@shohamgilad/tailwind-test.styles.tailwind-styles";

export type TailwindTransformersType = {
    previewConfigTransformer: WebpackConfigTransformer,
    devServerConfigTransformer: WebpackConfigTransformer
}

export function UseTailwindTransformer(tailwindConfigPath: string): TailwindTransformersType {

    function addTailwindConfig(config: WebpackConfigMutator): WebpackConfigMutator {
        // @ts-ignore
        const oneOfRule = findOneOfRuleInPreviewConfig(config.raw.module.rules);
        const cssRule = findCssRuleByCssNoModuleRegexp(oneOfRule);
        if (!cssRule) {
          throw new Error(
            "css rule not found. this probably means the webpack config of bit itself has changed"
          );
        }
        // we already have a postcss loader
        const postcssLoader = findPostcssLoaderInRule(cssRule.use);
        if (!postcssLoader) {
          throw new Error(
            "postcss loader not found. this probably means the webpack config of bit itself has changed"
          );
        }
        postcssLoader.options.postcssOptions.plugins.unshift(
          tailwindcssPlugin(tailwindConfigPath)
        );
        return config;
      }

     const previewConfig: WebpackConfigTransformer = (
        config: WebpackConfigMutator
      ) => {
        return addTailwindConfig(config);
      };
      
     const devServerConfig: WebpackConfigTransformer = (
        config: WebpackConfigMutator
      ) => {
        return addTailwindConfig(config);
      };

    return {
        previewConfigTransformer: previewConfig,
        devServerConfigTransformer: devServerConfig
    }
}





function findCssRuleByCssNoModuleRegexp(rules: Array<any> = []) {
  return rules.find(
    (rule) => rule.test.toString() === stylesRegexps.cssNoModulesRegex.toString()
  );
}

function findOneOfRuleInPreviewConfig(rules: Array<any> = []) {
  const rule = rules.find((rule) => !!rule.oneOf);
  return rule.oneOf;
}

function findPostcssLoaderInRule(loaders: Array<any>) {
  return loaders.find(loader => loader.loader.includes('postcss'));
}