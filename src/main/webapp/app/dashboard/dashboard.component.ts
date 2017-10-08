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
import {Arrays} from '../shared/arrays/arrays';

@Component({
    selector: 'jhi-dashboard',
    templateUrl: './dashboard.component.html',
    styles: []
})
export class DashboardComponent implements OnInit {

    accChecked: number[] = [];

    rowsAccount: RowAccount[] = [];

    currentUser: any;
    accounts: FinanceAccount[];

    year: number = new Date().getFullYear();
    tranYears: number[] = [];
    tranChartData: TranChartData = new TranChartData([]);
    transactions: AccountTransaction[];

    // chart
    chartData: Array<any> = [
        {data: [], label: 'EXPENSES'},
        {data: [], label: 'INCOMES'}
    ];
    /*= [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, '90'], label: 'Series B'}
    ];*/
    chartLabels: Array<any> = [];

    constructor(private tranService: AccountTransactionService,
                private accountService: FinanceAccountService,
                private logger: LoggerService,
                private principal: Principal,
                private alertService: JhiAlertService,
                private arrays: Arrays) {
    }

    ngOnInit() {
        this.principal.identity().then((user) => {
            this.currentUser = user;
        });
        this.load();
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    private load() {
        this.tranYears.push(this.year);
        this.accountService.query()
            .subscribe((res: ResponseWrapper) => {
                this.accounts = res.json;
                const allAcc = new FinanceAccount();
                allAcc.id = -1;
                allAcc.name = 'ALL';
                this.accounts.unshift(allAcc);
                for (let account of this.accounts) {
                    this.accChecked.push(account.id);
                }
                this.fillRowsAccount();
                this.loadTransactions()
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    fillRowsAccount() {
        this.rowsAccount = this.arrays.mapToDimArray(this.accounts, 'accounts', 6);
    }

    onRefresh() {
        this.loadTransactions();
    }

    private loadTransactions() {
        const accoundsId = this.accChecked.filter((value) => {
            return value !== -1;
        });
        this.tranService.findTransactionsByAccountsAndYear(accoundsId, this.year)
            .subscribe((transactions: AccountTransaction[]) => {
                this.transactions = transactions;
                this.refreshChart();
            });
    }

    refreshChart() {
        this.tranChartData.transactions = this.transactions;
        this.chartLabels = this.tranChartData.getChartLabels(this.year);
        this.chartData = this.tranChartData.getChartData(this.year);
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

    isChecked(id: number): boolean {
        return -1 !== this.accChecked.indexOf(id)
    }

    onChangeAcc(checked: boolean, acc: FinanceAccount) {
        if (checked) {

            if (acc.id === -1) {
                for (let account of this.accounts) {
                    this.accChecked.push(account.id);
                }
            }else {
                this.accChecked.push(acc.id);
            }
        } else {
            if (acc.id === -1) {
                this.accChecked = [];
            } else {
                this.accChecked = this.accChecked.filter((value, index, array) => {
                    return value !== acc.id;
                });
            }
        }
    }
}

class RowAccount {
    accounts: FinanceAccount[];
}
