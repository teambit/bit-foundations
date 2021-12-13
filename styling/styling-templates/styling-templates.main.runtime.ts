import { MainRuntime } from '@teambit/cli';
import { GeneratorMain, GeneratorAspect, ComponentContext } from '@teambit/generator';
import { StylingTemplatesAspect } from './styling-templates.aspect';
import { tailwindEnvTemplate } from './tailwind-env';

export class StylingTemplatesMain {
  static slots = [];
  static dependencies = [GeneratorAspect];
  static runtime = MainRuntime;
  static async provider([generator]: [GeneratorMain]) {
  /**
  * Array of templates. Add as many templates as you want
  * Separate the templates to multiple files if you prefer
  * Modify, add or remove files as needed
  * See the docs file of this component for more info
  */

    generator.registerComponentTemplate([tailwindEnvTemplate]);

    return new StylingTemplatesMain();
  }
}

StylingTemplatesAspect.addRuntime(StylingTemplatesMain);
