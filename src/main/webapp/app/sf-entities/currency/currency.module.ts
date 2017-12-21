import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SfWebClientSharedModule } from '../../shared';
import { SfWebClientAdminModule } from '../../admin/admin.module';
import {
    Currency,
} from './';

@NgModule({
    imports: [
        SfWebClientSharedModule,
        SfWebClientAdminModule
    ],
    declarations: [
    ],
    entryComponents: [

    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfWebClientCurrencyModule {}
