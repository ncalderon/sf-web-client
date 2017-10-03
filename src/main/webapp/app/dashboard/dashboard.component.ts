import {Component, OnInit} from '@angular/core';
import {FinanceAccount} from '../sf-entities/finance-account/finance-account.model';
import {TranChartData} from '../shared/charts/tran-chart-data';
import {AccountTransactionService} from '../sf-entities/account-transaction/account-transaction.service';
import {FinanceAccountService} from '../sf-entities/finance-account/finance-account.service';
import {LoggerService} from '../shared/logger/logger.service';
import {Principal} from '../shared/auth/principal.service';
import {JhiAlertService} from 'ng-jhipster';
import {AccountTransaction} from '../sf-entities/account-transaction/account-transaction.model';
import {ResponseWrapper} from '../shared/model/response-wrapper.model';

@Component({
    selector: 'jhi-dashboard',
    templateUrl: './dashboard.component.html',
    styles: []
})
export class DashboardComponent implements OnInit {

    currentUser: any;
    accounts: FinanceAccount[];
    account: FinanceAccount;
    tranChartData: TranChartData;

    // lineChart
    chartData: Array<any> = [
        {data: [], label: 'EXPENSES'},
        {data: [], label: 'INCOMES'}
    ];
    /*= [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, '90'], label: 'Series B'}
    ];*/
    chartLabels: Array<any> = [];

    constructor(
        private tranService: AccountTransactionService,
        private accountService: FinanceAccountService,
        private logger: LoggerService,
        private principal: Principal,
        private alertService: JhiAlertService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentUser = account;
        });
        this.load();
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    private load() {
        this.accountService.query()
            .subscribe((res: ResponseWrapper) => {
                this.accounts = res.json;
                this.account = this.accounts.length > 0 ? this.accounts[0] : null;
                this.loadTransaction(this.account)
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    private loadTransaction(account: FinanceAccount) {
        this.accountService.findTransactions(account.id)
            .subscribe((transactions: AccountTransaction[]) => {
                this.account.accountTransactions = transactions;
                this.refreshChart(transactions);
            });

    }

    refreshChart(transactions: AccountTransaction[]) {
        const currentYear = new Date().getFullYear();
        this.tranChartData = new TranChartData(transactions);
        this.chartLabels = this.tranChartData.getChartLabels(currentYear);
        this.chartData = this.tranChartData.getChartData(currentYear);
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

}
