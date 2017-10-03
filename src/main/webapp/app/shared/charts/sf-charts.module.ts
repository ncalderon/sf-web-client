import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {LineChartComponent} from './line-chart/line-chart.component';
import {ChartsModule} from 'ng2-charts';
import {SfWebClientSharedModule} from '../shared.module';
import {BarChartComponent} from './bar-chart/bar-chart.component';

@NgModule({
    imports: [
        ChartsModule, SfWebClientSharedModule
    ],
    declarations: [LineChartComponent, BarChartComponent],
    exports: [LineChartComponent, BarChartComponent],
    providers: [],
    entryComponents: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfChartsModule {
}
