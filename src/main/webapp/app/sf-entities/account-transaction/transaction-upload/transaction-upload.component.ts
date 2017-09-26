import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoggerService} from '../../../shared/logger/logger.service';
import {Subscription} from 'rxjs/Subscription';
import {FileUploader} from 'ng2-file-upload';
import {FinanceAccount} from '../../finance-account/finance-account.model';
import {AccountTransaction} from '../account-transaction.model';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {FinanceAccountService} from '../../finance-account/finance-account.service';
import {ActivatedRoute} from '@angular/router';
import {AuthServerProvider} from '../../../shared/auth/auth-jwt.service';
import {ResponseWrapper} from '../../../shared/model/response-wrapper.model';

@Component({
    selector: 'jhi-transaction-upload',
    templateUrl: './transaction-upload.component.html',
    styles: []
})
export class TransactionUploadComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private eventSubscriber: Subscription;


    hasBaseDropZoneOver = false;
    isSaving: boolean;
    uploader: FileUploader;
    account: FinanceAccount;
    accounts: FinanceAccount[];
    transactions: AccountTransaction[] = [];

    constructor(
        private logger: LoggerService,
        private alertService: JhiAlertService,
        private accountService: FinanceAccountService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute,
        private authServerProvider: AuthServerProvider
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.uploader = new FileUploader({url: 'api/account-transactions/upload', authToken: 'Bearer ' + this.authServerProvider.getToken() });
        this.subscription = this.route.params.subscribe((params) => {
            this.load();
        });
        /*this.registerChangeInAccountTransactions();*/
    }

    load() {
        this.logger.log('***Loading***');
        this.accountService.query()
            .subscribe((res: ResponseWrapper) => { this.accounts = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    goBack() {
        this.logger.log('***Back***');
        window.history.back();
    }

    clear() {
        this.logger.log('***Clear***');
    }

    save() {
        this.logger.log('***Saving***');
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAccountTransactions() {
        /*this.eventSubscriber = this.eventManager.subscribe(
            'accountTransactionListModification',
            (response) => this.load(this.accountTransaction.id)
        );*/
    }
}
