import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoggerService} from '../../../shared/logger/logger.service';
import {Subscription} from 'rxjs/Subscription';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {FinanceAccount} from '../../finance-account/finance-account.model';
import {AccountTransaction} from '../account-transaction.model';
import {JhiAlertService, JhiDateUtils, JhiEventManager} from 'ng-jhipster';
import {FinanceAccountService} from '../../finance-account/finance-account.service';
import {ActivatedRoute} from '@angular/router';
import {AuthServerProvider} from '../../../shared/auth/auth-jwt.service';
import {ResponseWrapper} from '../../../shared/model/response-wrapper.model';
import {AccountTransactionService} from '../account-transaction.service';
import {TranCategoryService} from '../../tran-category/tran-category.service';
import {TranCategory} from '../../tran-category/tran-category.model';
import {Observable} from 'rxjs/Observable';
import {User} from '../../../shared/user/user.model';
import {Principal} from '../../../shared/auth/principal.service';
import {DatetimeService} from '../../../shared/datetime/datetime.service';
import {Bank} from '../../bank/bank.model';
import {BankService} from '../../bank/bank.service';

@Component({
    selector: 'jhi-transaction-upload',
    templateUrl: './transaction-upload.component.html',
    styles: []
})
export class TransactionUploadComponent implements OnInit, OnDestroy {

    /*component property*/
    hasBaseDropZoneOver = false;
    isSaving: boolean;
    uploader: FileUploader;

    /*dropdown data*/
    accounts: FinanceAccount[];
    categories: TranCategory[];

    /*model*/
    transactions: AccountTransaction[] = [];
    account: FinanceAccount;
    bank: Bank;
    banks: Bank[] = [];
    currentUser: User;
    fileInput: any;

    constructor(
        private logger: LoggerService,
        private alertService: JhiAlertService,

        private accountService: FinanceAccountService,
        private tranCategoryService: TranCategoryService,
        private transactionService: AccountTransactionService,
        private bankService: BankService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute,
        private authServerProvider: AuthServerProvider,
        private principal: Principal,
        private dateUtils: JhiDateUtils
    ) {
    }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.transactions); }

    ngOnInit() {
        this.load();
    }

    load() {

        this.logger.log('***Loading***');
        this.isSaving = false;
        this.uploader = new FileUploader({url: 'api/account-transactions/upload', authToken: 'Bearer ' + this.authServerProvider.getToken() });
        this.uploader.onCompleteItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
            this.onCompleteUpload(item, response, status, headers);
        };
        this.uploader.onBuildItemForm = (fileItem: FileItem, form: any) => {
            this.onBuildItemForm(fileItem, form);
        };

        this.principal.identity().then((user) => {
            this.currentUser = user;
        });

        this.accountService.query()
            .subscribe((res: ResponseWrapper) => {
                this.accounts = res.json;
                this.account = this.accounts.length > 0 ? this.accounts[0] : this.account;
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.tranCategoryService.query()
            .subscribe((res: ResponseWrapper) => {
                this.categories = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));

        this.bankService.query().subscribe((res: ResponseWrapper) => {
                this.banks = res.json;
                this.bank = this.banks.length > 0 ? this.banks[0] : this.bank;
            }, (res: ResponseWrapper) =>
                this.onError(res.json)
            );

    }

    private onBuildItemForm(fileItem: FileItem, form: any): any {
        this.logger.info("******onBuildItemForm*****");
        form.append("bank", this.bank.id);
    }

    private onCompleteUpload(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
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

    remove(index: number, item: AccountTransaction) {
        this.transactions.splice(index,  1);
    }

    trackBankById(index: number, item: Bank) {
        return item.id;
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

    private onSaveSuccess(result: AccountTransaction[]) {
        this.eventManager.broadcast({ name: 'accountTransactionListModification', content: 'OK'});
        this.isSaving = false;
        this.goBack();
    }

    private subscribeToSaveResponse(result: Observable<AccountTransaction[]>) {
        result.subscribe((res: AccountTransaction[]) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private prepareTransactions(): AccountTransaction[] {
        const copyTransactions: AccountTransaction[] = [];
        for (let tran of this.transactions){
            const copy: AccountTransaction = Object.assign({}, tran);
            copy.id = null;
            copy.financeAccount = this.account;
            copy.user = this.currentUser;
            let postDate: Date = this.dateUtils.convertLocalDateFromServer(copy.postDate);
            copy.postDate = {
                year: postDate.getFullYear(),
                month: postDate.getMonth() + 1,
                day: postDate.getDate()
            };
            copyTransactions.push(copy);
        }
        return copyTransactions;
    }

    save() {
        this.isSaving = true;
        this.logger.log('***Saving***');
        this.subscribeToSaveResponse(this.transactionService.createBulk(this.prepareTransactions()));
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
