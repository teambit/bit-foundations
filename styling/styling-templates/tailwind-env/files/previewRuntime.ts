import { ComponentContext } from '@teambit/generator';

export function previewRuntimeFile({ namePascalCase: Name, name, nameCamelCase }: ComponentContext){
    return `
import { PreviewRuntime } from '@teambit/preview';
import { ReactAspect, ReactPreview } from '@teambit/react';

import '@learn-bit-react/ui-library-wrappers.tailwind.configs.tailwind-config/styles.css'; // <-- this is for shareable tw styles from a component
// import './tailwind/styles.css' // <-- this is for locally defined tailwind styles

import { ${Name}Aspect } from './${name}.aspect';

export class ${Name}Preview {
  static runtime = PreviewRuntime;

  static dependencies = [ReactAspect];

  static async provider([react]: [ReactPreview]) {
    const ${nameCamelCase}Preview = new ${Name}Preview();

    // uncomment the line below to register a new provider to wrap all compositions using this environment with a custom theme.
    // react.registerProvider([
        // add your composition-wrapper component/s here 
    //]);

    return ${nameCamelCase}Preview;
  }
}

${Name}Aspect.addRuntime(${Name}Preview);
`
}
