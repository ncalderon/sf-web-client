import {Component, OnDestroy, OnInit} from '@angular/core';
import {JhiEventManager} from 'ng-jhipster';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AccountTransaction} from '../account-transaction.model';
import {LoggerService} from '../../../shared/logger/logger.service';
import {BankAccount} from '../../bank-account/bank-account.model';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'jhi-upload-account-transaction',
  templateUrl: './upload-account-transaction.component.html',
  styles: []
})
export class UploadAccountTransactionComponent implements OnInit, OnDestroy {

    uploader: FileUploader = new FileUploader({url: 'api/account-transactions/upload-file'});
    hasBaseDropZoneOver = false;
    isSaving: boolean;

    private subscription: Subscription;
    private eventSubscriber: Subscription;


    bankAccount: BankAccount;
    accountTransactions: AccountTransaction[] = [];

    constructor(
        private logger: LoggerService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load();
        });
        /*this.registerChangeInAccountTransactions();*/
    }

    load() {
        this.logger.log("***Loading***");
    }

    goBack() {
        this.logger.log("***Back***");
        window.history.back();
    }

    clear() {
        this.logger.log("***Clear***");
    }

    save(){
        this.logger.log("***Saving***");
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
