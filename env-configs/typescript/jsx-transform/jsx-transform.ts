import * as path from 'path';
import {
  TsConfigTransformer,
  TypescriptConfigMutator,
} from "@teambit/typescript";

/**
 * Transformation for the dev config only
 * @param config
 * @param context
 * @returns
 */
export const devConfigTransformer: TsConfigTransformer = (
  config: TypescriptConfigMutator,
) => {
  config.raw.tsconfig.compilerOptions.jsx = "react-jsxdev";
  return config;
};

/**
 * Transformation for the build only
 * @param config
 * @param context
 * @returns
 */
export const buildConfigTransformer: TsConfigTransformer = (
  config: TypescriptConfigMutator
) => {
  config.raw.tsconfig.compilerOptions.jsx = "react-jsx";
  return config;
};