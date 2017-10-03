import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SfWebClientSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import {DashboardModule} from '../dashboard/dashboard.module';


@NgModule({
    imports: [
        SfWebClientSharedModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true }),
        DashboardModule
    ],
    declarations: [
        HomeComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfWebClientHomeModule {}
