import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SfWebClientSharedModule } from '../../shared';
import { SfWebClientAdminModule } from '../../admin/admin.module';
import {
    FinanceAccountService,
    FinanceAccountPopupService,
    FinanceAccountComponent,
    FinanceAccountDetailComponent,
    FinanceAccountDialogComponent,
    FinanceAccountPopupComponent,
    FinanceAccountDeletePopupComponent,
    FinanceAccountDeleteDialogComponent,
    financeAccountRoute,
    financeAccountPopupRoute,
    FinanceAccountResolvePagingParams,
    SfWebClientTransactionModule
} from './';


const ENTITY_STATES = [
    ...financeAccountRoute,
    ...financeAccountPopupRoute,
];

@NgModule({
    imports: [
        SfWebClientSharedModule,
        SfWebClientAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
        SfWebClientTransactionModule
    ],
    declarations: [
        FinanceAccountComponent,
        FinanceAccountDetailComponent,
        FinanceAccountDialogComponent,
        FinanceAccountDeleteDialogComponent,
        FinanceAccountPopupComponent,
        FinanceAccountDeletePopupComponent,
    ],
    entryComponents: [
        FinanceAccountComponent,
        FinanceAccountDialogComponent,
        FinanceAccountPopupComponent,
        FinanceAccountDeleteDialogComponent,
        FinanceAccountDeletePopupComponent,
    ],
    providers: [
        FinanceAccountService,
        FinanceAccountPopupService,
        FinanceAccountResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfWebClientFinanceAccountModule {}
