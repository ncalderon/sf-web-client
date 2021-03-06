import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SfWebClientSharedModule } from '../../shared';
import { SfWebClientAdminModule } from '../../admin/admin.module';
import {
    AccountTransactionService,
    AccountTransactionPopupService,
    AccountTransactionComponent,
    AccountTransactionDetailComponent,
    AccountTransactionDialogComponent,
    AccountTransactionPopupComponent,
    AccountTransactionDeletePopupComponent,
    AccountTransactionDeleteDialogComponent,
    accountTransactionRoute,
    accountTransactionPopupRoute,
    AccountTransactionResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...accountTransactionRoute,
    ...accountTransactionPopupRoute,
];

@NgModule({
    imports: [
        SfWebClientSharedModule,
        SfWebClientAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AccountTransactionComponent,
        AccountTransactionDetailComponent,
        AccountTransactionDialogComponent,
        AccountTransactionDeleteDialogComponent,
        AccountTransactionPopupComponent,
        AccountTransactionDeletePopupComponent,
    ],
    entryComponents: [
        AccountTransactionComponent,
        AccountTransactionDialogComponent,
        AccountTransactionPopupComponent,
        AccountTransactionDeleteDialogComponent,
        AccountTransactionDeletePopupComponent,
    ],
    providers: [
        AccountTransactionService,
        AccountTransactionPopupService,
        AccountTransactionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfWebClientAccountTransactionModule {}
