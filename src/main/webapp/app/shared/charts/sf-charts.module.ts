import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {LineChartComponent} from './line-chart/line-chart.component';
import {ChartsModule} from 'ng2-charts';
import {SfWebClientSharedModule} from "../shared.module";
import { BarChartComponent } from './src/main/webapp/app/shared/charts/bar-chart/bar-chart.component';

@NgModule({
    imports: [
        ChartsModule, SfWebClientSharedModule
    ],
    declarations: [LineChartComponent, BarChartComponent],
    exports: [ChartsModule, LineChartComponent],
    providers: [],
    entryComponents: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfChartsModule {
}
