import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SfWebClientSharedModule } from '../../shared';
import { SfWebClientAdminModule } from '../../admin/admin.module';
import {
    AccountTransactionPopupService,
    AccountTransactionComponent,
    AccountTransactionDetailComponent,
    AccountTransactionDialogComponent,
    AccountTransactionPopupComponent,
    AccountTransactionDeletePopupComponent,
    AccountTransactionDeleteDialogComponent,
    TransactionUploadComponent,
    accountTransactionRoute,
    accountTransactionPopupRoute,
    AccountTransactionResolvePagingParams
} from './';
import {FileUploadModule} from 'ng2-file-upload';
import {SearchModule} from '../../shared/search/search.module';

const ENTITY_STATES = [
    ...accountTransactionRoute,
    ...accountTransactionPopupRoute,
];

@NgModule({
    imports: [
        SfWebClientSharedModule,
        SfWebClientAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true, enableTracing: true }),
        FileUploadModule,
        SearchModule
    ],
    declarations: [
        AccountTransactionComponent,
        AccountTransactionDetailComponent,
        AccountTransactionDialogComponent,
        AccountTransactionDeleteDialogComponent,
        AccountTransactionPopupComponent,
        AccountTransactionDeletePopupComponent,
        TransactionUploadComponent
    ],
    entryComponents: [
        AccountTransactionComponent,
        AccountTransactionDialogComponent,
        AccountTransactionPopupComponent,
        AccountTransactionDeleteDialogComponent,
        AccountTransactionDeletePopupComponent,
        TransactionUploadComponent
    ],
    providers: [
        AccountTransactionPopupService,
        AccountTransactionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfWebClientAccountTransactionModule {}
