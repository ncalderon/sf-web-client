import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SfWebClientBankAccountModule } from './bank-account/bank-account.module';
import { SfWebClientBankModule } from './bank/bank.module';
import { SfWebClientTranCategoryModule } from './tran-category/tran-category.module';
import { SfWebClientTranCategoryRegexModule } from './tran-category-regex/tran-category-regex.module';
import { SfWebClientAccountTransactionModule } from './account-transaction/account-transaction.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SfWebClientBankAccountModule,
        SfWebClientBankModule,
        SfWebClientTranCategoryModule,
        SfWebClientTranCategoryRegexModule,
        SfWebClientAccountTransactionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfWebClientEntityModule {}
