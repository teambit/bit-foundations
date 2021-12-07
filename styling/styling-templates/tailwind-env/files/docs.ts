import { ComponentContext } from '@teambit/generator';

export function docFile({ name, componentId }: ComponentContext) {
  return `---
  description: 'An example react environment with tailwind webpack transformers added'
  labels: ['react', 'env', 'tailwind', 'example']
  ---
  
  ## Overview
  
  A customized react environment, with tailwind support added via a webpack config component.
  
  ### Usage instructions
  
  Under the **variant** section of your \`workspace.json\` file choose which components you want to have the custom environment set. You can find the id of the extension in the \`${name}.aspect.ts\` file.
  
  \`\`\`json
  {
    "teambit.workspace/variants": {
      "{ui/**}, {pages/**}": {
        "${componentId}": {}
      }
    }
  }
  \`\`\`
  
  ## Runtime Configurations

  ### Tailwind Config - internal or via a shareable component
  
  #### Shareable Tailwind Config

  A demo of importing a tailwind configuration has been added to this env's webpack config via the [template webpack transformer component](https://bit.dev/learn-bit-react/ui-library-wrappers/tailwind/configs/transformers). This component returns a pair of transformers
  that configure webpack for \`tailwind\` support.

  To consume tailwind configs via a component, create your own tailwind config component and then consume it in the same manner.

  #### Internal Config

  Alternatively, you can just add the tailwind config in your env itself, and then reference the local 
  
  ## Preview Configurations
  
  Tailwind styles have been added to the \`.preview.runtime.ts\` file in order to simulate the styles configuration from a consuming app in component compositions.
`;
}
