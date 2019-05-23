import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  NgZone,
  InjectionToken,
  Inject,
  Injectable
} from '@angular/core';
import { akitaDevtools, DevtoolsOptions } from '@datorama/akita';

export const DEVTOOLS_OPTIONS = new InjectionToken<DevtoolsOptions>(
  'DevtoolsOptions'
);

@Injectable()
export class AkitaDevtools {
  constructor(
    private ngZone: NgZone,
    @Inject(DEVTOOLS_OPTIONS) private options: DevtoolsOptions
  ) {
    akitaDevtools(this.ngZone, this.options);
  }
}

@NgModule({})
export class AkitaNgDevtools {
  public static forRoot(
    options?: Partial<DevtoolsOptions>
  ): ModuleWithProviders {
    return {
      ngModule: AkitaNgDevtools,
      providers: [
        AkitaDevtools,
        {
          provide: DEVTOOLS_OPTIONS,
          useValue: options
        }
      ]
    };
  }
}
