import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SfwebSharedModule } from 'app/shared';
import { SfwebAdminModule } from 'app/admin/admin.module';
import {
    FinAccSfComponent,
    FinAccSfDetailComponent,
    FinAccSfUpdateComponent,
    FinAccSfDeletePopupComponent,
    FinAccSfDeleteDialogComponent,
    finAccRoute,
    finAccPopupRoute
} from './';

const ENTITY_STATES = [...finAccRoute, ...finAccPopupRoute];

@NgModule({
    imports: [SfwebSharedModule, SfwebAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FinAccSfComponent,
        FinAccSfDetailComponent,
        FinAccSfUpdateComponent,
        FinAccSfDeleteDialogComponent,
        FinAccSfDeletePopupComponent
    ],
    entryComponents: [FinAccSfComponent, FinAccSfUpdateComponent, FinAccSfDeleteDialogComponent, FinAccSfDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfwebFinAccSfModule {}
