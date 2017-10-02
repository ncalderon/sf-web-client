import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SfWebClientSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import {SfChartsModule} from '../shared/charts/sf-charts.module';

@NgModule({
    imports: [
        SfWebClientSharedModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true }),
        SfChartsModule
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfWebClientHomeModule {}
