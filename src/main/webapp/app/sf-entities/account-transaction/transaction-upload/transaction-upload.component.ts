import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoggerService} from '../../../shared/logger/logger.service';
import {Subscription} from 'rxjs/Subscription';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {FinanceAccount} from '../../finance-account/finance-account.model';
import {AccountTransaction} from '../account-transaction.model';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {FinanceAccountService} from '../../finance-account/finance-account.service';
import {ActivatedRoute} from '@angular/router';
import {AuthServerProvider} from '../../../shared/auth/auth-jwt.service';
import {ResponseWrapper} from '../../../shared/model/response-wrapper.model';
import {AccountTransactionService} from '../account-transaction.service';
import {TranCategoryService} from '../../tran-category/tran-category.service';
import {TranCategory} from '../../tran-category/tran-category.model';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'jhi-transaction-upload',
    templateUrl: './transaction-upload.component.html',
    styles: []
})
export class TransactionUploadComponent implements OnInit, OnDestroy {

    hasBaseDropZoneOver = false;
    isSaving: boolean;
    uploader: FileUploader;
    account: FinanceAccount;
    accounts: FinanceAccount[];
    categories: TranCategory[];
    transactions: AccountTransaction[] = [];
    fileInput: any;


    constructor(
        private logger: LoggerService,
        private alertService: JhiAlertService,
        private accountService: FinanceAccountService,
        private tranCategoryService: TranCategoryService,
        private transactionService: AccountTransactionService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute,
        private authServerProvider: AuthServerProvider
    ) {
    }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.transactions); }

    ngOnInit() {
        this.load();
    }

    load() {
        this.logger.log('***Loading***');

        this.uploader = new FileUploader({url: 'api/account-transactions/upload', authToken: 'Bearer ' + this.authServerProvider.getToken() });
        this.uploader.onCompleteItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
            this.onCompleteUpload(item, response, status, headers);
        };
        this.isSaving = false;

        this.accountService.query()
            .subscribe((res: ResponseWrapper) => {
                this.accounts = res.json;
                this.account = this.accounts.length > 0? this.accounts[0] : this.account;
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.tranCategoryService.query()
            .subscribe((res: ResponseWrapper) => {
                this.categories = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));

    }

    onCompleteUpload(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
        this.logger.info("******* Response from upload file endpoint *******");
        this.logger.info(JSON.parse(response));
        this.transactions = <AccountTransaction[]>JSON.parse(response);
        this.uploader.clearQueue();
        this.fileInput = null;
        return void 0;
    }
    upload() {
        this.logger.info("Uploading");
        this.uploader.uploadItem(<FileItem>this.uploader.getNotUploadedItems()[0]);
        /*this.uploader.component = this;*/
    }

    trackAccountById(index: number, item: FinanceAccount) {
        return item.id;
    }

    trackTranCategoryById(index: number, item: TranCategory) {
        return item.id;
    }

    trackId(index: number, item: AccountTransaction) {
        return item.id;
    }

    goBack() {
        this.logger.log('***Back***');
        this.clear();
        window.history.back();
    }

    clear() {
        this.logger.log('***Clear***');
        this.transactions = [];
        this.account = null;
        this.uploader.clearQueue();
        this.fileInput = null;
    }

    private subscribeToSaveResponse(result: Observable<AccountTransaction>) {
        result.subscribe((res: AccountTransaction) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    save() {
        this.isSaving = true;
        this.logger.log('***Saving***');
        /*this.accountTransaction.user = this.currentUser;*/
        /*if (this.accountTransaction.id !== undefined) {
            this.subscribeToSaveResponse(
                this.accountTransactionService.update(this.accountTransaction));
        } else {
            this.subscribeToSaveResponse(
                this.accountTransactionService.create(this.accountTransaction));
        }*/
    }

    private onSaveSuccess(result: AccountTransaction) {
        //this.eventManager.broadcast({ name: 'accountTransactionListModification', content: 'OK'});
        this.isSaving = false;

    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    ngOnDestroy() {


    }

}
