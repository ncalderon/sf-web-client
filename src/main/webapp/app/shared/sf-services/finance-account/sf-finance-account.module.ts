import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FinanceAccountService} from '.'
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        HttpModule,
        CommonModule
    ],
    declarations: [],
    exports: [],
    providers: [FinanceAccountService],
    entryComponents: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfFinanceAccountModule {
}
