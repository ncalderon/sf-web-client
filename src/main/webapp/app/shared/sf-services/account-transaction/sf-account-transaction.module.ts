import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {AccountTransactionService} from './';

@NgModule({
    imports: [
        HttpModule,
        CommonModule
    ],
    declarations: [],
    exports: [],
    providers: [
        AccountTransactionService
    ],
    entryComponents: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfAccountTransactionModule {
}
