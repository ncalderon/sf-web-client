import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CurrencyService} from '.';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {CurrencyUtilService} from './currency-util.service';

@NgModule({
    imports: [
        HttpModule,
        CommonModule
    ],
    declarations: [],
    exports: [],
    providers: [CurrencyService, CurrencyUtilService],
    entryComponents: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfCurrencyModule {
}
