import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {LineChartComponent} from './line-chart/line-chart.component';
import {ChartsModule} from 'ng2-charts';
import {SfWebClientSharedModule} from "../shared.module";

@NgModule({
    imports: [
        ChartsModule, SfWebClientSharedModule
    ],
    declarations: [LineChartComponent],
    exports: [ChartsModule, LineChartComponent],
    providers: [],
    entryComponents: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfChartsModule {
}
