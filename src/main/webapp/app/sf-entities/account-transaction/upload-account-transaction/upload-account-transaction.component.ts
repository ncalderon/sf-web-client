import {Component, OnDestroy, OnInit} from '@angular/core';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AccountTransaction} from '../account-transaction.model';
import {LoggerService} from '../../../shared/logger/logger.service';
import {BankAccount} from '../../bank-account/bank-account.model';
import {FileUploader} from 'ng2-file-upload';
import {ResponseWrapper} from '../../../shared/model/response-wrapper.model';
import {BankAccountService} from '../../bank-account/bank-account.service';
import {AuthServerProvider} from '../../../shared/auth/auth-jwt.service';

@Component({
  selector: 'jhi-upload-account-transaction',
  templateUrl: './upload-account-transaction.component.html',
  styles: []
})
export class UploadAccountTransactionComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private eventSubscriber: Subscription;


    hasBaseDropZoneOver = false;
    isSaving: boolean;
    uploader: FileUploader;
    bankAccount: BankAccount;
    bankAccounts: BankAccount[];
    accountTransactions: AccountTransaction[] = [];

    constructor(
        private logger: LoggerService,
        private alertService: JhiAlertService,
        private bankAccountService: BankAccountService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute,
        private authServerProvider: AuthServerProvider
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.uploader = new FileUploader({url: 'api/account-transactions/upload', authToken: "Bearer " + this.authServerProvider.getToken() });
        this.subscription = this.route.params.subscribe((params) => {
            this.load();
        });
        /*this.registerChangeInAccountTransactions();*/
    }

    load() {
        this.logger.log('***Loading***');
        this.bankAccountService.query()
            .subscribe((res: ResponseWrapper) => { this.bankAccounts = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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
