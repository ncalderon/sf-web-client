import {
    TransactionPopupService,
    TransactionComponent,
    TransactionDialogComponent,
    TransactionPopupComponent,
    TransactionDeletePopupComponent,
    TransactionDeleteDialogComponent,
    TranUploadComponent,
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
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";


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
        SearchModule,
        TypeaheadModule.forRoot(),
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        TransactionComponent,
        TransactionDialogComponent,
        TransactionDeleteDialogComponent,
        TransactionPopupComponent,
        TransactionDeletePopupComponent,
        TranUploadComponent
    ],
    providers: [
        AccountTransactionService,
        TransactionPopupService,
        TransactionResolvePagingParams,
    ],
    entryComponents: [
        TranUploadComponent,
        TransactionDialogComponent,
        TransactionDeleteDialogComponent,
        TransactionPopupComponent,
        TransactionDeletePopupComponent
    ],
    exports: [
        TransactionComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfWebClientTransactionModule {}
