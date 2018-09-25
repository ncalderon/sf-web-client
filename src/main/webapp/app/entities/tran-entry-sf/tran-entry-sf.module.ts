import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SfwebSharedModule } from 'app/shared';
import { SfwebAdminModule } from 'app/admin/admin.module';
import {
    TranEntrySfComponent,
    TranEntrySfDetailComponent,
    TranEntrySfUpdateComponent,
    TranEntrySfDeletePopupComponent,
    TranEntrySfDeleteDialogComponent,
    tranEntryRoute,
    tranEntryPopupRoute
} from './';

const ENTITY_STATES = [...tranEntryRoute, ...tranEntryPopupRoute];

@NgModule({
    imports: [SfwebSharedModule, SfwebAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TranEntrySfComponent,
        TranEntrySfDetailComponent,
        TranEntrySfUpdateComponent,
        TranEntrySfDeleteDialogComponent,
        TranEntrySfDeletePopupComponent
    ],
    entryComponents: [TranEntrySfComponent, TranEntrySfUpdateComponent, TranEntrySfDeleteDialogComponent, TranEntrySfDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfwebTranEntrySfModule {}
