import { ComponentContext } from '@teambit/generator';

export function docFile({ name, componentId }: ComponentContext) {
  return `---
description: 'A react environment with tailwind support'
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

Make sure also to add a variant in the same section which configures this env with the "teambit.harmony/aspect" env so that this component builds as an env itself.
e.g. 
\`\`\`json
// inside the variants section of workspace.jsonc
    "somepath/${name}": { // this is a simple selector to select only your component directly via it's directory location
       "teambit.harmony/aspect": {}
    }
\`\`\`

Then run \`bit install tailwindcss postcss autoprefixer\` to make sure you have all the required dependencies for adding tailwind support for your components.

You will also need to install the \`@learn-bit-react/ui-library-wrappers.tailwind.configs.tailwind-config\` component if you want to use that demo config, or just replace
that (in \`main.runtime.ts\`) with your own tailwind config component or local config (see below for details).

## Configurations

### Tailwind Config - internal or via a shareable component

#### Shareable Tailwind Config

A demo of importing a tailwind configuration has been added to this env's webpack config via the [sample tailwind config component](https://bit.dev/learn-bit-react/ui-library-wrappers/tailwind/configs/tailwind-config). This component is supplied to the 
[tailwind webpack transform component](https://bit.dev/bit-foundations/styling/tailwind/webpack-transformer) which returns a pair of transformers
that configure webpack for \`tailwind\` support. 

To use your own tailwind config, create a clone of the sample tailwind config component above, add your own config and then export as a component. Then replace the import of the sample config in the .main.runtime.ts file in this env, and 
the env will then be configured with your own config.

Note, to then use your own styles, adjust the styles.css in your new tailwind-config component to include the tailwind features you want, and then in the \`.preview.runtime.ts\` file in this env
replace the direct import of styles.css to point to your new tailwind-config component.

#### Internal Config

Alternatively, you can just add the \`tailwind.config.js\` (and styles.css) in your env itself, and then reference this local config as above for the external configs

> NOTE: the tailwind configs and styles defined in the bit env are ONLY relevant for rendering your component in bit (in the local dev server and on the remote scope, e.g. bit.cloud). When consuming your components they will render according
to the configs and styles injected by the consuming application / component. Presumably you will use the same configs and styles as you use with your components, but it's important to be aware that the 
configs set via bit do not automatially follow your component to the consuming environment.
`;
}
