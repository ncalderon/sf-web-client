import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SfWebClientBankModule } from './bank/bank.module';
import { SfWebClientTranCategoryModule } from './tran-category/tran-category.module';
import { SfWebClientTranCategoryRegexModule } from './tran-category-regex/tran-category-regex.module';
import { SfWebClientAccountTransactionModule } from './account-transaction/account-transaction.module';
import { SfWebClientFinanceAccountModule } from './finance-account/finance-account.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SfWebClientBankModule,
        SfWebClientTranCategoryModule,
        SfWebClientTranCategoryRegexModule,
        SfWebClientAccountTransactionModule,
        SfWebClientFinanceAccountModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfWebClientEntityModule {}
