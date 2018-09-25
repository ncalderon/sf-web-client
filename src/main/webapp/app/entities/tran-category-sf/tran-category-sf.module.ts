import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SfwebSharedModule } from 'app/shared';
import { SfwebAdminModule } from 'app/admin/admin.module';
import {
    TranCategorySfComponent,
    TranCategorySfDetailComponent,
    TranCategorySfUpdateComponent,
    TranCategorySfDeletePopupComponent,
    TranCategorySfDeleteDialogComponent,
    tranCategoryRoute,
    tranCategoryPopupRoute
} from './';

const ENTITY_STATES = [...tranCategoryRoute, ...tranCategoryPopupRoute];

@NgModule({
    imports: [SfwebSharedModule, SfwebAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TranCategorySfComponent,
        TranCategorySfDetailComponent,
        TranCategorySfUpdateComponent,
        TranCategorySfDeleteDialogComponent,
        TranCategorySfDeletePopupComponent
    ],
    entryComponents: [
        TranCategorySfComponent,
        TranCategorySfUpdateComponent,
        TranCategorySfDeleteDialogComponent,
        TranCategorySfDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfwebTranCategorySfModule {}
