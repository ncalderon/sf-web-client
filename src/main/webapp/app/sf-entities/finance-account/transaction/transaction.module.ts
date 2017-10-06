
import {
    TransactionPopupService,
    TransactionComponent,
    TransactionDialogComponent,
    TransactionPopupComponent,
    TransactionDeletePopupComponent,
    TransactionDeleteDialogComponent,
    TransactionUploadComponent,
    transactionRoute,
    transactionPopupRoute,
    TransactionResolvePagingParams
} from './';
import {SfWebClientSharedModule} from '../../../shared/shared.module';
import {SfWebClientAdminModule} from '../../../admin/admin.module';
import {RouterModule} from '@angular/router';
import {FileUploadModule} from 'ng2-file-upload';
import {SearchModule} from '../../../shared/search/search.module';
import {AccountTransactionService} from '../../account-transaction/account-transaction.service';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';


const ENTITY_STATES = [
    ...transactionRoute,
    ...transactionPopupRoute,
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
        TransactionComponent,
        TransactionDialogComponent,
        TransactionDeleteDialogComponent,
        TransactionPopupComponent,
        TransactionDeletePopupComponent,
        TransactionUploadComponent
    ],
    entryComponents: [
        TransactionComponent,
        TransactionDialogComponent,
        TransactionPopupComponent,
        TransactionDeleteDialogComponent,
        TransactionDeletePopupComponent,
        TransactionUploadComponent
    ],
    providers: [
        AccountTransactionService,
        TransactionPopupService,
        TransactionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfWebClientTransactionModule {}
