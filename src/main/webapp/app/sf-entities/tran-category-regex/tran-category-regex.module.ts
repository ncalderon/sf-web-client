import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SfWebClientSharedModule } from '../../shared';
import { SfWebClientAdminModule } from '../../admin/admin.module';
import {
    TranCategoryRegexPopupService,
    TranCategoryRegexComponent,
    TranCategoryRegexDetailComponent,
    TranCategoryRegexDialogComponent,
    TranCategoryRegexPopupComponent,
    TranCategoryRegexDeletePopupComponent,
    TranCategoryRegexDeleteDialogComponent,
    tranCategoryRegexRoute,
    tranCategoryRegexPopupRoute,
    TranCategoryRegexResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...tranCategoryRegexRoute,
    ...tranCategoryRegexPopupRoute,
];

@NgModule({
    imports: [
        SfWebClientSharedModule,
        SfWebClientAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TranCategoryRegexComponent,
        TranCategoryRegexDetailComponent,
        TranCategoryRegexDialogComponent,
        TranCategoryRegexDeleteDialogComponent,
        TranCategoryRegexPopupComponent,
        TranCategoryRegexDeletePopupComponent,
    ],
    entryComponents: [
        TranCategoryRegexComponent,
        TranCategoryRegexDialogComponent,
        TranCategoryRegexPopupComponent,
        TranCategoryRegexDeleteDialogComponent,
        TranCategoryRegexDeletePopupComponent,
    ],
    providers: [
        TranCategoryRegexPopupService,
        TranCategoryRegexResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfWebClientTranCategoryRegexModule {}
