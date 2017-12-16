import {Component, OnDestroy, OnInit} from '@angular/core';
import {Searcher} from '../../../../shared/search/searcher';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {FinanceAccount} from '../../finance-account.model';
import {TranCategory} from '../../../tran-category/tran-category.model';
import {AccountTransaction} from '../../../account-transaction/account-transaction.model';
import {Observable} from 'rxjs/Observable';
import {Bank} from '../../../bank/bank.model';
import {User} from '../../../../shared/user/user.model';
import {LoggerService} from '../../../../shared/logger/logger.service';
import {JhiAlertService, JhiDateUtils, JhiEventManager} from 'ng-jhipster';
import {FinanceAccountService} from '../../finance-account.service';
import {TranCategoryService} from '../../../tran-category/tran-category.service';
import {AccountTransactionService} from '../../../account-transaction/account-transaction.service';
import {BankService} from '../../../bank/bank.service';
import {ActivatedRoute} from '@angular/router';
import {AuthServerProvider} from '../../../../shared/auth/auth-jwt.service';
import {Principal} from '../../../../shared/auth/principal.service';
import {ResponseWrapper} from '../../../../shared/model/response-wrapper.model';
import {ENTER_LEAVE_ANIMATION} from '../../../../shared/animation/enter-leave-animation';

@Component({
    selector: 'jhi-tran-upload',
    templateUrl: './tran-upload.component.html',
    styles: [],
    animations: ENTER_LEAVE_ANIMATION
})
export class TranUploadComponent implements OnInit, OnDestroy {
    searcher: Searcher;
    /*component property*/
    hasBaseDropZoneOver = false;
    isSaving: boolean;
    uploader: FileUploader;

    /*dropdown data*/
    categories: TranCategory[];
    categoryValues: string[];

    /*model*/
    accountId: number;
    transactions: AccountTransaction[] = [];
    transactionsObservables: Observable<AccountTransaction[]> = Observable.of([]);
    account: FinanceAccount;
    bank: Bank;
    banks: Bank[] = [];
    currentUser: User;
    fileInput: any;

    constructor(private logger: LoggerService,
                private alertService: JhiAlertService,
                private activatedRoute: ActivatedRoute,
                private accountService: FinanceAccountService,
                private tranCategoryService: TranCategoryService,
                private transactionService: AccountTransactionService,
                private bankService: BankService,
                private eventManager: JhiEventManager,
                private authServerProvider: AuthServerProvider,
                private principal: Principal,
                private dateUtils: JhiDateUtils) {

    }

    // TODO: Remove this when we're done
    get diagnostic() {
        return JSON.stringify(this.transactions);
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.accountId = params['accountId'];
            this.load();
        });
    }

    load() {
        this.logger.log('***Loading***');
        this.isSaving = false;

        this.searcher = new Searcher();
        this.searcher.onSearch = (term: string) => {
            return this.OnSearch(term.toLocaleLowerCase());
        };
        this.uploader = new FileUploader(
            {
                url: 'api/account-transactions/upload',
                authToken: 'Bearer ' + this.authServerProvider.getToken()
                /*allowedFileType: ['xls'],
                allowedMimeType: ['text/csv']*/
            });
        this.uploader.onCompleteItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
            this.onCompleteUpload(item, response, status, headers);
        };
        this.uploader.onBuildItemForm = (fileItem: FileItem, form: any) => {
            this.onBuildItemForm(fileItem, form);
        };
        this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
            setTimeout(() => {
                this.upload();
            }, 1);

        };
        this.principal.identity().then((user) => {
            this.currentUser = user;
        });

        this.accountService.find(this.accountId)
            .subscribe((account) => {
                this.account = account;
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

    private OnSearch(term: string): Observable<any[]> {
        this.logger.info('***** OnSearch ******');
        this.logger.info(term);
        this.transactionsObservables = Observable.of(this.transactions);
        if (term.length <= 0) {
            return this.transactionsObservables;
        }
        this.transactionsObservables = this.transactionsObservables.map((trans) =>
            trans.filter((tran) =>
                (<AccountTransaction>tran).description.toLocaleLowerCase().match(term) ||
                ((<AccountTransaction>tran).amount + '').toLocaleLowerCase().match(term)
            )
        );
        return this.transactionsObservables;
    }

    private onBuildItemForm(fileItem: FileItem, form: any): any {
        this.logger.info('******onBuildItemForm*****');
        form.append('bank', this.bank.id);
    }

    private onCompleteUpload(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
        this.logger.info('******* Response from upload file endpoint *******');
        this.logger.info(JSON.parse(response));
        this.transactions = <AccountTransaction[]>JSON.parse(response);
        this.setCategoryValues(this.transactions);
        this.transactionsObservables = Observable.of(this.transactions);
        this.uploader.clearQueue();
        this.fileInput = null;
        return void 0;
    }

    private setCategoryValues(transactions: AccountTransaction[]) {
        this.categoryValues = [];
        for (const tran of transactions) {
            this.categoryValues.push(tran.tranCategory ? tran.tranCategory['name'] : '');
        }
    }

    upload() {
        this.logger.info('Uploading');
        this.uploader.uploadItem(<FileItem>this.uploader.getNotUploadedItems()[0]);
        /*this.uploader.component = this;*/
    }

    remove(index: number, item: AccountTransaction) {
        this.transactions.splice(index, 1);
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
        return item.tranNumber;
    }

    onChangeCategory() {
        this.logger.info(this.categoryValues);
    }

    onTypeaheadSelect(index: number, transaction: AccountTransaction, event: any) {
        /*this.logger.info('***** on select typeahead category');
        this.logger.info(index);
        this.logger.info(transaction);
        this.logger.info(event);*/
        transaction.tranCategory = event.item;
    }

    goBack() {
        this.logger.log('***Back***');
        this.clear();
        window.history.back();
    }

    clear() {
        this.logger.log('***Clear***');
        this.transactionsObservables = Observable.of([]);
        this.transactions = [];
        this.account = null;
        this.uploader.clearQueue();
        this.fileInput = null;
    }

    private onSaveSuccess(result: AccountTransaction[]) {
        this.eventManager.broadcast({name: 'accountTransactionListModification', content: 'OK'});
        this.isSaving = false;
        this.goBack();
    }

    private subscribeToSaveResponse(result: Observable<AccountTransaction[]>) {
        result.subscribe((res: AccountTransaction[]) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private prepareTransactionsForServer(): AccountTransaction[] {
        const copyTransactions: AccountTransaction[] = [];
        for (const tran of this.transactions) {
            const copy: AccountTransaction = Object.assign({}, tran);
            copy.id = null;
            copy.financeAccount = this.account;
            copy.user = this.currentUser;
            const postDate: Date = this.dateUtils.convertLocalDateFromServer(copy.postDate);
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
        this.subscribeToSaveResponse(this.transactionService.createBulk(this.prepareTransactionsForServer()));
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
