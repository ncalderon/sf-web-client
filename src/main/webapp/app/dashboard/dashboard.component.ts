import {Component, OnInit} from '@angular/core';
import {FinanceAccount} from '../shared/sf-model/finance-account.model';
import {TranChartData} from '../shared/charts/tran-chart-data';
import {AccountTransactionService} from '../shared/sf-services/account-transaction/account-transaction.service';
import {FinanceAccountService} from '../shared/sf-services/finance-account/finance-account.service';
import {LoggerService} from '../shared/logger/logger.service';
import {Principal} from '../shared/auth/principal.service';
import {JhiAlertService} from 'ng-jhipster';
import {AccountTransaction} from '../shared/sf-model/account-transaction.model';
import {ResponseWrapper} from '../shared/model/response-wrapper.model';
import {ENTER_LEAVE_ANIMATION} from '../shared/animation/enter-leave-animation';

@Component({
    selector: 'jhi-dashboard',
    templateUrl: './dashboard.component.html',
    styles: [],
    animations: ENTER_LEAVE_ANIMATION
})
export class DashboardComponent implements OnInit {

    accChecked: number[] = [];
    currentUser: any;
    accounts: FinanceAccount[];

    year: number;
    tranYears: number[] = [];
    tranChartData: TranChartData = new TranChartData([]);
    transactions: AccountTransaction[];

    // chart
    chartData: Array<any> = [
        {data: [], label: 'EXPENSES'},
        {data: [], label: 'INCOMES'}
    ];
    chartLabels: Array<any> = [];

    constructor(private tranService: AccountTransactionService,
                private accountService: FinanceAccountService,
                private logger: LoggerService,
                private principal: Principal,
                private alertService: JhiAlertService
                ) {
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
        this.year = new Date().getFullYear() - 1;
        this.tranYears.push(this.year);
        this.tranYears.push(this.year + 1);
        this.tranYears.push(this.year + 2);
        //this.getYears();
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
                this.loadTransactions()
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    private getYears() {
        this.tranService.findTransactionYears().subscribe((years: ResponseWrapper) => {
            this.tranYears = years.json;
        }, (res: ResponseWrapper) => this.onError(res.json));
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
        //console.log(e);
    }

    public chartHovered(e: any): void {
        //console.log(e);
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
