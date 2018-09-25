import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SfwebSharedModule } from 'app/shared';
import {
    CurrencySfComponent,
    CurrencySfDetailComponent,
    CurrencySfUpdateComponent,
    CurrencySfDeletePopupComponent,
    CurrencySfDeleteDialogComponent,
    currencyRoute,
    currencyPopupRoute
} from './';

const ENTITY_STATES = [...currencyRoute, ...currencyPopupRoute];

@NgModule({
    imports: [SfwebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CurrencySfComponent,
        CurrencySfDetailComponent,
        CurrencySfUpdateComponent,
        CurrencySfDeleteDialogComponent,
        CurrencySfDeletePopupComponent
    ],
    entryComponents: [CurrencySfComponent, CurrencySfUpdateComponent, CurrencySfDeleteDialogComponent, CurrencySfDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfwebCurrencySfModule {}
