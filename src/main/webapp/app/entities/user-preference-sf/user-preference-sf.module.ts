import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SfwebSharedModule } from 'app/shared';
import { SfwebAdminModule } from 'app/admin/admin.module';
import {
    UserPreferenceSfComponent,
    UserPreferenceSfDetailComponent,
    UserPreferenceSfUpdateComponent,
    UserPreferenceSfDeletePopupComponent,
    UserPreferenceSfDeleteDialogComponent,
    userPreferenceRoute,
    userPreferencePopupRoute
} from './';

const ENTITY_STATES = [...userPreferenceRoute, ...userPreferencePopupRoute];

@NgModule({
    imports: [SfwebSharedModule, SfwebAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserPreferenceSfComponent,
        UserPreferenceSfDetailComponent,
        UserPreferenceSfUpdateComponent,
        UserPreferenceSfDeleteDialogComponent,
        UserPreferenceSfDeletePopupComponent
    ],
    entryComponents: [
        UserPreferenceSfComponent,
        UserPreferenceSfUpdateComponent,
        UserPreferenceSfDeleteDialogComponent,
        UserPreferenceSfDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfwebUserPreferenceSfModule {}
