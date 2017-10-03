import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SfChartsModule} from '../shared/charts/sf-charts.module';
import {DashboardComponent} from './dashboard.component';
import {SfWebClientSharedModule} from '../shared/shared.module';
import {DASHBOARD_ROUTE} from './dashboard.route';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        SfWebClientSharedModule,
        RouterModule.forRoot([ DASHBOARD_ROUTE ], { useHash: true }),
        SfChartsModule
    ],
    declarations: [DashboardComponent],
    exports: [DashboardComponent],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {
}
