import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SfwebSharedModule } from 'app/shared';
import {
    PreferenceSfComponent,
    PreferenceSfDetailComponent,
    PreferenceSfUpdateComponent,
    PreferenceSfDeletePopupComponent,
    PreferenceSfDeleteDialogComponent,
    preferenceRoute,
    preferencePopupRoute
} from './';

const ENTITY_STATES = [...preferenceRoute, ...preferencePopupRoute];

@NgModule({
    imports: [SfwebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PreferenceSfComponent,
        PreferenceSfDetailComponent,
        PreferenceSfUpdateComponent,
        PreferenceSfDeleteDialogComponent,
        PreferenceSfDeletePopupComponent
    ],
    entryComponents: [
        PreferenceSfComponent,
        PreferenceSfUpdateComponent,
        PreferenceSfDeleteDialogComponent,
        PreferenceSfDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfwebPreferenceSfModule {}
