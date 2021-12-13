import { ComponentContext, ComponentTemplate } from '@teambit/generator';
import { indexFile } from './files/index';
import { docFile } from './files/docs';
import { mainRuntimeFile } from './files/mainRuntime';
import { previewRuntimeFile } from './files/previewRuntime';
import { aspectFile } from './files/aspect';
import { webpackConfigFile } from './files/webpack.config';
import { typescriptConfigFile } from './files/typescript.config';
import { jestConfigFile } from './files/jest.config';
import { tailwindConfigFile } from './files/tailwindConfigs/tailwindConfig';
import { stylesCssFile } from './files/tailwindConfigs/stylesCss';

export const tailwindEnvTemplate: ComponentTemplate = {
  name: 'tailwind-env',
  description: 'tailwind-configured custom react env',
  generateFiles: (context: ComponentContext) => {
    return [
      {
        relativePath: 'index.ts',
        content: indexFile(context),
        isMain: true,
      },
      {
        relativePath: `${context.name}.docs.mdx`,
        content: docFile(context),
      },
      {
        relativePath: `${context.name}.main.runtime.ts`,
        content: mainRuntimeFile(context),
      },
      {
        relativePath: `${context.name}.preview.runtime.ts`,
        content: previewRuntimeFile(context),
      },
      {
        relativePath: `${context.name}.aspect.ts`,
        content: aspectFile(context),
      },
      {
        relativePath: `webpack/webpack-transformers.ts`,
        content: webpackConfigFile(),
      },
      {
        relativePath: `typescript/tsconfig.json`,
        content: typescriptConfigFile(),
      },
      {
        relativePath: `jest/jest.config.js`,
        content: jestConfigFile(),
      },
      {
        relativePath: `tailwind/tailwind.config.js`,
        content: tailwindConfigFile(),
      },
      {
        relativePath: `tailwind/styles.css`,
        content: stylesCssFile(),
      },
    ];
  },
};
