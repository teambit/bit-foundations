import { ComponentContext } from '@teambit/generator';

export function AspectFile({ namePascalCase: Name, name, componentId }: ComponentContext){
    return {relativePath: `${name}.aspect.ts`,
        isMain: false,
        content: `
import { Aspect } from '@teambit/harmony';

export const ${Name}Aspect = Aspect.create({
    id: '${componentId}',
});
`
    }
}


