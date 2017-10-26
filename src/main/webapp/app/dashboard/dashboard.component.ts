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
import { trigger, state, style, animate, transition} from '@angular/animations';

@Component({
    selector: 'jhi-dashboard',
    templateUrl: './dashboard.component.html',
    styles: [],
    animations: [
        trigger('in-out', [
            state('in', style({
                transform: 'translateX(0)',
                opacity: 1
            })),
            transition('void => *', [
                style({
                    transform: 'translateX(-100%)',
                    opacity: 0
                }),
                animate('0.2s 100ms ease-in')

            ]),
            transition('* => void', [
                style({
                    transform: 'translateX(100%)',
                    opacity: 0
                }),
                animate('0.2s 100ms ease-out')

            ])
        ])
    ]
})
export class DashboardComponent implements OnInit {

    accChecked: number[] = [];
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
                this.loadTransactions()
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
