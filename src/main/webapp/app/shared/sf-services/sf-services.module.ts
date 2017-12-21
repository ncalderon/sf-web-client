import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {
    TranCategoryService
} from './';

@NgModule({
    imports: [
        HttpModule,
        CommonModule
    ],
    declarations: [],
    exports: [ ],
    providers: [TranCategoryService],
    entryComponents: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfServicesModule {
}
