import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BankService } from '.';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
@NgModule({
    imports: [
        HttpModule,
        CommonModule
    ],
    declarations: [],
    exports: [],
    providers: [BankService],
    entryComponents: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfBankModule {
}
